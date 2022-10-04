import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from '../hooks/useAuthContext';
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setError(null);
    setPending(true);
    try {
      // login user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);
      // dispatch a login action
      dispatch({ type: 'LOGIN', payload: res.user });
      if (!isCancelled) {
        setError(null);
        setPending(false);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { login, error, pending };
};
