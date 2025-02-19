'use client';

import { useState, useTransition } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { login } from '@/lib/actions';
import { loginSchema } from '@/lib/schema';
import FormWrapper from '@/components/auth/FormWrapper';
import FormError from '@/components/FormError';
import FormSuccess from '@/components/FormSuccess';

const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // called when the form is submitted to call the login action and handle the response.
  const onSubmit = (values: z.infer<typeof loginSchema>) => {
    // reset the error and success messages.
    setError('');
    setSuccess('');

    // set transition to pending until the response is received.
    startTransition(async () => {
      const response = await login(values);

      if (response.success) {
        setSuccess(response?.data?.message);
      } else {
        setError(response?.error?.message);
      }
    });
  };

  return (
    <FormWrapper
      formTitle="Log In"
      formType="login"
      formDescription="Welcome back! Log in to your account.">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="belal@example.com"
                      type="email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>

                  <FormControl>
                    <Input
                      placeholder="********"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />

          <Button type="submit" className="w-full" disabled={isPending}>
            Login
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
};

export default LoginForm;
