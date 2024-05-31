/* eslint-disable react/display-name */
import {
  DetailedHTMLProps,
  FC,
  ForwardedRef,
  InputHTMLAttributes,
  forwardRef,
} from 'react';
import styles from './TextArea.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { FieldError } from 'react-hook-form';

interface TextAreaProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  placeholder?: string;
  error?: FieldError;
}

export const TextArea: FC<TextAreaProps> = forwardRef(
  (props, ref: ForwardedRef<HTMLTextAreaElement>) => {
    const { className, placeholder, error, ...otherProps } = props;
    return (
      <div className={classNames(styles.wrapper, {}, [className || ''])}>
        <textarea
          className={classNames(
            styles.textarea,
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
