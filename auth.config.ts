import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { loginSchema } from '@/lib/schema';
import db from './lib/db';
import bcrypt from 'bcryptjs';

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        console.log(
          `I'm inside the authorize function in the credentials provider`,
        );
        // validate the fields
        const validatedFields = loginSchema.safeParse(credentials);

        if (!validatedFields.success) {
          return null;
        }

        const { email, password } = validatedFields.data;

        // check if the user exists in the database
        const user = await db.user.findUnique({
          where: {
            email: email,
          },
        });

        // if there's no user or there's a user but uses OAuth
        if (!user || !user.password) {
          return null;
        }

        // check if the password is correct
        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
          return null;
        }

        // if everything is correct, grant access and return the user to be stored in the session
        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
