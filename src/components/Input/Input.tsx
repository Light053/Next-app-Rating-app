import { DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';
import { classNames } from '@/utils/classnames/classnames';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  placeholder?: string;
}

export const Input: FC<InputProps> = (props) => {
  const { className, placeholder, ...otherProps } = props;
  return (
    <input
      type="text"
      className={classNames(styles.input, {}, [className || ''])}
      placeholder={placeholder || ''}
      {...otherProps}
    />
  );
};
