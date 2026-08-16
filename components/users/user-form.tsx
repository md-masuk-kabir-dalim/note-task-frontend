"use client";

import { FormEvent } from "react";
import { Button } from "@/components/ui/button";
import Input from "@/components/common/input";
import PasswordInput from "@/components/auth/password-input";
import { SelectField } from "@/components/common/select-field";
import { InterestsSelect } from "@/components/common/interests-select";
import { Surface } from "@/components/layout/surface";
import type { Role } from "@/types/user";

export interface UserFormValues {
  name: string;
  email: string;
  password: string;
  role: Role;
  interests: string[];
}

export function UserForm({
  values,
  onChange,
  onSubmit,
  submitting,
  includePassword = true,
  submitLabel = "Save user",
}: {
  values: UserFormValues;
  onChange: (values: UserFormValues) => void;
  onSubmit: (event: FormEvent) => void;
  submitting?: boolean;
  includePassword?: boolean;
  submitLabel?: string;
}) {
  const update = <K extends keyof UserFormValues>(
    field: K,
    value: UserFormValues[K]
  ) => {
    onChange({ ...values, [field]: value });
  };

  return (
    <Surface>
      <form onSubmit={onSubmit} className="space-y-4">
        <Input
          label="Name"
          name="name"
          value={values.name}
          onChange={(event) => update("name", event.target.value)}
          required
        />
        <Input
          label="Email"
          name="email"
          type="email"
          value={values.email}
          onChange={(event) => update("email", event.target.value)}
          required
        />
        {includePassword ? (
          <PasswordInput
            value={values.password}
            onChange={(event) => update("password", event.target.value)}
          />
        ) : (
          <PasswordInput
            title="Password (leave blank to keep current)"
            value={values.password}
            required={false}
            onChange={(event) => update("password", event.target.value)}
          />
        )}
        <SelectField
          label="Role"
          name="role"
          value={values.role}
          onChange={(event) => update("role", event.target.value as Role)}
          required
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </SelectField>
        <InterestsSelect
          value={values.interests}
          onChange={(interests) => update("interests", interests)}
        />
        <div className="flex justify-end pt-2">
          <Button type="submit" disabled={submitting} className="h-11 w-full px-5 sm:h-10 sm:w-auto">
            {submitting ? "Saving..." : submitLabel}
          </Button>
        </div>
      </form>
    </Surface>
  );
}
