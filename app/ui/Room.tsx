import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

interface IVoter {
  name: string;
  score: string | null;
}

const Room = () => {
  const [, setMessageHistory] = useState<MessageEvent<string>[]>([]);
  const [voters, setVoters] = useState<IVoter[]>([]);

  const serverUrl = 'localhost';
  const { lastMessage } = useWebSocket(`ws://${serverUrl}/ws`);

  useEffect(() => {
    if (lastMessage !== null) {
      setMessageHistory((prev) => prev.concat(lastMessage));

      if (lastMessage.data) {
        const messageJson = JSON.parse(lastMessage.data);

        console.log(messageJson);
        if (messageJson.type === 'update') {
          const update: IVoter[] = [];
          const votingRecord = messageJson.data;
          for (const voter in votingRecord) {
            update.push({
              name: votingRecord[voter].voter,
              score: votingRecord[voter].score,
            });
          }

          setVoters(update);
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
};

export default Room;
