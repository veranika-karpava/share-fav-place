import { createContext } from "react";

export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
});
// isLoggedIn - property in the object
// login/logout - as methods 
