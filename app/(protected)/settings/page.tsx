import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { signOut } from '@/auth';
const page = async () => {
  const session = await auth();

  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}>
        <Button type="submit">Log out</Button>
      </form>
    </div>
  );
};

export default page;
