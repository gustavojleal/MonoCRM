import { FieldConfig, FieldType } from '../../../types/formTypes';

export const userFormConfig: FieldConfig[] =
[
  {
    name: 'userName',
    label: 'userName',
    type: FieldType.TEXT,
    placeholder: 'username',
    required: true,
       validation: {minLength: 3, maxLength: 50},
      order: 1
  },
  { name: 'email',
    label: 'email',
    type: FieldType.EMAIL,
    placeholder: 'enter_email',
    validation: { pattern: /^\S+@\S+\.\S+$/, message: 'invalid_email' },
    order: 2
  }, 
  {
    name: 'roles',
    label: 'roles',
    type: FieldType.SELECT,
    placeholder: 'Roles',
    defaultValue: 0,
    options: ["Admin", "Manager", "User"],
    order: 3
  }

]

