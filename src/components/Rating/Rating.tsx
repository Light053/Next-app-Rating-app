import {
  DetailedHTMLProps,
  FC,
  HtmlHTMLAttributes,
  useEffect,
  useState,
  KeyboardEvent,
} from 'react';
import styles from './Rating.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import StarIcon from '@/src/assets/Star.svg';

interface RatingProps
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
}

export const Rating: FC<RatingProps> = (props) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
    new Array(5).fill(<></>)
  );

  const {
    className,
    isEditable = false,
    rating,
    setRating,
    ...otherProps
  } = props;

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          className={classNames(
            styles.star,
            {
              [styles.filled]: i < currentRating,
              [styles.ediable]: isEditable,
            },
            []
          )}
          onMouseEnter={() => changeDisplay(i + 1)}
          onMouseLeave={() => changeDisplay(rating)}
          onClick={() => setRating && isEditable && setRating(i + 1)}
          key={i}
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGElement>) =>
              isEditable && e.code === 'Space' && setRating && setRating(i + 1)
            }
          />
        </span>
      );
    });
    setRatingArray(updatedArray);
  };

  function changeDisplay(i: number) {
    if (!isEditable) {
      return;
    }
    constructRating(i);
  }

  useEffect(() => {
    constructRating(rating);
  }, [rating]);

  return (
    <div className={classNames(styles.Rating, {}, [])} {...otherProps}>
      {ratingArray.map((r, i) => (
        <span key={i}>{r}</span>
      ))}
    </div>
  );
};
