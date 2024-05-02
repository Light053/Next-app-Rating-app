import { FC } from 'react';
import styles from './Sidebar.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import MenuList from '../MenuList/MenuList';
import { getData } from '@/utils/Api/ApiRequests';
import OwlLogo from '@/utils/assets/OwlLogo.svg?svgr';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = async ({
  className,
  ...otherProps
}) => {
  const {
    props: { menu, firstCategory },
  } = await getData(0);
  return (
    <div
      className={classNames(styles.Sidebar, {}, [className || ''])}
      {...otherProps}
    >
      <OwlLogo className={styles.logo} />
      <div>поиск</div>
      <MenuList firstCategory={firstCategory} menu={menu} />
    </div>
  );
};
