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

export const withoutPlaceholder = ["fullName.firstName", "fullName.lastName"];
export type FormData = z.infer<typeof contactSchema>;

