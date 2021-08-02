//import logo from './logo.svg';
import './App.css';
import LoginPage from './Components/LoginPage';
import ThankYou from './Components/ThankYou';
//import Header from './Components/Header';
//import PostForm from './Components/PostForm';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Register from './Components/Register';
import PatientRegister from './Components/PatientRegister';
import HospitalRegister from './Components/HospitalRegister';
import VentilatorProRegister from './Components/VentilatorProRegister';
import CoworkerRegister from './Components/CoworkerRegister';
//import SignupM from './Components/Register';
import FirstPage from './Components/FirstPage';
import About from './Components/About';
import Contact from './Components/Contact';
import Update from './Components/Update';
import Profile from './Components/Profile';
import ChangePassword from './Components/ChangePassword';

function App() {
  return (
    <div className="App">
 
      <Router>
      <Switch>

      <Route path='/' exact component={FirstPage}/>
      <Route path='/register'   component={Register}/>
      <Route path='/loginpage'  component={LoginPage}/>
      <Route path='/coworkerregister' component={CoworkerRegister}/>
      <Route path='/hospitalregister' component={HospitalRegister}/>
      <Route path='/patientregister' component={PatientRegister}/>
      <Route path='/ventilatorproregister' component={VentilatorProRegister}/>
      <Route path='/thankyoupage'  component={ThankYou}/>
      <Route path='/about'  component={About}/>
      <Route path='/contact'  component={Contact}/>
      <Route path='/update'  component={Update}/>
      <Route path='/profile'  component={Profile}/>
      <Route path='/changepassword'  component={ChangePassword}/>
      
      </Switch>
      </Router> 

      {/*<Router>
      
        <VentilatorProRegister/>
        <HospitalRegister/>
        <PatientRegister/>
        
        <Route path='/'  component={MainPage}/>
        <Route path='/loginpage' component={LoginPage}/>
        <Route path='/coworkerlogin' component={CoworkerLogin}/>
        
      </Router> */}
    </div>
  );
}

export default App;
