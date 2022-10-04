import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, pending } = useLogin();
  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <form className='login-form' onSubmit={handleLogin}>
      <h2>Login</h2>
      <label>
        <span>Email:</span>
        <input
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />
      </label>
      {!pending && <button className='btn'>Login</button>}
      {pending && <button className='btn' disabled>Loading</button>}
      {error && <p>{error}</p>}
    </form>
  );
}
