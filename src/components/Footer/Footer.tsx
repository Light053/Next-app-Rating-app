import { FC } from 'react';
import styles from './Footer.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import Link from 'next/link';

interface FooterProps {
  className?: string;
}

export const Footer: FC<FooterProps> = ({ className, ...otherProps }) => {
  return (
    <div
      className={classNames(styles.Footer, {}, [className || ''])}
      {...otherProps}
    >
      <span className={styles.text}>
        OwlTop © 2020 - {new Date().getFullYear()} Все права защищены
      </span>
      <Link href={'#'} className={styles.law}>
        Пользовательское соглашение
      </Link>
      <Link href={'#'} className={styles.policy}>
        Политика конфиденциальности
      </Link>
    </div>
  );
};
