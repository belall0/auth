import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { ToastContainer } from 'react-toastify';

import { inter } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Authentication starter template for Next.js',
};

interface RoteLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RoteLayoutProps) => {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-900 text-white antialiased`}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
};

export default RootLayout;
