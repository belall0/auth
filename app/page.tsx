import { FaLock } from 'react-icons/fa6';
import { poppins } from '@/lib/fonts';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import AuthButton from '@/components/auth/AuthButton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const Home = () => {
  return (
    <main className="bg-gradient flex h-full flex-col items-center justify-center">
      <div className="b flex w-full max-w-lg flex-col items-center justify-center gap-y-16">
        <Card className="w-[320px] sm:w-[400px] md:w-[500px]">
          <CardHeader className="flex items-center justify-center gap-4">
            <CardTitle
              className={cn(
                poppins.className,
                `flex gap-x-5 text-6xl font-bold`,
              )}>
              <FaLock />
              Auth
            </CardTitle>

            <CardDescription className="text-xl font-semibold">
              The{' '}
              <span className="text-gradient text-2xl font-semibold">
                authentication
              </span>{' '}
              service you deserve
            </CardDescription>
          </CardHeader>

          <CardContent className="flex justify-center gap-x-6">
            <AuthButton url="/auth/login">
              <Button className="font-bold" variant={'secondary'} size={'lg'}>
                Log In
              </Button>
            </AuthButton>

            <AuthButton url="/auth/signup">
              <Button className="font-bold" size={'lg'}>
                Sign Up
              </Button>
            </AuthButton>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Home;
