"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { UserForm, type UserFormValues } from "@/components/users/user-form";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ErrorState } from "@/components/common/error-state";
import { FormSkeleton } from "@/components/common/skeletons";
import { useAdminUser, useAdminUserMutations } from "@/hooks/use-admin";
import { getApiErrorMessage } from "@/lib/api-error";

export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { result, isLoading } = useAdminUser(params.id);
  const { updateUser } = useAdminUserMutations();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<UserFormValues>({
    name: "",
    email: "",
    password: "",
    role: "USER",
    interests: [],
  });

  useEffect(() => {
    if (!result?.data) return;
    setValues({
      name: result.data.name,
      email: result.data.email,
      password: "",
      role: result.data.role,
      interests: result.data.interests || [],
    });
  }, [result?.data]);

  return (
    <PageShell admin className="mx-auto max-w-lg">
      <PageHeader title="Edit user" description="Leave the password blank to keep the current hash." />
      {isLoading ? (
        <FormSkeleton />
      ) : (
        <>
          {error ? <ErrorState message={error} /> : null}
          <UserForm
            values={values}
            onChange={setValues}
            includePassword={false}
            submitting={submitting}
            submitLabel="Update user"
            onSubmit={async (event) => {
              event.preventDefault();
              setError("");
              setSubmitting(true);
              try {
                await updateUser(params.id, {
                  name: values.name,
                  email: values.email,
                  role: values.role,
                  interests: values.interests,
                  ...(values.password ? { password: values.password } : {}),
                });
                router.push("/admin/users");
              } catch (err: unknown) {
                setError(getApiErrorMessage(err, "Could not update user"));
              } finally {
                setSubmitting(false);
              }
            }}
          />
        </>
      )}
    </PageShell>
  );
}
