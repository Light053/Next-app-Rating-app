import { FirstLevelMenuItem } from '@/interfaces/topPage.interface';
import { getData } from '@/utils/Api/ApiRequests';
import styles from './MenuList.module.scss';
import Link from 'next/link';
import { classNames } from '@/utils/classnames/classnames';
import { IPage } from '@/interfaces/menu.interface';
import { FirstLevelMenu } from './firstLevelMenu';

interface MenuListProps {
  url: string;
}

export const MenuList = async (props: MenuListProps) => {
  const { url } = props;

  const {
    props: { firstCategory, menu },
  } = await getData(0);

  const buildFirstLevel = () => {
    return (
      <>
        {FirstLevelMenu.map((m) => (
          <div key={m.route}>
            <Link className={styles.firstLevelLink} href={`/${m.route}`}>
              <div
                className={classNames(
                  styles.firstLevel,
                  {
                    [styles.firstLevelActive]: m.id === firstCategory,
                  },
                  []
                )}
              >
                {m.icon}
                <span>{m.name}</span>
              </div>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map((m) => {
          if (m.pages.map((p) => p.alias).includes(url)) {
            m.isOpened = true;
          }

          return (
            <div key={m._id.secondCategory}>
              <div className={styles.secondLevel}>{m._id.secondCategory}</div>
              <div
                className={classNames(
                  styles.secondLevelBlock,
                  {
                    [styles.secondLevelBlockOpened]: m.isOpened === true,
                  },
                  []
                )}
              >
                {buildThirdLevel(m.pages, menuItem.route)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const buildThirdLevel = (pages: IPage[], route: string) => {
    return (
      <>
        {pages.map((p) => (
          <Link
            href={`/${route}/${p.alias}`}
            className={classNames(
              styles.thirdLevel,
              {
                [styles.thirdLevelActive]: `/${p.alias}` === `/${url}`,
              },
              []
            )}
            key={p._id}
          >
            {p.alias}
          </Link>
        ))}
      </>
    );
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
