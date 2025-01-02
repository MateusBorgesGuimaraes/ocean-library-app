'use client';

import { useState } from 'react';
import styles from './role-select.module.css';
import Image from 'next/image';
import { icons } from '../../../../public/assets/assets';

enum UserPermissions {
  admin = 'admin',
  librarian = 'librarian',
  socialMedia = 'socialMedia',
  stockController = 'stockController',
  user = 'user',
}

interface RoleSelectProps {
  userId: string;
  initialPermissions: UserPermissions[];
  onPermissionsUpdate: (
    id: string,
    permissions: UserPermissions[],
  ) => Promise<any>;
}

interface Role {
  value: UserPermissions;
  label: string;
}

const RoleSelect = ({
  userId,
  initialPermissions = [],
  onPermissionsUpdate,
}: RoleSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [permissions, setPermissions] =
    useState<UserPermissions[]>(initialPermissions);
  const [isUpdating, setIsUpdating] = useState(false);

  const allRoles: Role[] = [
    { value: UserPermissions.admin, label: 'Administrator' },
    { value: UserPermissions.librarian, label: 'Librarian' },
    { value: UserPermissions.socialMedia, label: 'Social Media' },
    { value: UserPermissions.stockController, label: 'Stock Controller' },
    { value: UserPermissions.user, label: 'User' },
  ];

  const handleTogglePermission = async (role: UserPermissions) => {
    try {
      setIsUpdating(true);
      const newPermissions = permissions.includes(role)
        ? permissions.filter((p) => p !== role)
        : [...permissions, role];

      console.log('newPermissions', newPermissions);

      await onPermissionsUpdate(userId, newPermissions);
      setPermissions(newPermissions);
    } catch (error) {
      console.error('Failed to update permissions:', error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className={styles.container}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={styles.selectButton}
        disabled={isUpdating}
      >
        <span className={styles.buttonText}>
          {permissions.length === 0
            ? 'Select roles'
            : `${permissions.length} roles selected`}
        </span>
        <Image
          src={icons.arrowIcon}
          alt="chevron down icon"
          width={24}
          height={24}
        />
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <ul className={styles.roleList}>
            {allRoles.map((role) => {
              const isSelected = permissions.includes(role.value);
              return (
                <li
                  key={role.value}
                  className={`${styles.roleItem} ${
                    isSelected ? styles.selected : ''
                  }`}
                  onClick={() => handleTogglePermission(role.value)}
                >
                  <span>{role.label}</span>
                  {isSelected && (
                    <Image
                      src={icons.chekedIcon}
                      alt="check icon"
                      width={24}
                      height={24}
                    />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {permissions.length > 0 && (
        <div className={styles.tagContainer}>
          {permissions.map((permission) => (
            <span key={permission} className={styles.tag}>
              {permission}
              <button
                onClick={() => handleTogglePermission(permission)}
                className={styles.removeButton}
              >
                <Image
                  src={icons.closeIcon}
                  alt="close icon"
                  width={16}
                  height={16}
                />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default RoleSelect;
