import { ProductModel } from '@/interfaces/Product.interace';
import styles from './topPageComponent.module.scss';
import { IMenu } from '@/interfaces/menu.interface';
import { TopLevelCategory } from '@/interfaces/topPage.interface';
import { FC } from 'react';

interface TopPageProps {
  firstCategory: TopLevelCategory;
  menu: IMenu[];
  products: ProductModel[];
}

export const TopPageComponent: FC<TopPageProps> = (props) => {
  const { firstCategory, menu, products } = props;

  return (
    <div>
      {JSON.stringify(products)}
      {JSON.stringify(menu)}
      {firstCategory}
    </div>
  );
};
