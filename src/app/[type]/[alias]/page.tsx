import { ProductModel } from '@/interfaces/Product.interace';
import { IMenu } from '@/interfaces/menu.interface';
import { TopPageModel } from '@/interfaces/topPage.interface';
import { getCourses, getData } from '@/utils/Api/ApiRequests';
import { FirstLevelMenu } from '@/utils/firstLevelMenu/firstLevelMenu';
import { validationAlias } from '@/utils/validations/validationAlias';

interface CoursesProps {
  params: {
    alias: string;
    menu: IMenu[];
    products: ProductModel[];
    page: TopPageModel;
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
  const { alias } = params;
  const isExist = await validationAlias(alias);

  return <div>{alias}</div>;
}
