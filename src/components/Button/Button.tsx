'use client';

import { classNames } from '@/utils/classnames/classnames';
import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';
import styles from './Button.module.scss';
import ArrowIcon from '@/utils/assets/Arrow.svg?svgr';
import { motion } from 'framer-motion';

interface ButtonProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
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
    <motion.button
      whileHover={{ scale: 1.05 }}
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
    </motion.button>
  );
};
