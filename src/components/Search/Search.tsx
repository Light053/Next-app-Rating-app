'use client';

import { FC, useState } from 'react';
import styles from './Search.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { Button, Input } from '..';
import { ButtonThemes } from '../Button/Button';
import SearchIcon from '@/utils/assets/SearchIcon.svg?svgr';
import { useRouter } from 'next/navigation';

interface SearchProps {
  className?: string;
}

export const Search: FC<SearchProps> = ({ className }) => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const handleSearch = () => {
    router.push(`/search/query=${search}`);
    setSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
      setSearch('');
    }
  };

  return (
    <div className={classNames(styles.Search, {}, [])}>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        theme={ButtonThemes.PRIMARY}
        className={styles.btn}
        onClick={handleSearch}
      >
        <SearchIcon />
      </Button>
    </div>
  );
};
