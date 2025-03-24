'use server';
import bcrypt from 'bcryptjs';
import { LoginFormData, loginSchema, SignupFormData, signupSchema } from '@/lib/schemas/auth';
import db from '@/lib/db/prisma';
import { getUserByEmail } from '../db/user';
import { signIn } from '@/auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';
import { AuthError } from 'next-auth';

export const signup = async (prevState: any, data: FormData | SignupFormData) => {
  // TODO: remove this line when deploying to production
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // validate the form data
  let validatedFields;
  if (data instanceof FormData) {
    validatedFields = signupSchema.safeParse({
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    });
  } else {
    validatedFields = signupSchema.safeParse(data);
  }
  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid fields. Please check your input.',
    };
  }

  // check if the user already exists
  const { name, email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      success: false,
      message: 'An account with this email already exists',
    };
  }

  // create the user
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // TODO: Send a verification email and redirect to the email verification page
    return {
      success: true,
      message: 'Account created successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred during signup, please try again',
    };
  }
};

export const login = async (prevState: any, data: FormData | LoginFormData) => {
  let validatedFields;
  if (data instanceof FormData) {
    validatedFields = loginSchema.safeParse({
      email: data.get('email'),
      password: data.get('password'),
    });
  } else {
    validatedFields = loginSchema.safeParse(data);
  }

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Invalid fields. Please check your input.',
    };
  }

  const { email, password } = validatedFields.data;
  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin') {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }
  }
};
