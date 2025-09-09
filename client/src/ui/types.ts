export interface InputProps<T> {
  value: T;
  onChange: (value: T) => void;
  label?: string;
  validate?: (value: T) => string | null;
  type: 'text' | 'number' | 'checkbox' | 'date';

}

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends InputProps<string> {
  options: SelectOption[];
}