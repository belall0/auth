'use client';

import { useActionState, useEffect, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { signup } from '@/lib/actions/auth';
import { signupSchema, SignupFormData } from '@/lib/schemas/auth';

import AuthFormWrapper from '@/components/auth/AuthFormWrapper';
import FormStatus from '@/components/auth/FormStatus';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

interface FormFieldConfig {
  name: keyof SignupFormData;
  label: string;
  type: string;
  placeholder: string;
}

const formFields: FormFieldConfig[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    placeholder: 'Belal Muhammad',
  },
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
  {
    name: 'confirmPassword',
    label: 'Confirm Password',
    type: 'password',
    placeholder: '********',
  },
];

const SignupForm = () => {
  // to get the response from the loginAction
  const [data, action] = useActionState(signup, undefined);
  // to handle the pending state of the submission
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    if (data && data.success) {
      form.reset();
    }
  }, [data]);

  function onSubmit(values: SignupFormData) {
    startTransition(() => {
      action(values);
    });
  }

  const renderFormFields = ({ name, type, label, placeholder }: FormFieldConfig, key: string) => (
    <FormField
      key={key}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              type={type}
              disabled={isPending}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  const renderFormStatus = () => {
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
      formTitle="Create Your Account"
      formDescription="Sign up to get started. It’s quick and secure."
      formType="signup">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8">
          {formFields.map((field) => renderFormFields(field, field.name))}
          {renderFormStatus()}

          <Button
            type="submit"
            size={'lg'}
            className="w-full cursor-pointer"
            disabled={isPending}>
            Create an account
          </Button>
        </form>
      </Form>
    </AuthFormWrapper>
  );
};

export default SignupForm;
