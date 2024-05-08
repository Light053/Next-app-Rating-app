import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './Sort.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import SortIcon from '@/utils/assets/Sort.svg?svgr';

interface SortProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  sort: SortEnum;
  setSort: (sort: SortEnum) => void;
}

export enum SortEnum {
  Rating,
  Price,
}

export const Sort = (props: SortProps) => {
  const { setSort, sort, className, ...otherProps } = props;

  return (
    <div
      className={classNames(styles.Sort, {}, [className || ''])}
      {...otherProps}
    >
      <span
        onClick={() => setSort(SortEnum.Rating)}
        className={classNames(
          styles.sortRating,
          {
            [styles.active]: sort === SortEnum.Rating,
          },
          []
        )}
      >
        <SortIcon className={styles.sortIcon} /> По рейтингу
      </span>
      <span
        onClick={() => setSort(SortEnum.Price)}
        className={classNames(styles.sortPrice, {
          [styles.active]: sort === SortEnum.Price,
        })}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  );
};
