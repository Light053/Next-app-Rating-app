import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './TextArea.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface TextAreaProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  placeholder?: string;
}

export const TextArea: FC<TextAreaProps> = (props) => {
  const { className, placeholder, ...otherProps } = props;
  return (
    <textarea
      className={classNames(styles.textarea, {}, [className || ''])}
      placeholder={placeholder || ''}
      {...otherProps}
    />
  );
};
