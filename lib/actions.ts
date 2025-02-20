'use server';

import { z } from 'zod';
import { loginSchema, signupSchema } from '@/lib/schema';
import db from './db';
import bcrypt from 'bcryptjs';

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
  // 1. validate the data
  const parsedData = signupSchema.safeParse(values);

  // 2. check if the data is valid
  if (!parsedData.success) {
    return {
      success: false,
      error: {
        message: 'Invalid data',
      },
    };
  }

  // 3. check if the email is already taken or not
  const user = await db.user.findUnique({
    where: {
      email: parsedData.data.email,
    },
  });

  if (user) {
    return {
      success: false,
      error: {
        message: 'The email is already taken.',
      },
    };
  }

  // 4. construct the user object
  const { name, email, password } = parsedData.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5. save the user to the database
  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // 6. return the success message
  return {
    success: true,
    data: {
      message: 'You account has been created successfully',
    },
  };
};

export { login, signupAction };
