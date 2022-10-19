import React, { useCallback, useState } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.scss'
import MainHeader from './shared/components/MainHeader/MainHeader';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import Users from './user/pages/Users';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';
import { AuthContext } from './shared/contex/auth_context';


const App = () => {
  // instead isLoggedIn
  const [token, setToken] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(false)

  const login = useCallback((uid, token) => {
    // setIsLoggedIn(true);
    setToken(token);
    setUserId(uid);
    // store our token in local storage
    localStorage.setItem('userData', JSON.stringify({ userId: uid, token: token }))
  }, []);

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setToken(null);
    setUserId(null);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Switch>
        {/* means that when url with slash it renders Users page. Exact word means the only this path reneder Users page */}
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/places/new' exact>
          <NewPlace />
        </Route>
        {/* the order is important.  */}
        <Route path='/places/:placeId'>
          <UpdatePlace />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path='/:userId/places' exact>
          <UserPlaces />
        </Route>
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/auth' />
        {/* means that redirect to '/' path that render Users pages */}
      </Switch>
    );
  }


  return <AuthContext.Provider value={{ isLoggedIn: !!token, token: token, userId: userId, login: login, logout: logout }}>
    <BrowserRouter>
      {/* it means that app use router that will display in url  */}
      <MainHeader />
      <main>
        {routes}
      </main>
    </BrowserRouter>
  </AuthContext.Provider>

    ;
}

export default App;
