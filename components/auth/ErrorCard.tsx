'use client';

import { useRouter } from 'next/navigation';

import { AlertTriangleIcon, ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const ErrorCard = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Card className="mx-auto w-full max-w-md border-2 border-red-100 shadow-2xl">
      <CardHeader className="space-y-3 p-6 text-center">
        <div className="mb-2 flex justify-center">
          <AlertTriangleIcon
            className="h-12 w-12 animate-pulse text-red-500"
            strokeWidth={1.5}
          />
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-red-600">Oops! Something Went Wrong</CardTitle>
        <CardDescription className="text-sm text-gray-600">
          We apologize for the inconvenience. Please try again later or contact support if the issue persists.
        </CardDescription>
      </CardHeader>

      <CardFooter className="flex justify-center pb-6">
        <Button
          variant="destructive"
          onClick={handleGoBack}
          className="flex items-center gap-2 shadow-md transition-shadow hover:shadow-lg">
          <ArrowLeftIcon className="h-4 w-4" />
          Go Back Safely
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
