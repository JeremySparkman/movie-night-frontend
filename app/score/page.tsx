'use client';

import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { Button, Room } from 'components';

const Page = () => {
  const [score, setScore] = useState('2.5');
  const { user } = useAuth();

  const handleClick = async () => {
    try {
      const serverUrl = process.env.NEXT_PUBLIC_API_URL || 'localhost';
      const response = await fetch(`http://${serverUrl}/event`, {
        method: 'POST',
        body: JSON.stringify({
          voter: user?.name,
          score,
          room: user?.room,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Room />
      <h1 className="mt-10 mb-3 text-2xl font-bold">Please enter your score</h1>
      <div className="w-full">
        <div>
          <label className="mb-3 mt-5 block text-md font-bold" htmlFor="score">
            Score: {Number(score).toFixed(2)}
          </label>
          <input
            type="range"
            id="score"
            min="0"
            max="5"
            step="0.25"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-sm text-white font-bold mt-1">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
          <Button onClick={handleClick} className="mt-10" href="/result">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
