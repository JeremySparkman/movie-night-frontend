import { useState } from 'react';
import { Button } from './Button';

interface IEnterName {
  setName: (val: string) => void;
  setHasStarted: (val: boolean) => void;
}

export function EnterName({ setName, setHasStarted }: IEnterName) {
  const [value, setValue] = useState('');

  const serverUrl = 'localhost';

  const handleClick = async () => {
    setName(value);
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

      setHasStarted(true);
    } catch (err) {
      console.error(err);
      setHasStarted(false);
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
        <Button onClick={handleClick} className="mt-4 w-full">
          Join
        </Button>
      </div>
    </>
  );
}
