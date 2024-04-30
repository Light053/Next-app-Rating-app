import { ProductModel } from '@/interfaces/Product.interace';
import { IMenu } from '@/interfaces/menu.interface';
import { TopPageModel } from '@/interfaces/topPage.interface';
import { getCourses, getMenu } from '@/utils/Api/ApiRequests';
import axios from 'axios';
import { notFound } from 'next/navigation';

interface CoursesProps {
  params: {
    alias: string;
    menu: IMenu[];
    products: ProductModel[];
    page: TopPageModel;
  };
}

export async function generateStaticParams() {
  const menu = await getMenu();

  return menu.flatMap((m) =>
    m.pages.map((p) => ({
      alias: p.alias,
    }))
  );
}

export default async function Courses({ params }: CoursesProps) {
  const { alias } = params;

  const {
    props: { menu, page, products },
  } = await getCourses(alias);

  return <div>{alias}</div>;
}
