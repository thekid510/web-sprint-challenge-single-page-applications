import React from "react";
import { Route, Link, Switch, Router} from 'react-router-dom'

// importing components
import Home from './home'
import About from './about'



const App = () => {
  return (
    <div className='App'>
    <nav>
      <h1 className='store-header'>Lambda Eats</h1>
      <div className = "nav-links">
      <Link to ='/'>Home</Link>
      <Link to ='/about-us'>About Us</Link>

      </div>
    </nav>
    <Switch>
      <Route path ='/about-us'>
      <About/>
      </Route>
      <Route path ='/order'>

      </Route>
      <Route path ='/'>
        <Home/>
      </Route>

      
    </Switch>

</div>
  );
};
export default App;
