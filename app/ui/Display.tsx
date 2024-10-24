import { useState } from 'react';
import { EnterName, EnterScore } from '@/app/ui';

const Display = () => {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasScored, setHasScored] = useState(false);
  const [name, setName] = useState('');

  if (hasStarted && !hasScored) {
    return <EnterScore setHasScored={setHasScored} voter={name} />;
  }

  if (hasScored) {
    return <div>Submitted score! Thank you!</div>;
  }

  return <EnterName setName={setName} setHasStarted={setHasStarted} />;
};

export default Display;
