'use client';

import { FirstLevelMenuItem } from '@/interfaces/topPage.interface';
import styles from './MenuList.module.scss';
import Link from 'next/link';
import { classNames } from '@/utils/classnames/classnames';
import { IMenu, IPage } from '@/interfaces/menu.interface';
import { FirstLevelMenu } from '@/utils/firstLevelMenu/firstLevelMenu';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface MenuListProps {
  firstCategory: number;
  menu: IMenu[];
}

export default function MenuList(props: MenuListProps) {
  const { firstCategory, menu } = props;
  const path = usePathname();
  const [newMenu, setNewMenu] = useState<IMenu[]>(menu);

  const url = path.split('/')[2];

  const variants = {
    visible: {
      marginBottom: 15,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
      },
    },
    hidden: {
      marginBottom: 0,
    },
  };

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: '29px',
    },
    hidden: {
      opacity: 0,
      height: '0px',
    },
  };

  const openSecondLevel = (secondCategory: string) => {
    const newMenu = menu.map((m) => {
      if (m._id.secondCategory && m._id.secondCategory === secondCategory) {
        m.isOpened = !m.isOpened;
        return m;
      }
    });

    setNewMenu(newMenu as IMenu[]);
  };
  const buildFirstLevel = () => {
    return (
      <>
        {FirstLevelMenu.map((m) => (
          <div key={m.route}>
            <Link className={styles.firstLevelLink} href={'#'} key={m.route}>
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
        {menu &&
          newMenu &&
          menu.map((m) => {
            return (
              <div key={m._id.secondCategory}>
                <div
                  className={styles.secondLevel}
                  onClick={() => openSecondLevel(m._id.secondCategory)}
                >
                  {m._id.secondCategory}
                </div>
                <motion.div
                  layout
                  variants={variants}
                  initial={m.isOpened ? 'visible' : 'hidden'}
                  animate={m.isOpened ? 'visible' : 'hidden'}
                  className={classNames(styles.secondLevelBlock, {}, [])}
                >
                  {buildThirdLevel(m.pages, menuItem.route)}
                </motion.div>
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
          <motion.div
            key={p._id}
            className={styles.thirdLevel}
            variants={variantsChildren}
          >
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
          </motion.div>
        ))}
      </>
    );
  };

  return <div className={styles.menu}>{buildFirstLevel()}</div>;
}
