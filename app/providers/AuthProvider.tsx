'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type User = {
  name?: string;
  room?: string;
};

type IAuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<IAuthContextType>({
  user: null,
  setUser: (val) => val,
});

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      setUserState(JSON.parse(stored));
    }
  }, []);

  const setUser = (val: User | null | ((prev: User | null) => User | null)) => {
    setUserState((prev) => {
      const next =
        typeof val === 'function'
          ? (val as (prev: User | null) => User | null)(prev)
          : val;
      if (next) {
        localStorage.setItem('user', JSON.stringify(next));
      } else {
        localStorage.removeItem('user');
      }
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
