import { useState } from 'react';
import { AuthenticationContext } from './auth.context';
import { getUserFromToken } from './getUserFromToken';

const tokenValue = localStorage.getItem('token');

 export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);

  const [user, setUser] = useState(getUserFromToken(tokenValue));

  const handleUserLogIn = (newToken) => {
    localStorage.setItem('token', newToken);

    setToken(newToken);

    setUser(getUserFromToken(newToken));
};

  const handleUserLogOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    console.log("Token eliminado!");
};
 
    return (
        <AuthenticationContext value={{ token, user, handleUserLogIn, handleUserLogOut}}>
            {children}
        </AuthenticationContext>
  )
}

export default AuthContextProvider