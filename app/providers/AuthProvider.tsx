'use client';

import { createContext, useContext, useState } from 'react';

type IAuthContextType = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

const AuthContext = createContext<IAuthContextType>({
  user: '',
  setUser: (val) => val,
});

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<string>('');

  console.log(user);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
