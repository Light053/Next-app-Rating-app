import { DetailedHTMLProps, FC } from 'react';
import styles from './Paragraph.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface ParagraphProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  className?: string;
  size?: 's' | 'm' | 'l';
  children: React.ReactNode;
}

export const Paragraph: FC<ParagraphProps> = ({
  className,
  children,
  size = 'm',
  ...otherProps
}) => {
  const mods = {
    [styles.sSize]: size === 's',
    [styles.mSize]: size === 'm',
    [styles.lSize]: size === 'l',
  };

  return (
    <div
      className={classNames(styles.Paragraph, mods, [className || ''])}
      {...otherProps}
    >
      {children}
    </div>
  );
};
