import { FieldConfig, FieldType } from '../../../types/formTypes';

export const contactFormConfig: FieldConfig[] = [
  { name: 'firstName',
    label: 'firstName',
    type: FieldType.TEXT,
    placeholder: 'enter_first_name',
    required: true,
    validation: { minLength: 2, message: 'min2' },
    editable: true,
    order: 1
  },
  { name: 'lastName',
    label: 'lastName',
    type: FieldType.TEXT,
    placeholder: 'enter_last_name',
    required: true,
    validation: { minLength: 2, message: 'min2' },
    order: 2
  },
  { name: 'email',
    label: 'email',
    type: FieldType.EMAIL,
    placeholder: 'enter_email',
    validation: { pattern: /^\S+@\S+\.\S+$/, message: 'invalid_email' },
    order: 4
  },
  { name: 'phone',
    label: 'phone',
    type: FieldType.TEL,
    placeholder: 'enter_phone',
    validation: { pattern: /^\d{10,11}$/, message: 'invalid_phone' },
    order: 3
  },
  { name: 'company',
    label: 'company',
    type: FieldType.TEXT,
    placeholder: 'enter_company',
    order: 5
  },
  { name: 'jobTitle',
    label: 'jobTitle',
    type: FieldType.TEXT,
    placeholder: 'enter_job_title',
    order: 6
  },

  
  // { name: 'companyPhone',
  //   label: 'companyPhone',
  //   type: FieldType.TEL,
  //   placeholder: 'enter_company_phone',
  //   order: 6
  // },
  // { name: 'companyDepartment',
  //   label: 'companyDepartment',
  //   type: FieldType.TEXT,
  //   placeholder: 'enter_company_department',
  //   order: 7
  // },
  // { name: 'address',
  //   label: 'address',
  //   type: FieldType.TEXT,
  //   placeholder: 'enter_address',
  //   order: 8
  // },
  // { name: 'city',
  //   label: 'city',
  //   type: FieldType.TEXT,
  //   placeholder: 'enter_city',
  //   order: 9
  // },
  // { name: 'state',
  //   label: 'state',
  //   type: FieldType.TEXT,
  //   placeholder: 'enter_state',
  //   order: 10
  // },
  // { name: 'zip',
  //   label: 'zip',
  //   type: FieldType.TEXT,
  //   placeholder: 'enter_zip_code',
  //   order: 11
  // },
  // { name: 'country',
  //   label: 'country',
  //   type: FieldType.TEXT,
  //   placeholder: 'enter_country',
  //   order: 12
  // },
  // { name: 'tags',
  //   label: 'tags',
  //   type: FieldType.SELECT,
  //   options: [],
  //   placeholder: 'select_tags',
  //   order: 14
  // },
  { name: 'status',
    label: 'status',
    type: FieldType.SELECT,
    options: ['new', 'active', 'inactive'],
    defaultValue: 'new',
    placeholder: 'select_status',
    order: 15 
  },
  { name: 'histories',
    label: 'history',
    type: FieldType.TEXTAREA,
    placeholder: 'enter_interaction_history',
    order: 16
  },
  
];