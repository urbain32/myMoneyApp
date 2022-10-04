import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
// component
import Navbar from './components/Navbar';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
function App() {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className='App'>
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/'>
              {user && <Home />}
              {!user && <Redirect to='/login' />}
            </Route>
            <Route path='/login'>
              {!user && <Login />}
              {user && <Redirect to='/' />}
            </Route>
            <Route path='/signup'>
              {!user && <Signup />}
              {user && <Redirect to='/' />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
