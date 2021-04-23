import React from "react";
import { Route, Link, Switch, Router} from 'react-router-dom'

// importing components
import Home from './home'

const App = () => {
  return (
    <div className='App'>
    <nav>
      <h1 className='store-header'>Lambda Eats</h1>
      <div className = "nav-links">
      <Link to ='/'>Home</Link>
      <Link to ='/about'>About Us</Link>
      </div>
    </nav>
    <Switch>
      <Route path ='/aboutus'>

      </Route>
      <Route path ='/'>
        <Home/>
      </Route>

      
    </Switch>

</div>
  );
};
export default App;
