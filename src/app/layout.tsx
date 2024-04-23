import { Noto_Sans } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';
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
      <body className={notoSans.className}>{children}</body>
    </html>
  );
}
