import { DetailedHTMLProps, FC } from 'react';
import styles from './Tag.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface TagProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  children: React.ReactNode;
  size?: 's' | 'm';
  color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary';
  href?: string;
}

export const Tag: FC<TagProps> = (props) => {
  const {
    children,
    className,
    size = 'm',
    color = 'ghost',
    href,
    ...otherProps
  } = props;

  const mods = {
    [styles.sSize]: size === 's',
    [styles.mSize]: size === 'm',
    [styles.ghost]: color === 'ghost',
    [styles.red]: color === 'red',
    [styles.gray]: color === 'gray',
    [styles.green]: color === 'green',
    [styles.primary]: color === 'primary',
  };

  return (
    <div
      className={classNames(styles.Tag, mods, [className || ''])}
      {...otherProps}
    >
      {href ? <a href={href}>{children}</a> : <>{children}</>}
    </div>
  );
};
