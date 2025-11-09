'use client';
import { Button } from 'components/Button';
import { useRouter } from 'next/navigation';
import { useAuth } from 'providers/AuthProvider';
import { FormEvent, useState } from 'react';

export function RoomList({ rooms }: { rooms: string[] }) {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const serverUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (event: FormEvent, room: string) => {
    event.preventDefault();

    try {
      const response = await fetch(`https://${serverUrl}/event`, {
        method: 'POST',
        body: JSON.stringify({
          voter: user?.name,
          score: '',
          room: room,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setUser({ name: user?.name, room });
      router.push('/score');
    } catch (err) {
      console.error(err);
      setError('An error has occured. Please try again later.');
    }
  };

  return (
    <div>
      <h2 className="mt-10 text-2xl">Join an existing room</h2>
      {error && <div className="mt-8 text-red-500">{error}</div>}
      {rooms.map((room) => (
        <div className="flex items-center justify-between my-8" key={room}>
          <h3 className="text-lg">{room}</h3>
          <form onSubmit={(event) => handleSubmit(event, room)}>
            <Button styleType="secondary" type="submit">
              Join
            </Button>
          </form>
        </div>
      ))}
    </div>
  );
}
