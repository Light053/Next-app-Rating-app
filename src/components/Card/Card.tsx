/* eslint-disable react/display-name */
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { forwardRef, ForwardedRef } from 'react';
import styles from './Card.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface CardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  color?: 'white' | 'blue';
  children: React.ReactNode;
}

export const Card = forwardRef(
  (props: CardProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { children, color = 'white', className, ...otherProps } = props;

    const mods = {
      [styles.blue]: color === 'blue',
      [styles.white]: color === 'white',
    };

    return (
      <div
        className={classNames(styles.Card, mods, [className || ''])}
        ref={ref}
        {...otherProps}
      >
        {children}
      </div>
    );
  }
);
