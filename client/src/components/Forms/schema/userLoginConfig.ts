import { FieldConfig, FieldType } from '../../../common/types/formTypes';

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
  {
    name: 'password',
    label: 'password',
    type: FieldType.PASSWORD,
    required: true,
    validation: {minLength: 8},
    order: 2
  }
]

