'use client';

import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';
import styles from './ReviewForm.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button, ButtonThemes } from '../Button/Button';
import { Input } from '../Input/Input';
import CrossIcon from '@/utils/assets/Cross.svg?svgr';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { ApiPaths } from '@/utils/Api/ApiPaths';

interface ReviewFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  productId: string;
}

interface ReviewForm {
  name: string;
  title: string;
  description: string;
  rating: number;
}

export const ReviewForm: FC<ReviewFormProps> = (props) => {
  const {} = props;
  const [reviewSend, setReviewSend] = useState<boolean>(false);
  const [reviewError, setReviewError] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ReviewForm>();

  const onSubmit: SubmitHandler<ReviewForm> = async (formData: ReviewForm) => {
    try {
      const { data } = await axios.post<{ message: string }>(
        ApiPaths.review.createDemo,
        {
          ...formData,
          productId: props.productId,
        }
      );

      if (data.message) {
        setReviewSend(true);
        setReviewError('');
        reset();
      } else {
        setReviewSend(false);
        setReviewError('Что-то пошло не так');
      }
    } catch (error: any) {
      setReviewError(error.message);
    }
  };

  return (
    <>
      <form
        className={classNames(styles.ReviewForm, {}, [])}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          error={errors.name}
          type="text"
          placeholder="имя"
          {...register('name', {
            required: { value: true, message: 'заполните имя!' },
          })}
        />
        <Input
          error={errors.title}
          type="text"
          className={styles.titleInput}
          placeholder="Заголовок отзыва"
          {...register('title', {
            required: { value: true, message: 'заполните заголовок!' },
          })}
        />

        <div className={styles.rating}>
          <span>Оценка: </span>
          <Controller
            rules={{ required: { value: true, message: 'Укажите рейтинг!' } }}
            control={control}
            name="rating"
            render={({ field }) => (
              <Rating
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                isEditable
                error={errors.rating}
              />
            )}
          ></Controller>
        </div>

        <TextArea
          className={styles.description}
          placeholder="Текст отзыва"
          {...register('description', {
            required: { value: true, message: 'заполните текст!' },
          })}
          error={errors.description}
        />

        <div className={styles.submit}>
          <Button theme={ButtonThemes.PRIMARY} type="submit">
            Отправить
          </Button>

          <span className={styles.info}>
            * Перед публикацией отзыв пройдет предварительную модерацию и
            проверку
          </span>
        </div>
      </form>

      {reviewSend && (
        <div className={styles.success}>
          <div className={styles.successTitle}>Ваш отзыв отправлен!</div>
          <div className={styles.successDescription}>
            Спасибо, ваш отзыв принят. В ближайшее время мы опубликуем его
          </div>
          <CrossIcon
            onClick={() => setReviewSend(false)}
            className={styles.close}
            width={20}
            height={20}
          />
        </div>
      )}
      {reviewError && (
        <div className={classNames(styles.success, {}, [styles.reviewError])}>
          <div className={styles.successTitle}>Произошла ошибка</div>
          <CrossIcon
            onClick={() => setReviewError('')}
            className={classNames(styles.close, {}, [styles.reviewErrorClose])}
            width={20}
            height={20}
          />
        </div>
      )}
    </>
  );
};
