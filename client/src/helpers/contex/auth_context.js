import { createContext } from 'react';

// create context object with default value
export const AuthContext = createContext({
  // properties
  isLoggedIn: false,
  userId: null,
  token: null,
  // methods
  login: () => { },
  logout: () => { },
});
