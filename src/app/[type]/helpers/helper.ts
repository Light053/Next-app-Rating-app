import { ProductModel } from '@/interfaces/Product.interace';
import { getPage, getProducts } from '@/utils/Api/ApiRequests';
import { notFound } from 'next/navigation';

export const getProductByAlias = async (alias: string) => {
  try {
    const page = await getPage(alias);
    let products: ProductModel[] = [];

    if (page) {
      products = await getProducts(page.category);
    }

    return { page, products };
  } catch (error) {
    console.log(error);

    return notFound();
  }
};
