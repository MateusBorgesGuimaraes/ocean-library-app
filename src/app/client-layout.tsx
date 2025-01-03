'use client';

import { Sidebar } from '@/components/sidebar';
import { Header } from '@/components/header';
import { BookPreview } from '@/components/book-preview/book-preview';
import { Footer } from '@/components/footer/footer';
import { ToastContainer } from '@/components/toast/toast-container';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <header className="header">
        <Header />
      </header>
      <main className="main-content">
        <ToastContainer />
        {children}
      </main>
      <div className="book-preview">
        <BookPreview />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
