'use client';

import { classNames } from '@/utils/classnames/classnames';
import { HTag, Tag } from '../components';
import styles from './page.module.scss';
import { Button, ButtonThemes } from '../components/Button/Button';
import { Paragraph } from '../components/Paragraph/Paragraph';

export default function Home(): JSX.Element {
  return (
    <div className={classNames(styles.page, {}, [])}>
      <HTag tag="h1">Text</HTag>
      <Button
        arrow="down"
        theme={ButtonThemes.PRIMARY}
        onClick={() => console.log('click')}
      >
        Button
      </Button>
      <Button arrow="right" theme={ButtonThemes.GHOST}>
        Button
      </Button>

      <Paragraph size="s">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique rem
        sequi ex quidem sint aliquam pariatur eius, assumenda aliquid magnam
        saepe dolorum explicabo expedita quibusdam consequatur qui ab,
        laudantium molestias.
      </Paragraph>
      <br />
      <Paragraph size="m">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique rem
        sequi ex quidem sint aliquam pariatur eius, assumenda aliquid magnam
        saepe dolorum explicabo expedita quibusdam consequatur qui ab,
        laudantium molestias.
      </Paragraph>
      <br />
      <Paragraph size="l">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique rem
        sequi ex quidem sint aliquam pariatur eius, assumenda aliquid magnam
        saepe dolorum explicabo expedita quibusdam consequatur qui ab,
        laudantium molestias.
      </Paragraph>
      <br />
      <Tag size="s" color="ghost">
        Small Ghost Tag
      </Tag>

      <Tag size="m" color="red">
        Medium Red Tag
      </Tag>

      <Tag size="m" color="gray">
        Medium Gray Tag
      </Tag>

      <Tag size="m" color="green">
        Medium Green Tag
      </Tag>

      <Tag size="m" color="primary">
        Medium Primary Tag
      </Tag>
    </div>
  );
}
