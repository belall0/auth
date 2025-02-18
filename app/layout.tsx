import type { Metadata } from 'next';

import { inter } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  title: 'Auth',
  description: 'Implementing authentication in Next.js with Auth0',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased')}>{children}</body>
    </html>
  );
};

export default RootLayout;
