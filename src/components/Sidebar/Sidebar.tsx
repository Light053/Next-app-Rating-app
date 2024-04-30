'use client';

import { FC } from 'react';
import styles from './Sidebar.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { MenuList } from '../MenuList/MenuList';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className, ...otherProps }) => {
  const route = usePathname();
  const url = route.split('/')[2];
  return (
    <div
      className={classNames(styles.Sidebar, {}, [className || ''])}
      {...otherProps}
    >
      <MenuList url={url} />
    </div>
  );
};
