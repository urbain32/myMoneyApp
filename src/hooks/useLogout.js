import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setError(null);
    setPending(true);
    try {
      //sign up
     await projectAuth.signOut();
      // dispatch
      dispatch({ type: 'LOGOUT'});
      if (!isCancelled) {
        setPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.name);
        setError(err.name);
        setPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { logout, error, pending };
};
