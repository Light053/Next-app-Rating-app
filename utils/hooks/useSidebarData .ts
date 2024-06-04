import { useState, useEffect } from 'react';
import { getData } from '@/utils/Api/ApiRequests';
import { IMenu } from '@/interfaces/menu.interface';

interface SidebarDataProps {
  menu: IMenu[];
  firstCategory: number;
}

export const useSidebarData = () => {
  const [data, setData] = useState<SidebarDataProps>({
    menu: [],
    firstCategory: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const {
        props: { menu, firstCategory },
      } = await getData(0);
      setData({ menu, firstCategory });
    };

    fetchData();
  }, []);

  return data;
};
