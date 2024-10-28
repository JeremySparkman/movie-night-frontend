'use client';
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

  const serverUrl = 'localhost';
  const { lastMessage } = useWebSocket(`ws://${serverUrl}/ws`);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const response = await fetch(`http://${serverUrl}/status`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        const voterList = getVoterList(result.data);

        setVoters(voterList);
      } catch (err) {
        console.error(err);
      }
    };
    getStatus();
  }, []);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));

      if (lastMessage.data) {
        const messageJson = JSON.parse(lastMessage.data);

        if (messageJson.type === 'update') {
          const voterList = getVoterList(messageJson.data);

          setVoters(voterList);
        }
      }
    }
  }, [lastMessage]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 mb-3">
      {voters.map((voter) => (
        <div key={voter.name}>
          <h1>{voter.name}</h1>
          <h2>{voter.score ? voter.score : '... Waiting for vote'}</h2>
        </div>
      ))}
    </div>
  );
}
