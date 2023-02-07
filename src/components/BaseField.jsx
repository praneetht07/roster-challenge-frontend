import { Controller, useFormContext } from "react-hook-form";

function getLabelText(label, rules) {
  if (rules?.required && label) {
    return `${label} *`;
  }
  return label;
}

export const rulesRequired = {
  required: true,
};

export default function BaseField({
  name,
  render,
  defaultValue = "",
  rules,
  shouldUnregister,
  label,
  helperText,
  ...props
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
      render={({ field: { value, onChange } }) =>
        render({
          ...props,
          name,
          value,
          onChange,
          label: getLabelText(label, rules),
          helperText: errors?.[name]?.message || helperText,
        })
      }
    />
  );
}
