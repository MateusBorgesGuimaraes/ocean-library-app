import { useFormContext } from 'react-hook-form';
import React from 'react';
import styles from './tags-input.module.css';

type TagsInputProps = {
  label: string;
  name: string;
  initialValue?: string[];
};

export const TagsInput = ({ label, name, initialValue }: TagsInputProps) => {
  const { register, setValue, watch } = useFormContext();
  const [inputValue, setInputValue] = React.useState('');
  const tags = Array.isArray(watch(name)) ? watch(name) : [];

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (initialValue && initialValue.length > 0) {
      setValue(name, initialValue, { shouldValidate: true });
    }

    if (event.key === 'Enter' || event.key === ',') {
      event.preventDefault();
      const value = inputValue.trim();

      if (value && !tags.includes(value)) {
        const newTags = [...tags, value];
        setValue(name, newTags, { shouldValidate: true });
        setInputValue('');
      }
    } else if (event.key === 'Backspace' && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      setValue(name, newTags, { shouldValidate: true });
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter(
      (_: string, index: number) => index !== indexToRemove,
    );
    setValue(name, newTags, { shouldValidate: true });
  };

  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.tagsWrapper}>
        <div className={styles.tagsContainer}>
          {tags.map((tag: string, index: number) => (
            <span key={index} className={styles.tag}>
              {tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className={styles.removeTag}
              >
                ×
              </button>
            </span>
          ))}
          <input
            type="text"
            className={styles.tagInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              tags.length === 0
                ? 'Type and press Enter or comma to add tags'
                : ''
            }
          />
        </div>
      </div>
      <input type="hidden" {...register(name)} />
    </div>
  );
};
