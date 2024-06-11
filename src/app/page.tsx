'use client';
import { classNames } from '@/utils/classnames/classnames';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={classNames(styles.page, {}, [])}>
      Выберите интересующий вас курс в сайдбаре
    </div>
  );
}
