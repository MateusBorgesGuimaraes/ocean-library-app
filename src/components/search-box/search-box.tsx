import { BookSearchItem } from '@/services/api/types/book-types';
import { icons } from '../../../public/assets/assets';
import styles from './search-box.module.css';
import Image from 'next/image';
import Link from 'next/link';

type SearchBoxProps = {
  data: BookSearchItem[] | undefined;
  clearSearch: () => void;
};

export const SearchBox = ({ data, clearSearch }: SearchBoxProps) => {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className={`${styles.searchContent}`}>
      <ul>
        {data.map((item) => (
          <li key={item.id} onClick={clearSearch}>
            <Link href={`/book/${item.id}`}>
              <Image
                src={icons.bookIcon}
                alt="book icon"
                width={24}
                height={24}
              />
              <p>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
