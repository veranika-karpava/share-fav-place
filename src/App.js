import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';

import './App.scss'
import MainHeader from './shared/components/MainHeader/MainHeader';
import NewPlace from './places/pages/NewPlace';
import UserPlaces from './places/pages/UserPlaces';
import Users from './user/pages/Users';
import UpdatePlace from './places/pages/UpdatePlace';
import Auth from './user/pages/Auth';

const App = () => {
  return <BrowserRouter>
    {/* it means that app use router that will display in url  */}
    <MainHeader />
    <main>
      <Switch>
        {/* use for switch when path is the same */}
        <Route path='/' exact>
          {/* means that when url with slash it renders Users page. Exact word means the only this path reneder Users page */}
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
        <Route path='/auth'>
          <Auth />
        </Route>
        <Redirect to='/' />
        {/* means that redirect to '/' path that render Users pages */}
      </Switch>
    </main>
  </BrowserRouter>


    ;
}

export default App;
