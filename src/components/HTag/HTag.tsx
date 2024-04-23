import { FC } from 'react';
import styles from './HTag.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface HTagProps {
  className?: string;
  children: React.ReactNode;
  tag: 'h1' | 'h2' | 'h3';
}

const tagComponents: Record<HTagProps['tag'], React.ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
};

export const HTag: FC<HTagProps> = ({ className, children, tag = 'h1' }) => {
  const Tag = tagComponents[tag];

  return (
    <Tag className={classNames(styles[tag], {}, [className || ''])}>
      {children}
    </Tag>
  );
};
