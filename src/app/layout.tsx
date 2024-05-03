import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
import { Header } from '../components/Header/Header';
import styles from './page.module.scss';
import { Footer, Sidebar } from '../components';

const notoSans = Noto_Sans({
  weight: ['300', '400', '700', '500'],
  style: 'normal',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Rating-app',
  description: 'rating app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={notoSans.className}>
        <div className={styles.wrapper}>
          <Header className={styles.header} />
          <Sidebar className={styles.sidebar} />
          <div className={styles.body}>{children}</div>
          <Footer className={styles.footer} />
        </div>
      </body>
    </html>
  );
}
