import { useState } from 'react';
import type { FormEvent } from 'react';

export type FormErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormOptions<T> {
  initialValues: T;
  validate: (values: T) => FormErrors<T>;
  onSubmit: (values: T) => void;
}

export function useForm<T extends object>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<T>) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FormErrors<T>>({});

  function setField<K extends keyof T>(field: K, value: T[K]) {
    setValues((previous) => ({ ...previous, [field]: value }));
    setErrors((previous) => {
      const next = { ...previous };
      delete next[field];
      return next;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): boolean {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return false;
    onSubmit(values);
    return true;
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
  }

  return { values, errors, setField, handleSubmit, reset };
}
