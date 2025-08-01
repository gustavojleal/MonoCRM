import { useForm } from 'react-hook-form';
import { FieldConfig, getDefaultValueForType } from '../types/formTypes';

export const useDynamicForm = (formConfig: FieldConfig[]) => {
  type FormValues = Record<string, any>;
  
  const methods = useForm<FormValues>({
    defaultValues: formConfig.reduce((acc, field) => {
      acc[field.name] = field.defaultValue ?? getDefaultValueForType(field.type);
      return acc;
    }, {} as FormValues),
  });

  return methods;
};




