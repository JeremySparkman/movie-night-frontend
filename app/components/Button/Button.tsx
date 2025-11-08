import clsx from 'clsx';
import Link from 'next/link';
import { FormEventHandler } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  onClick?: FormEventHandler<EventTarget>;
  styleType?: 'default' | 'secondary';
  type?: 'button' | 'submit';
  className?: string;
}

const defaultStyle =
  'cursor-pointer flex h-10 items-center justify-center rounded-lg bg-blue-500 px-4 text-sm font-bold text-white transition-colors hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';

const secondaryStyle =
  'cursor-pointer flex h-10 items-center justify-center rounded-lg bg-[#1DB954] px-4 text-sm font-bold text-white transition-colors hover:bg-[#32de84] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400 active:bg-gray-400 aria-disabled:cursor-not-allowed aria-disabled:opacity-50';

export function Button({
  children,
  className,
  href = '',
  styleType = 'default',
  type = 'button',
  onClick,
}: ButtonProps) {
  if (type === 'submit') {
    return (
      <button
        type="submit"
        onClick={onClick}
        className={clsx(
          styleType === 'default' ? defaultStyle : secondaryStyle,
          className
        )}
      >
        {children}
      </button>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className={clsx(
        styleType === 'default' ? defaultStyle : secondaryStyle,
        className
      )}
    >
      {children}
    </Link>
  );
}
