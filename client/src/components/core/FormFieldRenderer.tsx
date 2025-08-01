import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';
import { FieldConfig, FieldType } from '../../types/formTypes';
import { useTranslation } from 'react-i18next';

interface FormFieldRendererProps {
  formTitle: string;
  fieldConfig: FieldConfig;
  field: ControllerRenderProps;
  error?: any;
}

const FormFieldRenderer: React.FC<FormFieldRendererProps> = ({
  formTitle,
  fieldConfig,
  field,
  error
}) => {
  const { t } = useTranslation();

  const commonProps = {
    id: fieldConfig.name,
    ...field,
    placeholder: t(`${formTitle}.${fieldConfig.placeholder}` || ''),
    className: `form-control ${error ? 'is-invalid' : ''}`
  };

  switch (fieldConfig.type) {
    case FieldType.SELECT:
      return (
        <select {...commonProps}>
          <option value="">{t('select_option')}</option>
          {fieldConfig.options?.map(option => (
            <option key={option} value={option}>
              {t(option)}
            </option>
          ))}
        </select>
      );

    case FieldType.TEXTAREA:
      return <textarea {...commonProps} rows={4} />;

    // case FieldType.CHECKBOX:
    //   return (
    //     <input
    //       type="checkbox"
    //       checked={!!field.value}
    //       onChange={(e) => field.onChange(e.target.checked)}
    //       {...commonProps}
    //     />
    //   );

    // case FieldType.NUMBER:
    //   return (
    //     <input
    //       type="number"
    //       onChange={(e) => field.onChange(Number(e.target.value))}
    //       {...commonProps}
    //     />
    //   );

    case FieldType.TAGS:
      return (
        <input
          type="text"
          {...commonProps}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              const newValue = e.currentTarget.value.trim();
              if (newValue) {
                field.onChange([...(field.value || []), newValue]);
                e.currentTarget.value = '';
              }
            }
          }}
        />
      );

    default:
      return <input type={fieldConfig.type} {...commonProps} />;
  }
};

export default FormFieldRenderer;