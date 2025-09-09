import React from 'react';
import { InputProps, SelectProps } from './types';

const validation = (value: any, validate?: (value: any) => string | null): string | null => {
  if (validate) {
    return validate(value);
  }
  return null;
}
export const Input: React.FC<InputProps<string>> = ({ value, onChange, label, validate, type }) => {
  const error = validation(value, validate);

  return (
    <div>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        type={type}
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span>{error}</span>}
    </div>
  );
};


export const Checkbox: React.FC<InputProps<boolean>> = ({ value, onChange, label }) => (
  <div>
    <label>
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
      {label}
    </label>
  </div>
);



export const TextArea: React.FC<InputProps<string>> = ({ value, onChange, label, validate }) => {
  const error = validation(value, validate);

  return (
    <div>
      {label && <label htmlFor={label}>{label}</label>}
      <textarea
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span>{error}</span>}
    </div>
  );
};



export const SelectInput: React.FC<SelectProps> = ({ value, onChange, label, options, validate }) => {
  const error = validation(value, validate);

  return (
    <div>
      {label && <label htmlFor={label}>{label}</label>}
      <select id={label} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Selecione...</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <span>{error}</span>}
    </div>
  );
};