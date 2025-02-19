'use server';

import { z } from 'zod';
import { loginSchema, signupSchema } from '@/lib/schema';

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

const login = async (values: LoginValues) => {
  const data = loginSchema.safeParse(values);

  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (!data.success) {
    return {
      success: false,
      error: {
        message: 'Invalid fields',
      },
    };
  }

  return {
    success: true,
    data: {
      message: 'Email sent!',
    },
  };
};

const signupAction = async (values: SignupValues) => {
  const parsedData = signupSchema.safeParse(values);

  await new Promise((resolve) => setTimeout(resolve, 1500));
  if (!parsedData.success) {
    return {
      success: false,
      error: {
        message: 'Invalid data',
      },
    };
  }

  return {
    success: true,
    data: {
      message: 'You account has been created successfully',
    },
  };
};

export { login, signupAction };
