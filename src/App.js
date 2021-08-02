import './App.css';
import LoginPage from './Components/LoginPage';
import ThankYou from './Components/ThankYou';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './Components/Register';
import FirstPage from './Components/FirstPage';
import About from './Components/About';
import Contact from './Components/Contact';
import Update from './Components/Update';
import Profile from './Components/Profile';
import ChangePassword from './Components/ChangePassword';
import Home from './Components/Home';

function App() {
  return (
    <div className="App">
      <Router>
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
      </Router> 
    </div>
  );
}

export default App;
