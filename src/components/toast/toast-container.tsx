'use client';

import { useToastStore } from '@/store/toast-store';
import { Toast } from './toast';

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          title={toast.title}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
