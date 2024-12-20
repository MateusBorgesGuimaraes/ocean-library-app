import React from 'react';
import styles from './data-table.module.css';
import Link from 'next/link';

export interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  transform?: (value: T[keyof T]) => string;
  link?: {
    href: (item: T) => string;
    external?: boolean;
    text?: string; // New property for custom link text
  };
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  caption?: string;
}

function DataTable<T>({ data, columns, caption }: DataTableProps<T>) {
  if (!data.length) {
    return <p>No data available</p>;
  }

  const renderCellContent = (item: T, column: ColumnConfig<T>) => {
    const value = item[column.key];
    const displayValue = column.transform
      ? column.transform(value)
      : String(value);

    if (column.link) {
      const href = column.link.href(item);
      const linkText = column.link.text || displayValue;

      if (column.link.external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {linkText}
          </a>
        );
      }

      return (
        <Link href={href} className={styles.link}>
          {linkText}
        </Link>
      );
    }

    return displayValue;
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {caption && <caption className={styles.caption}>{caption}</caption>}
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className={styles.header}>
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={rowIndex} className={styles.row}>
                {columns.map((column) => (
                  <td key={String(column.key)} className={styles.cell}>
                    {renderCellContent(item, column)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.mobileView}>
        {data.map((item, rowIndex) => (
          <div key={rowIndex} className={styles.mobileCard}>
            {columns.map((column) => (
              <div key={String(column.key)} className={styles.mobileCardRow}>
                <span className={styles.mobileCardLabel}>{column.header}:</span>
                <span className={styles.mobileCardValue}>
                  {renderCellContent(item, column)}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default DataTable;
