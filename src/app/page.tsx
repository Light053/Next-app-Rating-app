'use client';

import { classNames } from '@/utils/classnames/classnames';
import styles from './page.module.scss';
import { Rating } from '../components';
import { useState } from 'react';

export default function Home(): JSX.Element {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className={classNames(styles.page, {}, [])}>
      <Rating rating={rating} setRating={setRating} isEditable={true} />
    </div>
  );
}
