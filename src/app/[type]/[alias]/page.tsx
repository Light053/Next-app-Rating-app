import { ProductModel } from '@/interfaces/Product.interace';
import { IMenu } from '@/interfaces/menu.interface';
import { TopPageModel } from '@/interfaces/topPage.interface';
import { getCourses, getData } from '@/utils/Api/ApiRequests';
import { FirstLevelMenu } from '@/utils/firstLevelMenu/firstLevelMenu';
import { validationAlias } from '@/utils/validations/validationAlias';
import { notFound } from 'next/navigation';
import { getProductByAlias } from '../helpers/helper';
import { TopPageComponent } from '@/src/components/pagesComponents/topPageComponent/TopPageComponent';

interface CoursesProps {
  params: {
    alias: string;
    type: string;
    menu: IMenu[];
    products: ProductModel[];
    page: TopPageModel;
  };
}

export async function generateMetadata({ params }: CoursesProps) {
  const { page, products } = await getProductByAlias(params.alias);

  return {
    title: page?.metaTitle,
    description: page?.metaDescription,
  };
}

export async function generateStaticParams() {
  const paths: string[] = [];

  for (const l of FirstLevelMenu) {
    const {
      props: { menu },
    } = await getData(l.id);

    paths.push(
      ...menu.flatMap((m) => m.pages.map((p) => `/${l.route}/${p.alias}`))
    );
  }

  return paths.map((path) => ({
    type: path.split('/')[1],
    alias: path.split('/')[2],
  }));
}

export default async function AliasPage({ params }: CoursesProps) {
  const { alias, type } = params;
  await validationAlias(alias);
  const firstCategoryItem = FirstLevelMenu.find((m) => m.route === type);
  const { page, products } = await getProductByAlias(alias);

  if (!firstCategoryItem) {
    return notFound();
  }

  return (
    <div>
      <TopPageComponent
        firstCategory={firstCategoryItem.id}
        page={page as TopPageModel}
        products={products}
      />
    </div>
  );
}
