'use client';

import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';
import styles from './ReviewForm.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { Rating } from '../Rating/Rating';
import { TextArea } from '../TextArea/TextArea';
import { Button, ButtonThemes } from '../Button/Button';
import { Input } from '../Input/Input';
import CrossIcon from '@/utils/assets/Cross.svg?svgr';

interface ReviewFormProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  productId: string;
}

export const ReviewForm: FC<ReviewFormProps> = (props) => {
  const {} = props;
  const [reviewSend, setReviewSend] = useState<boolean>(false);

  const sendReview = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setReviewSend(true);
  };

  return (
    <>
      <form className={classNames(styles.ReviewForm, {}, [])}>
        <Input type="text" placeholder="имя" />
        <Input
          type="text"
          className={styles.titleInput}
          placeholder="Заголовок отзыва"
        />

        <div className={styles.rating}>
          <span>Оценка: </span>
          <Rating rating={0} />
        </div>

        <TextArea className={styles.description} placeholder="Текст отзыва" />

        <div className={styles.submit}>
          <Button
            theme={ButtonThemes.PRIMARY}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => sendReview(e)}
          >
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
    </>
  );
};
