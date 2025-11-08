'use client';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, FormEventHandler, useEffect, useState } from 'react';
import { Button, RoomList } from 'components';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [error, setError] = useState<string | null>(null);
  const [roomName, setRoomName] = useState('');
  const [rooms, setRooms] = useState<string[] | null>(null);
  const { user, setUser } = useAuth();
  const router = useRouter();

  const serverUrl = process.env.NEXT_PUBLIC_API_URL || 'localhost';

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch(`http://${serverUrl}/rooms`);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        setRooms(data.rooms);
      } catch (err) {
        console.error('Failed to fetch rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent
  ) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://${serverUrl}/event`, {
        method: 'POST',
        body: JSON.stringify({
          voter: user?.name,
          score: '',
          room: roomName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setUser({ name: user?.name, room: roomName });
      router.push('/score');
    } catch (err) {
      console.error(err);
      setError('An error has occured. Please try again later.');
    }
  };

  return (
    <>
      {rooms && rooms.length !== 0 && <RoomList rooms={rooms} />}
      <h1 className="mb-3 text-2xl">Create a new room</h1>
      <form className="min-w-[19.6875rem]" onSubmit={handleSubmit}>
        <div className="w-full">
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
          {error && <div className="mt-8 text-red-500">{error}</div>}
          <Button className="mt-8" type="submit">
            Create
          </Button>
        </div>
      </form>
    </>
  );
};

export default Page;
