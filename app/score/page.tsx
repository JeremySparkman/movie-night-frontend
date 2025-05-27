'use client';

import { useAuth } from 'providers/AuthProvider';
import { useState } from 'react';
import { Button, Room } from 'components';

const Page = () => {
  const [score, setScore] = useState('3');
  const { user } = useAuth();

  const handleClick = async () => {
    try {
      const serverUrl = 'localhost';
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
      <h1 className="mb-3 text-2xl">Please enter your score</h1>
      <div className="w-full">
        <div>
          <label
            className="mb-3 mt-5 block text-sm font-medium"
            htmlFor="score"
          >
            Score {score}
          </label>
          <div className="flex items-center space-x-2 mb-4" id="score">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                aria-label={`Rate ${value}`}
                className={
                  value <= Number(score)
                    ? 'text-yellow-400 text-3xl focus:outline-none'
                    : 'text-gray-300 text-3xl focus:outline-none'
                }
                onClick={() => setScore(value.toString())}
              >
                ★
              </button>
            ))}
          </div>
          <Button onClick={handleClick} className="mt-4" href="/result">
            Submit
          </Button>
        </div>
      </div>
    </>
  );
};

export default Page;
