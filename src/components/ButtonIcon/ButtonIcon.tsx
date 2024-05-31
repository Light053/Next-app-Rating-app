'use client';

import { FC, useEffect } from 'react';
import styles from './ButtonIcon.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import Stripes from '@/utils/assets/BurgerCross.svg?svgr';
import BurgerCross from '@/utils/assets/Stripes.svg?svgr';
import GoTopIcon from '@/utils/assets/GoTopIcon.svg?svgr';
import { useScrollY } from '@/utils/hooks/useScrollY';
import { motion, useAnimation } from 'framer-motion';

interface ButtonIconProps {
  className?: string;
  icon: 'up' | 'cross' | 'stripes';
}

export const ButtonIcon: FC<ButtonIconProps> = ({ className, icon }) => {
  const scrollY = useScrollY();
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: scrollY / document.body.scrollHeight });
  }, [scrollY, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (icon === 'cross') {
    return (
      <motion.button
        className={classNames(styles.ButtonIcon, {}, [
          className || '',
          styles.CrossIcon,
        ])}
      >
        <BurgerCross />
      </motion.button>
    );
  }
  if (icon === 'stripes') {
    return (
      <motion.button
        className={classNames(styles.ButtonIcon, {}, [
          styles.StripesIcon,
          className || '',
        ])}
      >
        <Stripes />
      </motion.button>
    );
  }

  if (icon === 'up') {
    return (
      <motion.button
        onClick={scrollToTop}
        animate={controls}
        initial={{ opacity: 0 }}
        className={classNames(styles.UpIcon, {}, [
          styles.ButtonIcon,
          className || '',
        ])}
      >
        <GoTopIcon />
      </motion.button>
    );
  }
};
