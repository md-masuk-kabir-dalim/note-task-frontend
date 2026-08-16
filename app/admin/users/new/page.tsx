"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserForm, type UserFormValues } from "@/components/users/user-form";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { ErrorState } from "@/components/common/error-state";
import { useAdminUserMutations } from "@/hooks/use-admin";
import { getApiErrorMessage } from "@/lib/api-error";

export default function AddUserPage() {
  const router = useRouter();
  const { createUser } = useAdminUserMutations();
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [values, setValues] = useState<UserFormValues>({
    name: "",
    email: "",
    password: "",
    role: "USER",
    interests: [],
  });

  return (
    <PageShell admin className="mx-auto max-w-lg">
      <PageHeader
        title="Add user"
        description="Admins can create USER or ADMIN accounts. Passwords are hashed before storage."
      />
      {error ? <ErrorState message={error} /> : null}
      <UserForm
        values={values}
        onChange={setValues}
        submitting={submitting}
        submitLabel="Create user"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          setSubmitting(true);
          try {
            await createUser({
              name: values.name,
              email: values.email,
              password: values.password,
              role: values.role,
              interests: values.interests,
            });
            router.push("/admin/users");
          } catch (err: unknown) {
            setError(getApiErrorMessage(err, "Could not create user"));
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </PageShell>
  );
}
