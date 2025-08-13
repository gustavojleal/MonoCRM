import { FieldConfig, FieldType } from '../../../types/formTypes';
import { getRoles } from '../utils/FormUtils';


  
  const rolesRaw = await getRoles();
  const rolesParsed = rolesRaw ? JSON.parse(rolesRaw) : [];
  const rolesOptions = rolesParsed.map((role: { id: string, name: string }) => role.name);

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
    options: rolesOptions,
    order: 3
  }

]
