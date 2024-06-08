'use client';

import { FC, useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import MenuList from '../MenuList/MenuList';
import { getData } from '@/utils/Api/ApiRequests';
import OwlLogo from '@/utils/assets/OwlLogo.svg?svgr';
import Link from 'next/link';
import { Search } from '../Search/Search';
import { IMenu } from '@/interfaces/menu.interface';

interface SidebarProps {
  className?: string;
  propsMenu?: IMenu[];
  propsFirstCategory?: number;
}

export const Sidebar: FC<SidebarProps> = ({
  className,
  propsFirstCategory,
  propsMenu,
  ...otherProps
}) => {
  const [menu, setMenu] = useState<IMenu[]>(propsMenu || []);
  const [firstCategory, setFirstCategory] = useState<number>(
    propsFirstCategory || 0
  );
  const [loading, setLoading] = useState<boolean>(
    !propsMenu || !propsFirstCategory
  );

  useEffect(() => {
    if (!propsMenu || !propsFirstCategory) {
      const fetchData = async () => {
        const {
          props: { menu, firstCategory },
        } = await getData(0);
        setMenu(menu);
        setFirstCategory(firstCategory);
        setLoading(false);
      };

      fetchData();
    }
  }, [propsMenu, propsFirstCategory]);

  return (
    <div
      className={classNames(styles.Sidebar, {}, [className || ''])}
      {...otherProps}
    >
      <Link href={'/'}>
        <OwlLogo className={styles.logo} />
      </Link>
      <Search />
      <MenuList firstCategory={firstCategory} menu={menu} />
    </div>
  );
};
