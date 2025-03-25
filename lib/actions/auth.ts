'use server';

import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { LoginFormData, loginSchema, SignupFormData, signupSchema } from '@/lib/schemas/auth';
import db from '@/lib/db/prisma';
import { getUserByEmail } from '@/lib/db/user';
import { signIn } from '@/auth/auth';
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';

export const signup = async (prevState: any, data: FormData | SignupFormData) => {
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

    // generate and send verification token
    const verificationToken = await generateVerificationToken(email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      success: true,
      message: 'Account created successfully. Please check your email to verify your account.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred during signup, please try again',
    };
  }
};

export const login = async (prevState: any, data: FormData | LoginFormData) => {
  // validate the form data
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

  // check if the user already exists
  const { email, password } = validatedFields.data;
  const existingUser = await getUserByEmail(email);

  // check if the user login with credentials provider
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }

  // check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
  if (!isPasswordCorrect) {
    return {
      success: false,
      message: 'Invalid email or password',
    };
  }

  // check if the email is verified or not
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email);
    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
      success: true,
      message: 'Email not verified. Please check your email to verify your account.',
    };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return {
            success: false,
            message: 'Invalid email or password',
          };

        default:
          return {
            success: false,
            message: 'Something went wrong. Please try again later',
          };
      }
    }

    throw error;
  }
};
