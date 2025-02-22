'use server';

import { z } from 'zod';
import { loginSchema, signupSchema } from '@/lib/schema';
import db from './db';
import bcrypt from 'bcryptjs';
import { signIn } from '@/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';
import { AuthError } from 'next-auth';

type LoginValues = z.infer<typeof loginSchema>;
type SignupValues = z.infer<typeof signupSchema>;

const login = async (values: LoginValues) => {
  console.log("I'm inside the login server action");
  const validatedFields = loginSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      success: false,
      error: {
        message: 'Invalid fields',
      },
    };
  }

  const { email, password } = validatedFields.data;
  console.log('email:', email);
  console.log('password:', password);
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT, // redirect to the home page if the user is authenticated
    });
  } catch (e) {
    // if the error is an instance of AuthError, then it's a custom error
    if (e instanceof AuthError) {
      if (e.type === 'CredentialsSignin') {
        return {
          success: false,
          error: {
            message: 'Invalid credentials',
          },
        };
      }

      return {
        success: false,
        error: {
          message: 'something went wrong',
        },
      };
    }

    throw e;
  }
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
