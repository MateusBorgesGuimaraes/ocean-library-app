import { useState } from 'react';

interface UseStatusFilterReturn {
  selectedStatus: string;
  handleStatusChange: (status: string) => void;
  isStatusActive: (status: string) => boolean;
}

export const useStatusFilter = (): UseStatusFilterReturn => {
  const [selectedStatus, setSelectedStatus] = useState<string>('');

  const handleStatusChange = (status: string) => {
    if (selectedStatus === status) {
      setSelectedStatus('');
      return;
    }
    setSelectedStatus(status);
  };

  const isStatusActive = (status: string): boolean => {
    return selectedStatus === status;
  };

  return {
    selectedStatus,
    handleStatusChange,
    isStatusActive,
  };
};
