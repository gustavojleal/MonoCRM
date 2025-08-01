import React, { KeyboardEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface TagInputProps {
  values: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  error?: boolean;
}

const TagInput: React.FC<TagInputProps> = ({
  values,
  onChange,
  placeholder = '',
  error = false
}) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = React.useState('');

  const addTag = () => {
    const tag = inputValue.trim();
    if (tag && !values.includes(tag)) {
      onChange([...values, tag]);
      setInputValue('');
    }
  };

  const removeTag = (tag: string) => {
    onChange(values.filter(t => t !== tag));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (['Enter', 'Tab', ','].includes(e.key)) {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className={`tag-input ${error ? 'border-red-500' : ''}`}>
      <div className="tags-container">
        {values.map(tag => (
          <span key={tag} className="tag">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="tag-remove"
              aria-label={t('contact_form.remove_tag')}
            >
              &times;
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder={placeholder}
          className="tag-input-field"
        />
      </div>
      <p className="tag-hint">{t('contact_form.tags_help')}</p>
    </div>
  );
};

export default TagInput;