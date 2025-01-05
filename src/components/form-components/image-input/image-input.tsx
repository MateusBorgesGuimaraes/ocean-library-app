import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styles from './image-input.module.css';
import formatLink from '@/functions/formatLink';
import Image from 'next/image';

interface ImageInputProps {
  label: string;
  name: string;
  accept?: string;
  required?: boolean;
  error?: string;
  width?: string;
  height?: string;
  initialValue?: string;
}

export const ImageInput = ({
  label,
  name,
  accept = 'image/*',
  required = false,
  error,
  initialValue,
  width = '100%',
  height = '140px',
}: ImageInputProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { register, setValue } = useFormContext();
  const { onChange: registerOnChange, ...registerRest } = register(name);

  useEffect(() => {
    if (initialValue) {
      const formattedUrl = formatLink(initialValue, 'pictures');
      setPreview(formattedUrl);
    }
  }, [initialValue]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    registerOnChange(event);
    const file = event.target.files?.[0];
    if (file) {
      if (preview && !preview.includes('pictures')) {
        URL.revokeObjectURL(preview);
      }
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    if (preview && !preview.includes('pictures')) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setValue(name, null, { shouldValidate: true });
  };

  useEffect(() => {
    return () => {
      if (preview && !preview.includes('pictures')) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const containerStyle = {
    width,
  };

  const wrapperStyle = {
    width,
    height,
  };

  return (
    <div className={styles.imageInputContainer} style={containerStyle}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <div className={styles.inputWrapper} style={wrapperStyle}>
        <input
          type="file"
          accept={accept}
          className={styles.fileInput}
          onChange={handleImageChange}
          {...registerRest}
        />
        {preview ? (
          <div className={styles.previewContainer}>
            <Image src={preview} alt="Preview" className={styles.preview} />
            <button
              type="button"
              onClick={handleRemoveImage}
              className={styles.removeButton}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        ) : (
          <div className={styles.placeholder}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
              <line x1="16" y1="5" x2="22" y2="5" />
              <line x1="19" y1="2" x2="19" y2="8" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <span>Click to upload image</span>
          </div>
        )}
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
