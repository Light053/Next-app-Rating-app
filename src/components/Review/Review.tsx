import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styles from './Review.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { ReviewModal } from '@/interfaces/Product.interace';
import Usericon from '@/utils/assets/User.svg?svgr';
import { Rating } from '..';

interface ReviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  review: ReviewModal;
}

export const Review: FC<ReviewProps> = (props) => {
  const {
    review: { name, _id, createdAt, description, productId, rating, title },
    className,
    ...otherProps
  } = props;

  return (
    <div className={classNames(styles.Review, {}, [])} {...otherProps}>
      <Usericon />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>

      <div className={styles.date}>
        {new Date(createdAt).toLocaleDateString()}
      </div>

      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>

      <div className={styles.description}>{description}</div>
    </div>
  );
};
