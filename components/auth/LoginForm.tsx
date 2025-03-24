'use client';

import { useActionState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { login } from '@/lib/actions/auth';
import { loginSchema, LoginFormData } from '@/lib/schemas/auth';
import { useSearchParams } from 'next/navigation';

import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import FormStatus from '@/components/auth/FormStatus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface FormFieldConfig {
  name: keyof LoginFormData;
  label: string;
  type: string;
  placeholder: string;
}

const formFields: FormFieldConfig[] = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'belal@example.com',
  },

  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '********',
  },
];

const LoginForm = () => {
  // Handle the case where the user is redirected to the login page with an error message from OAuth
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked' ? 'Email already in use with different provider' : null;

  // to get the response from the loginAction
  const [data, action] = useActionState(login, undefined);
  // to handle the pending state of the submission
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormData) {
    startTransition(() => {
      action(values);
    });
  }

  const renderFormField = ({ name, label, type, placeholder }: FormFieldConfig, key: string) => (
    <FormField
      key={key}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={type}
              placeholder={placeholder}
              {...field}
              disabled={isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderFormStatus = () => {
    if (data === null && urlError === null) return null;

    if (data) {
      return (
        <FormStatus
          type={data.success ? 'success' : 'error'}
          message={data.message}
        />
      );
    }

    if (urlError) {
      return (
        <FormStatus
          type="error"
          message={urlError}
        />
      );
    }
  };

  return (
    <AuthFormWrapper
      formTitle="Log In to Your Account"
      formDescription="Enter your credentials to access your account."
      formType="login">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
          {formFields.map((field) => renderFormField(field, field.name))}
          {renderFormStatus()}

          <Button
            type="submit"
            disabled={isPending}
            size={'lg'}
            className="w-full cursor-pointer">
            Log In
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default LoginForm;
