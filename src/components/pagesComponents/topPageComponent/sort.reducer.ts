import { SortEnum } from '../../Sort/Sort';
import { ProductModel } from '@/interfaces/Product.interace';

export type SortActions =
  | {
      type: SortEnum.Price;
    }
  | {
      type: SortEnum.Rating;
    };

export interface State {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (state: State, action: SortActions): State => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((a, b) =>
          b.initialRating > a.initialRating ? -1 : 1
        ),
      };
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) =>
          b.initialRating > a.initialRating ? 1 : -1
        ),
      };
    default:
      throw new Error('Неверный тип сортировки');
  }
};
