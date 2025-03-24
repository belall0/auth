import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';

import { getUserByEmail } from '@/lib/db/user';
import { loginSchema } from '@/lib/schemas/auth';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        // Check if the credentials are valid
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) {
          return null;
        }

        // check if the user exists
        const { email, password } = validatedFields.data;
        const user = await getUserByEmail(email);
        if (!user || !user.password) {
          // user not found or user not registered via credentials provider, e.g. google
          return null;
        }

        // check if the password is correct
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          // password is incorrect
          return null;
        }

        // return the user object
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
