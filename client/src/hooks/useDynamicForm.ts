import { useForm } from 'react-hook-form';
import { FieldConfig, getDefaultValueForType } from '../types/formTypes';


export const useDynamicForm = (formConfig: FieldConfig[], data?: Record<string, any>) => {
  type FormValues = Record<string, any>;
  
  const methods = useForm<FormValues>({
    defaultValues: formConfig.reduce((acc, field) => {
      acc[field.name] = (!data && field.defaultValue) ?? getDefaultValueForType(field.type);
      acc[field.name] = data && data[field.name] !== undefined ? data[field.name] : acc[field.name];
      return acc;
    }, {} as FormValues),
  });

  return methods;
};




