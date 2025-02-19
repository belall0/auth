'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthButtonProps {
  children: ReactNode;
  url: string;
}

const AuthButton = ({ children, url }: AuthButtonProps) => {
  // router to navigate to the url in client side component
  const router = useRouter();

  const onClick = () => {
    router.push(url);
  };

  return <div onClick={onClick}>{children}</div>;
};

export default AuthButton;
