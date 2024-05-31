/* eslint-disable react/display-name */
import {
  DetailedHTMLProps,
  FC,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import styles from './Input.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { FieldError } from 'react-hook-form';

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  placeholder?: string;
  error?: FieldError;
}

export const Input: FC<InputProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLInputElement>) => {
    const { className, placeholder, error, ...otherProps } = props;
    return (
      <div className={classNames(styles.wrapper, {}, [className || ''])}>
        <input
          type="text"
          className={classNames(
            styles.input,
            {
              [styles.error]: error !== undefined,
            },
            []
          )}
          placeholder={placeholder || ''}
          ref={ref}
          {...otherProps}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    );
  }
);
