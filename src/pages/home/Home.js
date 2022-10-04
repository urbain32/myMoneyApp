import './Home.css'
import TransactionForm from './TransactionForm';
import {useAuthContext} from '../../hooks/useAuthContext'
export default function Home() {
  const { user } = useAuthContext()
  return (
    <div className='container'>
      <div className='content'></div>
      <div className='sidebar'>
        <TransactionForm uid={user.uid}/>
      </div>
    </div>
  );
}