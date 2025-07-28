import { z } from 'zod';


export const contactSchema = z.object({
  fullName: z.object({
    firstName: z.string().min(2, "min2"),
    lastName: z.string().min(2, "min2"),
    
  }),
  email: z.string().email("invalid_email"),
  phone: z.string().regex(/^\d{10,11}$/, "invalid_phone"),
  company: z.string().optional(), 
  companyPhone: z.string().optional(),
  companyDepartment: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zip: z.string().optional(),
  country: z.string().optional(),
  interactionHistory: z.string().optional(),
  tags: z.array(z.string()).optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  status: z.enum(["new", "active", "inactive"]).default("new"),
  source: z.enum(["web", "phone", "email", "social"]).default("web"),
  assignedTo: z.string().optional(),
});

export const withoutPlaceholder = ["firstName", "lastNmae"];

export type ContactFormData = z.infer<typeof contactSchema>;

export type FieldConfig = {
  name: keyof ContactFormData; 
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
    
  export const contactFields: FieldConfig[] = Object.entries(contactSchema.shape).map(
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
      name: name as keyof ContactFormData,
      label,
      type: inputType,
      placeholder,
      required: !isOptional,
      ...(isEnum ? { options: enumOptions } : {})
    };
  }
);
