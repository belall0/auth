import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';

import authConfig from '@/auth/auth.config';
import db from '@/lib/db/prisma';

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
});
