import React from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { withoutPlaceholder, contactSchema, FormData } from './schema/formSchemas';
import { getFormFields, FieldConfig } from './schema/formUtils';

const contactFields = getFormFields(withoutPlaceholder, contactSchema: FormData);

const CreateContactForm = () => {
  const { t } = useTranslation();
  const [error, setError] = React.useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      status: "new",
      source: "web"
    }
  });

  const renderField = (field: FieldConfig) => {
    switch (field.type) {
      case 'select':
        return (
          <select
            id={field.name}
            {...register(field.name)}
            aria-invalid={errors[field.name] ? "true" : "false"}
          >
            <option value="">{t('contact_form.select_option')}</option>
            {field.options?.map((option) => (
              <option key={option} value={option}>
                {t(`contact_form.${option}`)}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={field.name}
            placeholder={t(`contact_form.${field.placeholder}`)}
            {...register(field.name)}
            aria-invalid={errors[field.name] ? "true" : "false"}
          />
        );

      case 'tags':

        return (
          <input
            id={field.name}
            type="text"
            placeholder={t(`contact_form.${field.placeholder}`)}
            {...register(field.name)}
            aria-invalid={errors[field.name] ? "true" : "false"}
          />
        );

      default:
        return (
          <input
            id={field.name}
            type={field.type}
            placeholder={t(`contact_form.${field.placeholder}`)}
            {...register(field.name)}
            aria-invalid={errors[field.name] ? "true" : "false"}
          />
        );
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Erro ao salvar contato');

      setSubmitSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no envio');
    }
  };

  if (error) return <div className="error">Erro: {error}</div>;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-contact-form">
      <h2>{t("contact_form.title")}</h2>

      {submitSuccess && (
        <div className="success-message">Contato criado com sucesso!</div>
      )}

      {contactFields.map((field) => (
        <div key={field.name} className="form-group">
          <label htmlFor={field.name}>
            {t(`contact_form.${field.label}`)}
            {field.required && <span className="required"> *</span>}
          </label>

          {renderField(field)}

          {errors[field.name] && (
            <p className="error-message">
              {errors[field.name]?.message && t(`contact_form.${errors[field.name]?.message}`)}
            </p>
          )}
        </div>
      ))}

      <button
        type="submit"
        className="submit-btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? t('contact_form.submitting') : t('contact_form.create_contact')}
      </button>
    </form>
  );
};

export default CreateContactForm;


