import './Signup.css';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const {signup,error,pending} = useSignup()
    const handleSignup = (e) => {
      e.preventDefault();
      signup(email, password,displayName);
    };
  return (
    <form className='signup-form' onSubmit={handleSignup}>
      <label>
        <span>Email:</span>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <label>
        <span>Display name:</span>
        <input
          type='text'
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      {pending && <button className='btn'>Loading...</button>}
      {!pending && <button className='btn'>Sign up</button>}
      {error && <div>{error}</div>}
    </form>
  );
}
