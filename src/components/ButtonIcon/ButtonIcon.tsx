'use client';

import { ButtonHTMLAttributes, DetailedHTMLProps, FC, useEffect } from 'react';
import styles from './ButtonIcon.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import Stripes from '@/utils/assets/BurgerCross.svg?svgr';
import BurgerCross from '@/utils/assets/Stripes.svg?svgr';
import GoTopIcon from '@/utils/assets/GoTopIcon.svg?svgr';
import { useScrollY } from '@/utils/hooks/useScrollY';
import { motion, useAnimation, HTMLMotionProps } from 'framer-motion';

export interface ButtonIconProps
  extends Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    | 'onAnimationStart'
    | 'onDragStart'
    | 'onDragStartCapture'
    | 'onDragEnd'
    | 'onDragEndCapture'
    | 'onDrag'
  > {
  className?: string;
  icon: 'up' | 'cross' | 'stripes';
}

export const ButtonIcon: FC<ButtonIconProps> = ({
  className,
  icon,
  ...otherProps
}) => {
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

  const motionProps: HTMLMotionProps<'button'> = {
    initial: { opacity: 0 },
    animate: controls,
  };

  if (icon === 'cross') {
    return (
      <button
        {...otherProps}
        className={classNames(styles.ButtonIcon, {}, [
          className || '',
          styles.CrossIcon,
        ])}
      >
        <BurgerCross />
      </button>
    );
  }
  if (icon === 'stripes') {
    return (
      <button
        {...otherProps}
        className={classNames(styles.ButtonIcon, {}, [
          styles.StripesIcon,
          className || '',
        ])}
      >
        <Stripes />
      </button>
    );
  }

  if (icon === 'up') {
    return (
      <motion.button
        {...motionProps}
        {...otherProps}
        onClick={scrollToTop}
        className={classNames(styles.UpIcon, {}, [
          styles.ButtonIcon,
          className || '',
        ])}
      >
        <GoTopIcon />
      </motion.button>
    );
  }

  return null;
};
