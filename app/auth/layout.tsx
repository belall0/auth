import { ReactNode } from 'react';

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-gradient flex h-full items-center justify-center">
      {children}
    </div>
  );
};

export default layout;
