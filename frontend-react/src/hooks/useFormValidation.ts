import { useState, useCallback } from 'react';

interface FormData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const validationRules = {
  firstName: { required: true, message: "שדה חובה" },
  lastName: { required: true, message: "שדה חובה" },
  address: { required: true, message: "שדה חובה" },
  email: { required: true, pattern: /\S+@\S+\.\S+/, message: "מייל לא תקין" }
} as const;

export const useFormValidation = (initialData: FormData) => {
  const [formData, setFormData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof FormData, boolean>>({} as Record<keyof FormData, boolean>);

  const validateField = useCallback((fieldName: keyof FormData, value: string): string => {
    const rule = validationRules[fieldName];
    if (rule.required && !value.trim()) return rule.message;
    if ('pattern' in rule && value && !rule.pattern.test(value)) return rule.message;
    return '';
  }, []);

  const handleFieldChange = useCallback((fieldName: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    setTouched(prev => {
      if (prev[fieldName]) {
        const error = validateField(fieldName, value);
        setErrors(prevErrors => ({ ...prevErrors, [fieldName]: error }));
      }
      return prev;
    });
  }, [validateField]);

  const handleFieldBlur = useCallback((fieldName: keyof FormData) => {
    setTouched(prev => ({ ...prev, [fieldName]: true }));
    setFormData(prevData => {
      const error = validateField(fieldName, prevData[fieldName]);
      setErrors(prevErrors => ({ ...prevErrors, [fieldName]: error }));
      return prevData;
    });
  }, [validateField]);

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      const fieldName = key as keyof FormData;
      const error = validateField(fieldName, formData[fieldName]);
      if (error) newErrors[fieldName] = error;
      acc[fieldName] = true;
      return acc;
    }, {} as Record<keyof FormData, boolean>);

    setErrors(newErrors);
    setTouched(allTouched);
    return Object.keys(newErrors).length === 0;
  }, [formData, validateField]);

  const isFormValid = Object.values(formData).every(value => value.trim()) &&
                     Object.values(errors).every(error => !error);

  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
    setTouched({} as Record<keyof FormData, boolean>);
  }, [initialData]);

  return {
    formData,
    errors,
    touched,
    isFormValid,
    handleFieldChange,
    handleFieldBlur,
    validateForm,
    resetForm
  };
};