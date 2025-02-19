'use client';

import { ReactNode } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import AuthButton from '@/components/auth/AuthButton';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface FormWrapperProps {
  children: ReactNode;
  formTitle: string;
  formDescription: string;
  formType: 'login' | 'signup';
}

const FormWrapper = ({
  children,
  formTitle,
  formDescription,
  formType,
}: FormWrapperProps) => {
  return (
    <Card className="w-[320px] sm:w-[400px] md:w-[500px]">
      <CardHeader className="space-y-2 p-6 text-center">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {formTitle}
        </CardTitle>
        <CardDescription className="text-sm text-gray-500 dark:text-gray-400">
          {formDescription}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-y-10">
        {children}
        {/* Social Buttons */}
        <div className="flex w-full items-center justify-center gap-x-2">
          <Button
            size={'lg'}
            className="w-full"
            variant={'outline'}
            onClick={() => {}}>
            <FcGoogle />
          </Button>
          <Button
            size={'lg'}
            className="w-full"
            variant={'outline'}
            onClick={() => {}}>
            <FaGithub />
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center">
        {formType === 'login' ? (
          <AuthButton url="/auth/signup">
            <Button variant={'link'} className="text-black">
              Don't have an account? Sign up
            </Button>
          </AuthButton>
        ) : (
          <AuthButton url="/auth/login">
            <Button variant={'link'} className="text-black">
              Already have an account? Login
            </Button>
          </AuthButton>
        )}
      </CardFooter>
    </Card>
  );
};

export default FormWrapper;
