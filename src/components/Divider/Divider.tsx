import { FC } from 'react';
import styles from './Divider.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface DividerProps {
  className?: string;
}

export const Divider: FC<DividerProps> = ({ className }) => {
  return (
    <hr className={classNames(styles.Divider, {}, [className || ''])}></hr>
  );
};
