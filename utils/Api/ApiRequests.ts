import { ProductModel } from '@/interfaces/Product.interace';
import { IMenu } from '@/interfaces/menu.interface';
import { TopPageModel } from '@/interfaces/topPage.interface';
import axios from 'axios';
import { notFound } from 'next/navigation';
import { ApiPaths } from './ApiPaths';

export const getMenu = async (firstCategory = 0) => {
  const { data: menu } = await axios.post<IMenu[]>(`${ApiPaths.topPage.find}`, {
    firstCategory: firstCategory,
  });
  return menu;
};

export const getPage = async (alias: string) => {
  try {
    const { data: page } = await axios.get<TopPageModel>(
      `${ApiPaths.product.get}${alias}`
    );
    return page as TopPageModel;
  } catch (error) {
    return null;
  }
};

export const getProducts = async (category: string) => {
  const { data: products } = await axios.post<ProductModel[]>(
    `${ApiPaths.product.find}`,
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
  const { data: menu } = await axios.post<IMenu[]>(`${ApiPaths.topPage.find}`, {
    firstCategory,
    limit: 5,
  });

  return {
    props: {
      menu,
      firstCategory,
    },
  };
}
