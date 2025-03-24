'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthFormWrapperProps {
  children: ReactNode;
  formTitle: string;
  formDescription: string;
  formType: 'login' | 'signup';
}

const AuthFormWrapper = ({ children, formTitle, formDescription, formType }: AuthFormWrapperProps) => {
  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <Card className="w-[320px] sm:w-[400px] md:w-[500px]">
      <CardHeader className="space-y-2 p-6 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {formTitle}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{formDescription}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-3">
        {children}

        {formType === 'login' ? (
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground"> Don't have an account?</span>
            <Link href="/auth/signup">
              <span className="text-blue-600">Sign up</span>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span className="text-muted-foreground"> Already have an account?</span>
            <Link href="/auth/login">
              <span className="text-blue-600">Log In</span>
            </Link>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col items-center justify-center gap-y-2">
        <div className="my-1 flex w-full items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="px-4 text-sm text-gray-500 uppercase">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="flex w-full items-center justify-center gap-x-2">
          <Button
            onClick={() => onClick('google')}
            size={'lg'}
            className="w-full cursor-pointer"
            variant={'outline'}>
            <FcGoogle /> Google
          </Button>

          <Button
            onClick={() => onClick('github')}
            size={'lg'}
            className="w-full cursor-pointer"
            variant={'outline'}>
            <FaGithub /> GitHub
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthFormWrapper;
