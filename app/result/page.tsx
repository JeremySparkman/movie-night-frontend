'use client';
import { Button, Room } from 'components';

const Page = () => {
  return (
    <div className="relative">
      <Room />
      <h1>Thank you for voting</h1>
      <Button
        className="mt-4 bg-red-500"
        href="/"
        onClick={() => {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
          }
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default Page;
