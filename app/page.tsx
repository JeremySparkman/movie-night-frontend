'use client';
import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { Button } from 'ui/Button';

const Page = () => {
  const { setUser } = useAuth();
  const [value, setValue] = useState('');

  const serverUrl = 'localhost';

  const handleClick = async () => {
    try {
      const response = await fetch(`http://${serverUrl}/event`, {
        method: 'POST',
        body: JSON.stringify({
          voter: value,
          score: null,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      setUser(value);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="mb-3 text-2xl">Please enter your name</h1>
      <div className="w-full">
        <div>
          <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="name">
            Name
          </label>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 text-black"
              id="name"
              onChange={(e) => {
                setValue(e.target.value);
              }}
              type="name"
              name="name"
              placeholder="Enter your name"
              required
              value={value}
            />
          </div>
        </div>
        <Button onClick={handleClick} className="mt-4 w-full" href="/score">
          Join
        </Button>
      </div>
    </>
  );
};

export default Page;
