'use client';
import Room from './ui/Room';
import Display from './ui/Display';

export default function Home() {
  return (
    <main className="flex items-center justify-center">
      <div className="rounded-l px-6 pb-4 pt-8">
        <div className="mb-12">
          <Room />
        </div>
        <Display />
      </div>
    </main>
  );
}
