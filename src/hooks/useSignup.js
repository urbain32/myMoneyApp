import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [pending, setPending] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);
  const { dispatch } = useAuthContext();
  const signup = async (email, password, displayName) => {
    setError(null)
    setPending(true);
    try {
      //sign up
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!res) {
        throw new Error('Could not sign up the user');
      }
      //   add display name to user
      await res.user.updateProfile({ displayName });
      // dispatch
      dispatch({ type: 'LOGIN', payload: res.user });
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
  }
  useEffect(() => {
    return () => setIsCancelled(true);
  },[])
  return { signup, error, pending };
};
