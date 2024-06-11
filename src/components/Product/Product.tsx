/* eslint-disable react/display-name */
'use client';

import {
  DetailedHTMLProps,
  FC,
  ForwardedRef,
  HTMLAttributes,
  forwardRef,
  useState,
} from 'react';
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
import { motion } from 'framer-motion';

interface ProductProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  className?: string;
  product: ProductModel;
}

export const Product = motion(
  forwardRef(
    (
      { product, className, ...otherProps }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>
    ) => {
      const variants = {
        visible: { opacity: 1, height: 'auto', overflow: 'visible' },
        hidden: { opacity: 0, height: 0, overflow: 'hidden' },
      };
      const [isPreviewOpened, setIsPreviewOpened] = useState<boolean>(false);

      return (
        <div ref={ref} {...otherProps}>
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
          <motion.div
            animate={isPreviewOpened ? 'visible' : 'hidden'}
            variants={variants}
            initial="hidden"
            className={styles.reviewsContainer}
          >
            <Card color="blue" className={styles.reviews}>
              {product.reviews.map((r) => (
                <div key={r._id}>
                  <Review review={r} />
                  <Divider />
                </div>
              ))}
              <ReviewForm productId={product._id} />
            </Card>
          </motion.div>
        </div>
      );
    }
  )
);
