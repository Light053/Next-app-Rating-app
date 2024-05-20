'use client';

import { DetailedHTMLProps, FC, HTMLAttributes, useState } from 'react';
import styles from './Product.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { ProductModel } from '@/interfaces/Product.interace';
import { Card } from '../Card/Card';
import Image from 'next/image';
import { Rating } from '../Rating/Rating';
import { Tag } from '../Tag/Tag';
import { Button, Divider, Review, ReviewForm } from '..';
import { ButtonThemes } from '../Button/Button';
import { priceRu } from '@/utils/validatePrice/validatePrice';
import { devlOfNum } from '@/utils/devlOfNum/devlOfNum';

interface ProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  product: ProductModel;
}

export const Product: FC<ProductProps> = (props) => {
  const { className, product, ...otherProps } = props;
  const [isPreviewOpened, setIsPreviewOpened] = useState<boolean>(true);

  return (
    <>
      <Card className={classNames(styles.Product, {}, [])}>
        <div className={styles.logo}>
          <Image
            src={product.image}
            alt={product.title}
            width={70}
            height={70}
          />
        </div>
        <div className={styles.title}>{product.title}</div>
        <div className={styles.price}>
          {priceRu(product.price)}
          {product.oldPrice && (
            <Tag color="green" size="s" className={styles.oldPrice}>
              {priceRu(product.price - product.oldPrice)}
            </Tag>
          )}
        </div>
        <div className={styles.credit}>{priceRu(product.credit)}/мес</div>
        <div className={styles.rating}>
          <Rating rating={product.reviewAvg || product.initialRating} />
        </div>

        <div className={styles.tags}>
          {product.categories.map((c) => (
            <Tag color="ghost" key={c} size="s" className={styles.category}>
              {c}
            </Tag>
          ))}
        </div>

        <div className={styles.priceTitle}>Цена</div>
        <div className={styles.creditTitle}>Кредит</div>
        <div className={styles.rateTitle}>
          {product.reviewCount}{' '}
          {devlOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
        </div>
        <Divider className={styles.hr} />
        <div className={styles.description}>{product.description}</div>

        <div className={styles.features}>
          {product.characteristics.map((c) => (
            <div className={styles.characteristics} key={c.name}>
              <span className={styles.characteristicsName}>{c.name}</span>
              <span className={styles.characteristicsDots}></span>
              <span className={styles.characteristicsValue}>{c.value}</span>
            </div>
          ))}
        </div>

        <div className={styles.advBlock}>
          <div className={styles.advantages}>
            {product.advantages && (
              <>
                <div className={styles.advTitle}>Преимущества</div>
                <div>{product.advantages}</div>
              </>
            )}
          </div>
          <div className={styles.disadvantages}>
            {product.disadventages && (
              <>
                <div className={styles.disAdvTitle}>Недостатки</div>
                <div>{product.disadventages}</div>
              </>
            )}
          </div>
        </div>

        <Divider className={classNames(styles.hr, {}, [styles.hr2])} />

        <div className={styles.actions}>
          <Button theme={ButtonThemes.PRIMARY}>Узнать подробнее</Button>
          <Button
            theme={ButtonThemes.GHOST}
            arrow={isPreviewOpened ? 'down' : 'right'}
            className={styles.reviewBtn}
            onClick={() => setIsPreviewOpened(!isPreviewOpened)}
          >
            Читать отзывы
          </Button>
        </div>
      </Card>
      <Card
        color="blue"
        className={classNames(
          styles.reviews,
          {
            [styles.openedReviews]: isPreviewOpened,
            [styles.closedReviews]: !isPreviewOpened,
          },
          []
        )}
      >
        {product.reviews.map((r) => (
          <>
            <Review review={r} key={r._id} />
            <Divider />
          </>
        ))}
        <ReviewForm productId={product._id} />
        <div className={styles.reviews}></div>
      </Card>
    </>
  );
};
