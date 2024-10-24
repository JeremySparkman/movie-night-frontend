import { useState } from 'react';
import { Button } from './Button';

export function EnterScore({
  setHasScored,
  voter,
}: {
  setHasScored: (val: boolean) => void;
  voter: string;
}) {
  const [score, setScore] = useState('');

  const handleClick = async () => {
    try {
      const serverUrl = 'localhost';
      const response = await fetch(`http://${serverUrl}/vote`, {
        method: 'POST',
        body: JSON.stringify({
          voter,
          score,
        }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      setHasScored(true);
    } catch (err) {
      console.error(err);
      setHasScored(false);
    }
  };

  return (
    <>
      <h1 className="mb-3 text-2xl">Please enter your score</h1>
      <div className="w-full">
        <div>
          <label className="mb-3 mt-5 block text-xs font-medium" htmlFor="name">
            Score {score}
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={score}
              onChange={(e) => setScore(e.target.value)}
            />
            <Button onClick={handleClick} className="mt-4 w-full">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
