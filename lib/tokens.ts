import { v4 as uuidv4 } from 'uuid';
import { getVerificationTokenByEmail } from '@/lib/db/verification-token';
import db from '@/lib/db/prisma';

export const generateVerificationToken = async (email: string) => {
  // generate the token
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 60 * 60 * 1000); // 1 hour

  // check if there's an existing token already send with the email
  const existingToken = await getVerificationTokenByEmail(email);

  // if there is, delete it and create a new one
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  // insert the new token into the database and return it
  const newToken = await db.verificationToken.create({
    data: {
      token,
      email,
      expires,
    },
  });

  return newToken;
};
