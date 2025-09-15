import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { FieldConfig } from '../../common/types/formTypes';
import FormFieldRenderer from './FormFieldRenderer';
import { useTranslation } from 'react-i18next';

interface FormBuilderProps {
  formTitle: string;
  formConfig: FieldConfig[];
  methods: UseFormReturn;
  onSubmit: (data: any) => void | Promise<void>
}

const FormBuilder: React.FC<FormBuilderProps> = ({
  formTitle,
  formConfig,
  methods,
  onSubmit
}) => {
  const { t } = useTranslation();
  const { control, handleSubmit, formState: { errors } } = methods;
  const orderedformConfig = formConfig.sort((a, b) => {
    return (a.order ?? 0) - (b.order ?? 0);
  });
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {orderedformConfig.map((fieldConfig) => (
        <div key={fieldConfig.name} className="mb-3">
          <label htmlFor={fieldConfig.name} className="form-label">
            {t(`${formTitle}.${fieldConfig.label}`)}
            {fieldConfig.required && <span className="text-danger"> *</span>}
          </label>

          <Controller
            name={fieldConfig.name}
            control={control}
            rules={{
              required: fieldConfig.required ? t('required_field') : false,
              ...fieldConfig.validation
            }}
            render={({ field }) => (
              <FormFieldRenderer
                formTitle={formTitle}
                fieldConfig={fieldConfig}
                field={field}
                error={errors[fieldConfig.name]}
              />
            )}
          />

          {errors[fieldConfig.name] && (
            <div className="invalid-feedback d-block">
              {errors[fieldConfig.name]?.message?.toString()}
            </div>
          )}
        </div>
      ))}

      <button type="submit" className="btn btn-primary">
        {t('submit')}
      </button>
    </form>
  );
};

export default FormBuilder;