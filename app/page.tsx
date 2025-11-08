'use client';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, FormEventHandler, useState } from 'react';
import { Button } from 'components';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent
  ) => {
    event.preventDefault();
    setUser({ name: userName, room: '' });
    router.push('/room');
  };

  return (
    <>
      <h1 className="mb-3 text-2xl">Before we start the vote...</h1>
      <form className="min-w-[19.6875rem]" onSubmit={handleSubmit}>
        <div className="w-full">
          <label className="mb-3 mt-5 block text-sm font-medium" htmlFor="name">
            Name
            <input
              className="mt-2 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
              id="name"
              onChange={(e) => {
                setError(null);
                setUserName(e.target.value);
              }}
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              value={userName}
            />
          </label>
          {error && <div className="mt-8 text-red-500">{error}</div>}
          <Button className="mt-8" type="submit">
            Begin
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
