import { FC } from 'react';
import styles from './Sidebar.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className, ...otherProps }) => {
  return (
    <div
      className={classNames(styles.Sidebar, {}, [className || ''])}
      {...otherProps}
    >
      sidebar
    </div>
  );
};
