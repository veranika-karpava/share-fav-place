import React from 'react';
import './App.scss'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';

const App = () => {
  return <BrowserRouter>
    {/* it means that app use router that will display in url  */}
    <Switch>
      {/* use for switch when path is the same */}
      <Route path='/' exact>
        {/* means that when url with slash it renders Users page. Exact word means the only this path reneder Users page */}
        <Users />
      </Route>
      <Route path='/places/new' exact>
        <NewPlace />
      </Route>
      <Redirect to='/' />
      {/* means that redirect to '/' path that render Users pages */}
    </Switch>
  </BrowserRouter>


    ;
}

export default App;
