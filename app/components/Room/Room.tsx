'use client';
import { useAuth } from 'providers/AuthProvider';
import { useEffect, useState } from 'react';
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

  const serverUrl = process.env.NEXT_PUBLIC_API_URL;
  const { lastMessage } = useWebSocket(`wss://${serverUrl}/ws`);

  const sum = voters.reduce((a, b) => a + Number(b.score), 0);
  const averageScore = sum / voters.length || null;

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch(`https://${serverUrl}/status`, {
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

  const allVoted =
    voters.length > 0 &&
    voters.every((v) => v.score !== null && v.score !== '');

  const displayVote = (voter: IVoter) => {
    if (!allVoted) {
      return voter.score ? 'Voted!' : '...Waiting for vote';
    }
    return voter.score;
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Room: {user?.room}</h1>
      </div>
      {allVoted && averageScore && (
        <h1 className="mb-8">Average Score: {averageScore.toFixed(2)}</h1>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-3">
        {voters.map((voter) => (
          <div key={voter.name}>
            <h1>{voter.name}</h1>
            <h2>{displayVote(voter)}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
