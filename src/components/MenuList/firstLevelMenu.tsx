import ServiceIcon from '@/src/assets/Cloud.svg?svgr';
import CoursesIcon from '@/src/assets/Courses.svg?svgr';
import BookIcon from '@/src/assets/Book.svg?svgr';
import ProductIcon from '@/src/assets/Product.svg?svgr';
import {
  FirstLevelMenuItem,
  TopLevelCategory,
} from '@/interfaces/topPage.interface';

export const FirstLevelMenu: FirstLevelMenuItem[] = [
  {
    route: 'courses',
    name: 'Курсы',
    icon: (
      <>
        <CoursesIcon />
      </>
    ),
    id: TopLevelCategory.Courses,
  },
  {
    route: 'services',
    name: 'Сервисы',
    icon: (
      <>
        <ServiceIcon />
      </>
    ),
    id: TopLevelCategory.Services,
  },
  {
    route: 'books',
    name: 'Книги',
    icon: (
      <>
        <BookIcon />
      </>
    ),
    id: TopLevelCategory.Books,
  },
  {
    route: 'products',
    name: 'Продукты',
    icon: (
      <>
        <ProductIcon />
      </>
    ),
    id: TopLevelCategory.Products,
  },
];
