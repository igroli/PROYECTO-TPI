import { useState } from 'react';
import { AuthenticationContext } from './auth.context';

const tokenValue = localStorage.getItem('token');

 export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);

  
  const handleUserLogIn = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
};

  const handleUserLogOut = () => {
    localStorage.removeItem('token');
    setToken(null);
    console.log("Token eliminado!");
};
 
    return (
        <AuthenticationContext value={{ token, handleUserLogIn, handleUserLogOut}}>
            {children}
        </AuthenticationContext>
  )
}

export default AuthContextProvider