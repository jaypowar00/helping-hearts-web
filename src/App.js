import './App.css';
import LoginPage from './Components/LoginPage';
import ThankYou from './Components/ThankYou';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './Components/Register';
import About from './Components/About';
import Contact from './Components/Contact';
import Update from './Components/Update';
import Profile from './Components/Profile';
import ChangePassword from './Components/ChangePassword';
import Home from './Components/Home';
import React from 'react';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/register'   component={Register}/>
          <Route path='/login'  component={LoginPage}/>
          <Route path='/thankyoupage'  component={ThankYou}/>
          <Route path='/about'  component={About}/>
          <Route path='/contact'  component={Contact}/>
          <Route path='/update'  component={Update}/>
          <Route path='/profile'  component={Profile}/>
          <Route path='/changepassword'  component={ChangePassword}/>
        </Switch>
      </React.Fragment> 
    </div>
  );
}

export default App;
