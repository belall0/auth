'use client';

import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginFormData } from '@/lib/schemas/auth';

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
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: LoginFormData) {
    startTransition(async () => {
      console.log(`Form submitted with values:`, values);
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
    const data = {
      success: true,
      message: 'Invalid email or password.',
    };

    if (!data || data.message === undefined) return null;

    return (
      <FormStatus
        type={data.success ? 'success' : 'error'}
        message={data.message}
      />
    );
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
