import { FC } from 'react';
import styles from './Header.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface HeaderProps {
  className?: string;
}

export const Header: FC<HeaderProps> = ({ className, ...otherProps }) => {
  return (
    <div
      className={classNames(styles.Header, {}, [className || ''])}
      {...otherProps}
    >
      header
    </div>
  );
};
