import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '@/auth/auth.config';
import db from '@/lib/db/prisma';
import { getUserById } from '@/lib/db/user';
import NextAuth, { type DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      role: string;
    } & DefaultSession['user'];
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  // SEARCH: Learn more about the pages
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },

  // SEARCH: Learn more about the NextAuth Events and its use cases
  events: {
    // this function invokes when a user signs up with a third-party provider such as Google or GitHub
    // We need to set emailVerified to the current date
    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },

  // SEARCH: Learn more about callbacks and the flow of invocation of each one
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as string;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) {
        return token;
      }

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
