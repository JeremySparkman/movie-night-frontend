import { Button, Room } from 'ui';

const Page = () => {
  return (
    <div>
      <Room />
      <h1>Thank you for voting</h1>
      <Button href="/">Back to Login</Button>
    </div>
  );
};

export default Page;
