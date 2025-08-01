import { FieldConfig, FieldType } from '../../../types/formTypes';


export const leadFormConfig: FieldConfig[] = 
  [
    { name: 'firstName', 
      label: 'firstName', 
      type: FieldType.TEXT,
      placeholder: 'enter_first_name',
      required: true,
      validation: { minLength: 2, message: 'min2' },
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
      order: 3
    },
    { name: 'phone', 
      label: 'phone',
      type: FieldType.TEL,
      placeholder: 'enter_phone',
      validation: { pattern: /^\d{10,11}$/, message: 'invalid_phone' },
      order: 4
    },
    { name: 'company',
      label: 'company',
      type: FieldType.TEXT,   
      placeholder: 'enter_company',
      order: 5
    },
    { name: 'jobTitle',
      label: 'job_title',
      type: FieldType.TEXT,
      placeholder: 'enter_job_title',
      
    },
    // { name: 'status',
    //   label: 'status',
    //   type: FieldType.SELECT,
    //   options: ['new', 'active', 'inactive'],
    //   defaultValue: 'new',
    //   placeholder: 'select_status',
    //   order: 6
    // },
    // { name: 'source',
    //   label: 'source',
    //   type: FieldType.SELECT,
    //   options: ['web', 'phone', 'email', 'social'],
    //   defaultValue: 'web',
    //   placeholder: 'select_source',
    //   order: 7
    // },
    // { name: 'priority',
    //   label: 'priority',
    //   type: FieldType.SELECT,
    //   options: ['Low', 'Medium', 'High'],
    //   defaultValue: 'Low',
    //   placeholder: 'select_priority',
    //   order: 8
    // },
    // { name: 'assignedTo',
    //   label: 'assignedTo',
    //   type: FieldType.TEXT,
    //   placeholder: 'enter_assigned_to',
    //   order: 9
    // },
    { name: 'notes',
      label: 'notes',
      type: FieldType.TEXTAREA,
      placeholder: 'enter_notes',
      order: 10
    }
  ]

