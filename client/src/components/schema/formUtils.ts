import { z } from 'zod';



export type FieldConfig = {
  name: keyof FormData; 
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
};

const getEnumOptions = (schema: any): string[] | undefined => {
  try {
    if (schema._def.typeName === 'ZodEnum') {
      return schema._def.values;
    }
    
    if (schema._def.typeName === 'ZodDefault' && 
        schema._def.innerType._def.typeName === 'ZodEnum') {
          return schema._def.innerType._def.values;
        }
      } catch {
        return undefined;
      }
    };
    
  export const getFormFields = (withoutPlaceholder: string[], formSchema: FormData): FieldConfig[] => {
    return Object.entries(formSchema.shape).map(
      ([name, schema]) => {
        const isOptional = schema.isOptional();
        
        const label = `${name.charAt(0).toLowerCase() + name.slice(1)}`;
        const placeholder = withoutPlaceholder.includes(label) ? "" :`enter_${name.replace(/([A-Z])/g, '$1').toLowerCase()}`;
        const enumOptions = getEnumOptions(schema);
        const isEnum = enumOptions !== undefined;

        const inputType = isEnum
          ? 'select'
          : name === 'email' ? 'email'
          : name === 'phone' || name === 'companyPhone' ? 'tel'
          : name === 'interactionHistory' ? 'textarea'
          : name === 'tags' ? 'tags'
          : 'text';

        return {
          name: name as keyof FormData,
          label,
          type: inputType,
          placeholder,
          required: !isOptional,
          ...(isEnum ? { options: enumOptions } : {})
        };
    }
  )};
