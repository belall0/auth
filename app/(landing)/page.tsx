import Link from 'next/link';
import { poppins } from '@/lib/fonts';

import { FiLogIn, FiUserPlus } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const LandingPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[320px] sm:w-[400px] md:w-[500px]">
        <CardHeader className="text-center">
          <CardTitle className={`${poppins.className} text-3xl font-bold`}>🔐 Authentication</CardTitle>
          <CardDescription className="">Simple auth built with auth.js package</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3 pt-4 sm:flex-row">
          <Link
            href="/auth/login"
            className="flex-1">
            <Button
              variant={'default'}
              size={'lg'}
              className="flex w-full cursor-pointer items-center justify-center">
              <FiLogIn className="mr-2" /> <span>Log In</span>
            </Button>
          </Link>

          <Link
            href="/auth/signup"
            className="flex-1">
            <Button
              variant="secondary"
              size={'lg'}
              className="flex w-full cursor-pointer items-center justify-center">
              <FiUserPlus className="mr-2" /> <span>Sign Up</span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default LandingPage;
