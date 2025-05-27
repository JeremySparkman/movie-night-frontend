'use client';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, FormEventHandler, useState } from 'react';
import { Button } from 'components';
import { useRouter } from 'next/navigation';

const Page = () => {
  const { setUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState('');
  const [roomName, setRoomName] = useState('');
  const router = useRouter();

  const serverUrl = 'localhost';

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://${serverUrl}/event`, {
        method: 'POST',
        body: JSON.stringify({
          voter: userName,
          score: '',
          room: roomName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setUser({ name: userName, room: roomName });
      router.push('/score');
    } catch (err) {
      console.error(err);
      setError('An error has occured. Please try again later.');
    }
  };

  return (
    <>
      <h1 className="mb-3 text-2xl">Please enter your name</h1>
      <form className="min-w-[19.6875rem]" onSubmit={handleSubmit}>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-sm font-medium"
              htmlFor="name"
            >
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
            <label className="mt-3 block text-sm font-medium" htmlFor="room">
              Room
              <input
                className="mt-2 peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
                id="room"
                onChange={(e) => {
                  setError(null);
                  setRoomName(e.target.value);
                }}
                type="text"
                name="room"
                placeholder="Enter your room name"
                required
                value={roomName}
              />
            </label>
          </div>
          {error && <div className="mt-8 text-red-500">{error}</div>}
          <Button className="mt-8" type="submit">
            Join
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
