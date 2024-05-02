import { notFound } from 'next/navigation';
import { getPage } from '../Api/ApiRequests';

export const validationAlias = async (alias: string) => {
  const isExist = await getPage(alias);

  if (!isExist) {
    return notFound();
  }

  return isExist;
};
