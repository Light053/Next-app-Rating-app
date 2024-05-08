import { Card } from '@/src/components/Card/Card';
import styles from './HhDataCard.module.scss';
import { classNames } from '@/utils/classnames/classnames';
import { HhData } from '@/interfaces/topPage.interface';
import RateIcon from '@/utils/assets/Rate.svg?svgr';
import ColoredRateIcon from '@/utils/assets/ColoredRate.svg?svgr';
import { priceRu } from '@/utils/validatePrice/validatePrice';

interface CardProps extends HhData {
  className?: string;
}

export const HhDataCard = (props: CardProps) => {
  const {
    count,
    juniorSalary,
    middleSalary,
    seniorSalary,
    updatedAt,
    ...otherProps
  } = props;

  return (
    <div className={styles.wrapper} {...otherProps}>
      <Card className={classNames(styles.hhCount, {}, [])} {...otherProps}>
        <div className={styles.hhStatTitle}>Всего вакансий</div>
        <div className={styles.hhStatCount}>{count}</div>
      </Card>
      <Card className={styles.hhSalary}>
        <div>
          <div className={styles.hhStatTitle}>Начальный</div>
          <div className={styles.hhSalaryValue}>{priceRu(juniorSalary)}</div>
          <div className={styles.rate}>
            <RateIcon />
            <RateIcon />
            <ColoredRateIcon />
          </div>
        </div>
        <div>
          <div className={styles.hhStatTitle}>Средний</div>
          <div className={styles.hhSalaryValue}>{priceRu(middleSalary)}</div>
          <div className={styles.rate}>
            <RateIcon />
            <ColoredRateIcon />
            <ColoredRateIcon />
          </div>
        </div>
        <div>
          <div className={styles.hhStatTitle}>Профессионал</div>
          <div className={styles.hhSalaryValue}>{priceRu(seniorSalary)}</div>
          <div className={styles.rate}>
            <ColoredRateIcon />
            <ColoredRateIcon />
            <ColoredRateIcon />
          </div>
        </div>
      </Card>
    </div>
  );
};
