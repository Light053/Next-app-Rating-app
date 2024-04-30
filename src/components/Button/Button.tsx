import { classNames } from '@/utils/classnames/classnames';
import { DetailedHTMLProps, FC } from 'react';
import styles from './Button.module.scss';
import ArrowIcon from '@/src/assets/Arrow.svg';
import Image from 'next/image';

interface ButtonProps
  extends DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  className?: string;
  children: React.ReactNode;
  theme: ButtonThemes;
  arrow?: 'right' | 'down' | 'none';
}

export enum ButtonThemes {
  PRIMARY = 'primary',
  GHOST = 'ghost',
}

export const Button: FC<ButtonProps> = (props) => {
  const { children, theme, className, arrow = 'none', ...otherProps } = props;

  const mods = {
    [styles.down]: arrow === 'down',
    [styles.right]: arrow === 'right',
  };

  return (
    <button
      className={classNames(styles.button, {}, [
        className || '',
        styles[theme],
      ])}
      {...otherProps}
    >
      {children}
      {arrow !== 'none' && (
        <span className={classNames(styles.arrow, mods, [])}>
          <ArrowIcon />
        </span>
      )}
    </button>
  );
};
