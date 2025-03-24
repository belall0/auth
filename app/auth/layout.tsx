import { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return <div className="flex min-h-screen items-center justify-center">{children}</div>;
};

export default AuthLayout;
