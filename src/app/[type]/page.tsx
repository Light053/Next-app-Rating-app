import { TopPageComponent } from '@/src/components/pagesComponents/topPageComponent/page';
import { getData, getMenu } from '@/utils/Api/ApiRequests';
import { FirstLevelMenu } from '@/utils/firstLevelMenu/firstLevelMenu';
import { notFound } from 'next/navigation';
import { getProductByAlias } from './helpers/helper';

interface CoursesProps {
  params: {
    type: string;
    alias: string;
  };
}

export async function generateStaticParams() {
  const paths: string[] = [];

  for (const level of FirstLevelMenu) {
    const {
      props: { menu },
    } = await getData(level.id);

    paths.push(
      ...menu.flatMap((men) => men.pages.map(() => `/${level.route}`))
    );
  }

  return paths.map((path) => ({
    type: path,
  }));
}

export default async function Courses({ params }: CoursesProps) {
  const firstCategoryItem = FirstLevelMenu.find((m) => m.route === params.type);
  const menu = await getMenu(firstCategoryItem?.id);
  const products = await getProductByAlias(params.alias);

  if (!firstCategoryItem || !menu) {
    return notFound();
  }

  return (
    <div>
      <TopPageComponent
        firstCategory={firstCategoryItem.id}
        menu={menu}
        products={products}
      />
    </div>
  );
}
