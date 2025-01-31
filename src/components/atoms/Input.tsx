'use client';

import React, { memo, useId } from 'react';

type InputType = 'text' | 'number' | 'email' | 'password' | 'tel' | 'textarea';

interface BaseInputProps {
  label: string;
  type?: InputType;
  placeholder?: string;
  value: string;
  name?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  className?: string;
  'aria-describedby'?: string;
}

interface TextareaProps extends BaseInputProps {
  type: 'textarea';
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

interface StandardInputProps extends BaseInputProps {
  type?: Exclude<InputType, 'textarea'>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

type InputProps = TextareaProps | StandardInputProps;
const inputClasses = {
  base: "w-full px-4 py-3 border border-gray-200 rounded-lg outline-none transition-all pr-12 text-xs md:text-sm",
  default: "border-gray-300 focus:ring-2 focus:ring-[#9B7B4D] focus:border-transparent",
  error: "border-red-500 focus:border-red-600",
  disabled: "bg-gray-100 cursor-not-allowed opacity-75",
  focus: "focus:outline-none focus:ring-2 focus:ring-[#9B7B4D] focus:border-transparent",
} as const;

const labelClasses = {
  base: "text-sm font-medium",
  default: "text-gray-700",
  error: "text-red-500",
  disabled: "text-gray-400",
} as const;

const Input = memo(({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  disabled = false,
  error,
  className = '',
  'aria-describedby': ariaDescribedby,
  ...props
}: InputProps) => {
  const id = useId();
  const errorId = useId();
  
  const inputClassName = `${inputClasses.base} ${
    error ? inputClasses.error : inputClasses.default
  } ${disabled ? inputClasses.disabled : ''} ${inputClasses.focus} ${className}`;

  const labelClassName = `${labelClasses.base} ${
    error ? labelClasses.error : labelClasses.default
  } ${disabled ? labelClasses.disabled : ''}`;

  const sharedProps = {
    id,
    name: name || id,
    placeholder,
    value,
    disabled,
    required,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : ariaDescribedby,
    className: inputClassName,
  };

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClassName}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          {...sharedProps}
          onChange={(e) => (onChange as TextareaProps['onChange'])(e)}
          rows={(props as TextareaProps).rows || 4}
        />
      ) : (
        <input
          {...sharedProps}
          type={type}
          onChange={(e) => (onChange as StandardInputProps['onChange'])(e)}
          min={(props as StandardInputProps).min}
          max={(props as StandardInputProps).max}
        />
      )}

      {error && (
        <p id={errorId} className="text-sm text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
