"use client";

import Select, { type MultiValue, type StylesConfig } from "react-select";
import { INTEREST_OPTIONS } from "@/constant/interests";

type InterestOption = {
  value: string;
  label: string;
};

const toOption = (value: string): InterestOption => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1),
});

const interestOptions = INTEREST_OPTIONS.map(toOption);

const defaultStyles: StylesConfig<InterestOption, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: 44,
    borderRadius: 8,
    borderColor: state.isFocused ? "#3b1d73" : "#e4dcf0",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(59,29,115,0.15)" : "none",
    backgroundColor: "#ffffff",
    fontSize: 16,
    ":hover": { borderColor: state.isFocused ? "#3b1d73" : "#d4c8e8" },
  }),
  valueContainer: (base) => ({ ...base, padding: "2px 10px", gap: 4 }),
  placeholder: (base) => ({ ...base, color: "#6b5f80", fontSize: 16 }),
  input: (base) => ({ ...base, color: "#1a0b3a", fontSize: 16, margin: 0 }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "#eee8f8",
    borderRadius: 6,
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#3b1d73",
    fontSize: 12,
    paddingLeft: 8,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "#6b5f80",
    ":hover": { backgroundColor: "#e4dcf0", color: "#1a0b3a" },
  }),
  option: (base, state) => ({
    ...base,
    fontSize: 14,
    backgroundColor: state.isSelected
      ? "#3b1d73"
      : state.isFocused
        ? "#ece4f8"
        : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#1a0b3a",
    ":active": { backgroundColor: "#ece4f8" },
  }),
  menu: (base) => ({ ...base, borderRadius: 10, overflow: "hidden", zIndex: 60 }),
  menuPortal: (base) => ({ ...base, zIndex: 80 }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, color: "#6b5f80" }),
  clearIndicator: (base) => ({ ...base, color: "#6b5f80" }),
};

const authStyles: StylesConfig<InterestOption, true> = {
  control: (base, state) => ({
    ...base,
    minHeight: 48,
    borderRadius: 9999,
    borderColor: state.isFocused ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.25)",
    boxShadow: "none",
    backgroundColor: "rgba(255,255,255,0.12)",
    ":hover": { borderColor: "rgba(255,255,255,0.5)" },
  }),
  valueContainer: (base) => ({ ...base, padding: "4px 16px", gap: 4 }),
  placeholder: (base) => ({ ...base, color: "rgba(255,255,255,0.7)", fontSize: 16 }),
  input: (base) => ({ ...base, color: "#ffffff", fontSize: 16, margin: 0 }),
  singleValue: (base) => ({ ...base, color: "#ffffff" }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderRadius: 9999,
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: "#ffffff",
    fontSize: 12,
    paddingLeft: 8,
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: "rgba(255,255,255,0.75)",
    ":hover": { backgroundColor: "rgba(255,255,255,0.25)", color: "#ffffff" },
  }),
  option: (base, state) => ({
    ...base,
    fontSize: 14,
    backgroundColor: state.isSelected
      ? "#3b1d73"
      : state.isFocused
        ? "#ece4f8"
        : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#1a0b3a",
  }),
  menu: (base) => ({ ...base, borderRadius: 12, overflow: "hidden", zIndex: 60 }),
  menuPortal: (base) => ({ ...base, zIndex: 80 }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base) => ({ ...base, color: "rgba(255,255,255,0.75)" }),
  clearIndicator: (base) => ({ ...base, color: "rgba(255,255,255,0.75)" }),
};

export function InterestsSelect({
  value,
  onChange,
  label = "Interests",
  variant = "default",
}: {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
  variant?: "default" | "auth";
}) {
  const selected = Array.from(new Set(value.filter(Boolean)));
  const extras = selected
    .filter((item) => !INTEREST_OPTIONS.includes(item as (typeof INTEREST_OPTIONS)[number]))
    .map(toOption);
  const options = [...interestOptions, ...extras];
  const isAuth = variant === "auth";

  return (
    <div className="space-y-1.5">
      {isAuth ? null : (
        <label htmlFor="interests" className="flex items-center text-[13px] font-medium">
          {label}
        </label>
      )}
      <Select<InterestOption, true>
        inputId="interests"
        instanceId="interests-select"
        isMulti
        isClearable
        isSearchable
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        placeholder="Select interests"
        options={options}
        value={selected.map(toOption)}
        onChange={(items: MultiValue<InterestOption>) =>
          onChange(items.map((item) => item.value))
        }
        styles={isAuth ? authStyles : defaultStyles}
        menuPortalTarget={typeof document === "undefined" ? undefined : document.body}
        menuPosition="fixed"
        classNamePrefix="react-select"
      />
    </div>
  );
}
