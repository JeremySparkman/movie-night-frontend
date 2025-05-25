'use client';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useWebSocket from 'react-use-websocket';

interface IVoter {
  name: string;
  score: string | null;
}

const getVoterList = (votingRecord: {
  [x: string]: { voter: string; score: string };
}) => {
  const voterList: IVoter[] = [];
  for (const voter in votingRecord) {
    voterList.push({
      name: votingRecord[voter].voter,
      score: votingRecord[voter].score,
    });
  }
  return voterList;
};

export function Room() {
  const [, setMessageHistory] = useState<MessageEvent<string>[]>([]);
  const [voters, setVoters] = useState<IVoter[]>([]);
  const { user } = useAuth();
  const router = useRouter();

  const serverUrl = 'localhost';
  const { lastMessage } = useWebSocket(`ws://${serverUrl}/ws`);

  const sum = voters.reduce((a, b) => a + Number(b.score), 0);
  const averageScore = sum / voters.length || null;

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch(`http://${serverUrl}/status`, {
          method: 'POST',
          body: JSON.stringify(user?.room),
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        const voterList = getVoterList(result.data.voters);

        setVoters(voterList);
      } catch (err) {
        console.error(err);
      }
    };
    getStatus();
  }, [user?.room]);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));

      if (!!lastMessage.data) {
        const messageJson = JSON.parse(lastMessage.data);

        const voterList = getVoterList(messageJson[user?.room || ''].voters);

        setVoters(voterList);
      }
    }
  }, [lastMessage, user?.room]);

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Room: {user?.room}</h1>
        <button
          className="flex h-10 items-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-colors hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 active:bg-red-700 aria-disabled:cursor-not-allowed aria-disabled:opacity-50"
          onClick={() => {
            if (typeof window !== 'undefined') {
              localStorage.removeItem('user');
            }
            router.push('/');
          }}
        >
          Logout
        </button>
      </div>
      {averageScore && (
        <h1 className="mb-8">Average Score: {averageScore.toFixed(2)}</h1>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-3">
        {voters.map((voter) => (
          <div key={voter.name}>
            <h1>{voter.name}</h1>
            <h2>{voter.score ? voter.score : '... Waiting for vote'}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
