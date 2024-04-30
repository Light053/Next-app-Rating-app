import { ProductModel } from '@/interfaces/Product.interace';
import { IMenu } from '@/interfaces/menu.interface';
import { TopPageModel } from '@/interfaces/topPage.interface';
import axios from 'axios';
import { notFound } from 'next/navigation';

export const getMenu = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<IMenu[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    {
      firstCategory,
    }
  );
  return menu;
};

export const getPage = async (alias: string) => {
  const { data: page } = await axios.get<TopPageModel>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/byAlias/${alias}`
  );
  return page;
};

export const getProducts = async (category: string) => {
  const { data: products } = await axios.post<ProductModel[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/product/find`,
    {
      category,
      limit: 10,
    }
  );
  return products;
};

export const getCourses = async (alias: string) => {
  const menuPromise = getMenu();
  const pagePromise = getPage(alias);

  const [menu, page] = await Promise.all([menuPromise, pagePromise]);

  if (!page || !menu) {
    notFound();
  }

  const products = await getProducts(page.category);

  return {
    props: {
      menu,
      page,
      products,
    },
  };
};

export async function getData(firstCategory: number) {
  const { data: menu } = await axios.post<IMenu[]>(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`,
    {
      firstCategory,
      limit: 5,
    }
  );

  return {
    props: {
      menu,
      firstCategory,
    },
  };
}
