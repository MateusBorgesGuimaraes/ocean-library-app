import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { BookPreview } from '@/components/book-preview/book-preview';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} layout`}>
        <aside className="sidebar">
          <Sidebar />
        </aside>
        <header className="header">
          <Header />
        </header>
        <main className="main-content">{children}</main>
        <div className="book-preview">
          <BookPreview />
        </div>
      </body>
    </html>
  );
}
