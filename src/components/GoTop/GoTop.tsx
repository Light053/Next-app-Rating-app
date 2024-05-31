'use client';

import { useScrollY } from '@/utils/hooks/useScrollY';
import styles from './GoTop.module.scss';
import GoTopIcon from '@/utils/assets/GoTopIcon.svg?svgr';
import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

export const GoTop = () => {
  const scrollY = useScrollY();
  const conrols = useAnimation();

  useEffect(() => {
    conrols.start({ opacity: scrollY / document.body.scrollHeight });
  }, [scrollY, conrols]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      className={styles.icon}
      onClick={scrollToTop}
      animate={conrols}
      initial={{ opacity: 0 }}
    >
      <GoTopIcon />
    </motion.button>
  );
};
