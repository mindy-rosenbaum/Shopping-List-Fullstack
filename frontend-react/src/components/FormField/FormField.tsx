import React from 'react';
import { TextField } from '@mui/material';
import styles from './FormField.module.css';

interface FormFieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  touched?: boolean;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
  type?: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  error,
  touched,
  onChange,
  onBlur,
  type = 'text',
  className,
  placeholder,
  disabled,
  required,
}) => {
  const hasError = !!(touched && error);
  const combinedClassName = `${styles.formField} ${hasError ? styles.error : ''} ${className || ''}`;

  return (
    <TextField
      label={label}
      name={name}
      type={type}
      value={value}
      error={hasError}
      helperText={touched && error}
      onChange={(e) => onChange(name, e.target.value)}
      onBlur={() => onBlur(name)}
      fullWidth
      variant="outlined"
      className={combinedClassName}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
    />
  );
};

export default FormField;