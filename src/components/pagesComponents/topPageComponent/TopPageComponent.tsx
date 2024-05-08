'use client';

import { ProductModel } from '@/interfaces/Product.interace';
import styles from './TopPageComponent.module.scss';
import { TopLevelCategory, TopPageModel } from '@/interfaces/topPage.interface';
import { FC, useReducer } from 'react';
import { HTag } from '../../HTag/HTag';
import { Tag } from '../../Tag/Tag';
import { HhDataCard } from '../../HhDataCard/HhDataCard';
import { Paragraph } from '../../Paragraph/Paragraph';
import CheckIcon from '@/utils/assets/Check.svg?svgr';
import { Sort, SortEnum } from '../../Sort/Sort';
import { sortReducer } from './sort.reducer';

interface TopPageProps {
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

export const TopPageComponent: FC<TopPageProps> = (props) => {
  const { firstCategory, page, products } = props;
  const [{ products: sortedPructs, sort }, dispatchSort] = useReducer(
    sortReducer,
    {
      products,
      sort: SortEnum.Rating,
    }
  );

  const setSort = (sort: SortEnum) => {
    dispatchSort({ type: sort });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <HTag tag="h1">{page.title}</HTag>
        <Tag color="gray" size="s">
          {products.length}
        </Tag>
        <Sort sort={sort} setSort={setSort} />
      </div>

      <div className={styles.products}>
        {sortedPructs &&
          sortedPructs.map((p) => <div key={p._id}>{p.title}</div>)}
      </div>

      <div className={styles.hhTitle}>
        <HTag tag="h2">Вакансии - {page.category}</HTag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>

      <div className={styles.hh}>
        <HhDataCard {...page.hh} />
      </div>
      <div className={styles.advantagesBlock}>
        {page.advantages.length > 0 && (
          <>
            <HTag tag="h2">Преимущества</HTag>
            {page.advantages.map((advantage) => (
              <div key={advantage._id} className={styles.advantage}>
                <CheckIcon />
                <Paragraph size="m" className={styles.paragraph}>
                  <div className={styles.advantageTitle}>{advantage.title}</div>
                  <div className={styles.advantageDescription}>
                    {advantage.description}
                  </div>
                </Paragraph>
              </div>
            ))}
          </>
        )}
        <Paragraph size="m" className={styles.paragraph}>
          При завершении очередного проекта над графикой, специалист всегда
          задает себе вопрос о дальнейших перспективах. Отличие профессиональных
          дизайнеров заключается в том, что они гибкие. Сегодня разрабатывается
          логотип новой компании, а завтра вполне можно переключиться на
          иллюстрацию культовой книги.
        </Paragraph>
      </div>
      {page.seoText && (
        <div
          className={styles.seoText}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        ></div>
      )}
      <div className={styles.skils}>
        <HTag tag="h2" className={styles.skilsTitle}>
          Получаемые навыки
        </HTag>
        {page.tags.map((tag) => (
          <Tag key={tag} color="primary" size="s" className={styles.tag}>
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};
