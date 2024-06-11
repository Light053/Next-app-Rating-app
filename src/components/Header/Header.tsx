'use client';

import { useState } from 'react';
import styles from './Header.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import Logo from '@/utils/assets/OwlLogo.svg?svgr';
import { ButtonIcon } from '../ButtonIcon/ButtonIcon';
import { motion } from 'framer-motion';
import { Sidebar } from '../Sidebar/Sidebar';
import { useSidebarData } from '@/utils/hooks/useSidebarData ';

interface HeaderProps {
  className?: string;
}

export const Header = ({ className, ...props }: HeaderProps): JSX.Element => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const { menu, firstCategory } = useSidebarData();

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20,
      },
    },
    closed: {
      opacity: 0,
      x: '100%',
    },
  };

  console.log(isOpened);

  return (
    <header
      className={classNames(styles.Header, {}, [className || ''])}
      {...props}
    >
      <Logo />
      <ButtonIcon
        icon="stripes"
        onClick={() => {
          console.log('Open button clicked');
          setIsOpened(true);
        }}
      />
      <motion.div
        className={styles.mobileMenu}
        variants={variants}
        initial={'closed'}
        animate={isOpened ? 'opened' : 'closed'}
      >
        <Sidebar propsMenu={menu} />
        <ButtonIcon
          className={styles.menuClose}
          icon="cross"
          onClick={() => {
            console.log('Close button clicked');
            setIsOpened(false);
          }}
        />
      </motion.div>
    </header>
  );
};
