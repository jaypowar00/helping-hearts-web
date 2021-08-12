import './App.css';
import LoginPage from './Components/LoginPage';
import ThankYou from './Components/ThankYou';
import {BrowserRouter as Switch, Route} from 'react-router-dom';
import Register from './Components/Register';
import About from './Components/About';
import Contact from './Components/Contact';
import Update from './Components/Update';
import Profile from './Components/Profile';
import ChangePassword from './Components/ChangePassword';
import Home from './Components/Home';
import React from 'react';
import HospitalDetail from './Components/HospitalDetail';
import PatientsContainer from './Components/PatientsContainer';
import AdmittedPatientsContainer from './Components/AdmittedPatientsContainer';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/register'   component={Register}/>
          <Route exact path='/login'  component={LoginPage}/>
          <Route exact path='/thankyoupage'  component={ThankYou}/>
          <Route exact path='/about'  component={About}/>
          <Route exact path='/contact'  component={Contact}/>
          <Route exact path='/update'  component={Update}/>
          <Route exact path='/profile'  component={Profile}/>
          <Route exact path='/changepassword'  component={ChangePassword}/>
          <Route exact path='/hospital' component={HospitalDetail} />
          <Route exact path='/patients' component={PatientsContainer} />
          <Route exact path='/patients/admitted' component={AdmittedPatientsContainer} />
        </Switch>
      </React.Fragment> 
    </div>
  );
}

export default App;
