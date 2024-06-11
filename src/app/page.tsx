'use client';

import { classNames } from '@/utils/classnames/classnames';
import styles from './page.module.scss';
import { Button, Input, TextArea } from '../components';
import { useState } from 'react';
import { ButtonThemes } from '../components/Button/Button';
import { usePathname } from 'next/navigation';

export default function Home() {
  const [rating, setRating] = useState<number>(0);

  return (
    <div className={classNames(styles.page, {}, [])}>
      Выберите интересующий вас курс в сайдбаре
    </div>
  );
}
