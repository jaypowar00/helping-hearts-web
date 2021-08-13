import React, { Component } from 'react'
import '../Styles/mycss.css'
import {Link} from 'react-router-dom';
import mylogo from '../Styles/helpinghearts_logo.jpg'
import axios from 'axios';

class Register extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            username: "",
            email: "",
            password: "",
            name: "",
            phone: "",
            address: "",
            acc_type: "",
            radio: 0,
            age: "",
            gender: "",
            diseases: "",
            c_count :"",
            beds :"", 
            ventilators:"" , 
            oxygens :"",
            accepting_patients : false,
            accepting_coworkers : false,
            accepting_doctors: false,
            accepting_nurses: false,
            need_ventilators: false,
            ventilators_required: "",
            doctors_required: "",
            nurses_required: "",
            coworkers_required: "",
            ven_available: false,
            available: true,          
            total_ven: "",
            working_at: null
             
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.accountRef = React.createRef();
        this.onAccountChange = this.onAccountChange.bind(this);
        this.handle_accepting_patients = this.handle_accepting_patients.bind(this)
        this.handle_accepting_coworkers = this.handle_accepting_coworkers.bind(this)
        this.handle_accepting_doctors = this.handle_accepting_doctors.bind(this)
        this.handle_accepting_nurses = this.handle_accepting_nurses.bind(this)
        this.handle_need_ventilators = this.handle_need_ventilators.bind(this)
        this.handle_ven_available = this.handle_ven_available.bind(this)
        this.handle_available = this.handle_available.bind(this)   
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
    }

    onAccountChange = (event) => {
        this.setState({
            acc_type: event.target.value
        })

        if (this.accountRef.current.value !== this.state.radio)
            this.setState({
                radio: this.accountRef.current.value
            })
    }

    onchangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handle_accepting_patients = () => {
        
        this.setState({
            accepting_patients: !this.state.accepting_patients,
          });
    }

    handle_accepting_coworkers = () => {

        this.setState({
            accepting_coworkers: !this.state.accepting_coworkers,
          });
    }

    handle_accepting_doctors = () => {
        
        this.setState({
            accepting_doctors: !this.state.accepting_doctors,
          });
    }
    handle_accepting_nurses = () => {
        
        this.setState({
            accepting_nurses: !this.state.accepting_nurses,
          });
    }
    handle_need_ventilators = () => {
        
        this.setState({
            need_ventilators: !this.state.need_ventilators,
          });
    }

    handle_ven_available = () => {
        
        this.setState({
            ven_available: !this.state.ven_available,
          });
    }
    
    handle_available = () => {
        
        this.setState({
            available: !this.state.available,
          });
    }


    genderHandler = (event) => {
        this.setState({
            gender: event.target.value
        })
    }

    onMenuBtnClick() {
        var MenuBtn = document.getElementById("menuBtn");
        MenuBtn.classList.toggle("active");
        var panel = MenuBtn.nextElementSibling.nextElementSibling.nextElementSibling;
        console.log(panel);
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
            window.setTimeout(() => {
                panel.classList.toggle('panel-margin-top');
                panel.classList.toggle('panel-hide');
            }, 200);
        }else{
            panel.classList.toggle('panel-hide');
            panel.classList.toggle('panel-margin-top');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const final_data = {
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            phone: this.state.phone,
            address: this.state.address,
            account_type: parseInt(this.state.acc_type),
        };

        if(this.state.acc_type === "1")
        {
            final_data.age = this.state.age                             
            final_data.gender = this.state.gender
            final_data.diseases = this.state.diseases
        }
        else if(this.state.acc_type === "2")
        {
            final_data.c_count = this.state.c_count              
            final_data.beds = this.state.beds
            final_data.ventilators = this.state.ventilators
            final_data.oxygens = this.state.oxygens
            final_data.accepting_patients = this.state.accepting_patients
            final_data.accepting_coworkers = this.state.accepting_coworkers
            final_data.accepting_doctors = this.state.accepting_doctors
            final_data.accepting_nurses = this.state.accepting_nurses
            final_data.need_ventilators = this.state.need_ventilators

            if(this.state.accepting_coworkers === true)
                final_data.coworkers_required = this.state.coworkers_required
            else
            final_data.coworkers_required = 0

            if(this.state.accepting_doctors === true)
                final_data.doctors_required = this.state.doctors_required
            else
                final_data.doctors_required = 0

            if(this.state.accepting_nurses === true)
                final_data.nurses_required = this.state.nurses_required
            else
                final_data.nurses_required = 0

            if(this.state.need_ventilators === true)
                final_data.ventilators_required = this.state.ventilators_required
            else
                final_data.ventilators_required = 0
            
        }      
        else if(this.state.acc_type === "3")
        {
            final_data.age = this.state.age                             
            final_data.gender = this.state.gender
            final_data.ven_avail = this.state.ven_available 
            
            if(this.state.ven_available === true)
                final_data.total_ven = this.state.total_ven
            else
            final_data.total_ven = 0
        }
        else if(this.state.acc_type === "4" || this.state.acc_type === "5" || this.state.acc_type === "6")
        {
            final_data.age = this.state.age                             
            final_data.gender = this.state.gender
            final_data.available = this.state.available

            if(this.state.available === false)
                final_data.working_at = this.state.working_at
            else
            final_data.working_at = null
        }

        console.log(final_data)

        
        //console.log(this.state)
        axios.post('https://helpinghearts-mraj.herokuapp.com/user/register/', final_data)
        .then(response => {
            if(response.data.status){
                alert('User Successfully registered!\nPlease login with same credentials to proceed further...');
                window.location.href="/login";
            }else{
                alert('Registration Failed!\n'+response.data.message);
            }
        }).catch(error=> {
            alert('Error!\n'+error);
        }).finally(()=>{
            this.setState({
                username: "",
                email: "",
                password: "",
                name: "",
                phone: "",
                address: "",
                acc_type: "",
                radio: 0,
                age: "",
                gender: "",
                diseases: "",
                c_count :"",
                beds :"", 
                ventilators:"" , 
                oxygens :"",
                accepting_patients : true,
                accepting_coworkers : false,
                accepting_doctors: false,
                accepting_nurses: false,
                need_ventilators: false,
                ventilators_required: "",
                doctors_required: "",
                nurses_required: "",
                coworkers_required: "",
                ven_available: false,
                available: false,          
                total_ven: "",
                working_at: ""
            })
            this.accountRef.current.value = "none"
        });
    }
    

    render() {
        const {radio, username, email, password, name, phone, address, acc_type,
            age, diseases,
            c_count, beds, ventilators, oxygens,   
            ventilators_required,
            doctors_required,
            nurses_required,
            coworkers_required,
            total_ven
        } = this.state

        console.log(radio, acc_type);
           
        return ( 
        <div>          
            <div>
                <div className="header">
                    <div>
                        <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
                            <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                        </a>
                        <div className='project_name' onClick={()=>{window.location.href="/"}}><b>Helping Hearts</b></div>
                        <div className="header-right">
                            <a className="mx-1" href="/">Home</a>
                            <a className="active mx-1" href="/register">Register</a>
                            <a className="mx-1" href="/contact">Contact</a>
                            <a className="mx-1" href="/about">About</a>
                        </div>
                        <div className="header-right-mobile">
                            <button className="btn btn-success my-1" id="menuBtn" style={{float: 'right'}} onClick={this.onMenuBtnClick} ><i className="fas fa-bars"></i></button><br/><br/>
                            <section className="panel panel-hide">
                                    <div className="navbar-collapse">
                                        <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link" href="/">Home</a>
                                        </li>
                                        <li className="nav-item">
                                        <a className="nav-link active" href="/register">Register</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/contact">Contact</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/about">About</a>
                                        </li>
                                        </ul>
                                    </div>
                            </section>
                        </div>
                    </div>
                </div>

            </div>  
            <div className="registerform text-center" >
                <div >
                    <h1 >Register Here</h1>
               <form  onSubmit={this.handleSubmit}>
                <div  style={{textAlign: 'start', width: 'fit-content'}}>
                    <div >
                        {/*<label htmlFor="name_reg"><b>Name : </b></label><br/>*/}
                        <input id="name_reg" type='text' placeholder='Enter Name' name="name" value={name} onChange={this.onchangeHandler} required/><br/>
                    </div>

                    <div >
                    {/*<label htmlFor="phone_reg"><b>Phone Number : </b></label><br/>*/}
                    <input  id="phone_reg" type='text' placeholder='Enter Phone No' name="phone" value={phone} onChange={this.onchangeHandler} required /><br/>
                    </div>

                    <div >
                    {/*<label htmlFor="address_reg"><b>Address : </b></label><br/>*/}
                    <input  id="address_reg" type='text' placeholder='Enter Address' name="address" value={address} onChange={this.onchangeHandler} required /><br/>
                    </div>

                    <div >
                    {/*<label htmlFor="username_reg"><b>Username : </b></label><br/>*/}
                    <input  id="username_reg" type='text' placeholder='Enter username' name="username" value={username} onChange={this.onchangeHandler} required /><br/>
                    </div>

                    <div>
                    {/*<label htmlFor="email_reg"><b>Email : </b></label><br/>*/}
                    <input  id="email_reg" type='email' placeholder='Enter email' name="email" value={email} onChange={this.onchangeHandler} required /><br/>
                    </div>

                    <div >
                    {/*<label htmlFor="password_reg"><b>Password : </b></label><br/>*/}
                    <input  id="password_reg" type='password' placeholder='Enter password' name="password" value={password} onChange={this.onchangeHandler} required /><br/>
                    </div>

                <br/>
                    <div >
                        <label className="mylabel" htmlFor="selectaccounttype"><b>Select Account Type: &nbsp; </b></label>
                        <select className="selectopt"  id="selectaccounttype" name="account-type"  ref={this.accountRef} onChange={this.onAccountChange} required>
                            <option hidden disabled selected value="none">--</option>
                            <option value={1} >Patient</option>
                            <option value={2} >Hospital</option>
                            <option value={3} >Ventilator Provider</option>
                            <option value={4} >Co-Worker</option>
                            <option value={5} >Doctor</option>
                            <option value={6} >Nurse</option>
                        </select>
                    </div>
                <br/>

                {
                    (this.state.radio === "1")?
                    <>
                    <div >
                        {/*<label htmlFor="age-input" ><b>Age : &nbsp; </b></label><br/>*/}
                        <input  type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                    </div>

                    <div >
                        <br/><label className="mylabel" htmlFor="genderselect" ><b>Select Gender&nbsp; </b></label><br/>
                        <input className="radiobtn" type="radio" value="male" name="gender" id="male_r" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="male_r">Male</label>
                        <input className="radiobtn"  type="radio" value="female" name="gender" id="female_r" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="female_r">Female</label>
                        <input className="radiobtn" type="radio" value="other" name="gender"  id="other_r" checked={this.state.gender === "other"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="other_r">Other</label>
                    </div>

                    <div >
                        {/*<label htmlFor="diseases_reg"><b>Diseases : &nbsp; </b></label><br/>*/}
                        <input  id="diseases_reg" type='text' placeholder='Enter Diseases' name="diseases" value={diseases} onChange={this.onchangeHandler}required/><br/>
                    </div>
                    
                    </>
                    :
                    (this.state.radio === "2")?
                    <>
                    <div >
                        <input className="selectval" type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_patients} id="accepting_patients" 
                        onChange={this.handle_accepting_patients} />
                        <label className="mylabel" htmlFor="accepting_patients" ><b>Accepting Patients</b></label>
                    </div>

                    <div >
                        <input className="selectval" type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_coworkers} id="accepting_coworkers"
                        onChange={this.handle_accepting_coworkers} />
                        <label className="mylabel" htmlFor="accepting_coworkers" ><b>Accepting Co-Workers</b></label>
                    </div>

                    <div >
                        <input className="selectval" type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_doctors} id="accepting_doctors"
                        onChange={this.handle_accepting_doctors} />
                        <label className="mylabel" htmlFor="accepting_doctors" ><b>Accepting Doctors</b></label>
                    </div>

                    <div>
                        <input className="selectval"  type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_nurses} id="accepting_nurses"
                        onChange={this.handle_accepting_nurses}  />
                        <label className="mylabel"  htmlFor="accepting_nurses" ><b>Accepting Nurses</b></label>
                    </div>

                    <div >
                        <input className="selectval" type="checkbox" name="myCheckbox" defaultChecked={this.state.need_ventilators}  id="need-ventilators"
                        onChange={this.handle_need_ventilators}  />
                        <label className="mylabel"  htmlFor="need-ventilators" ><b>Need Ventilators</b></label>
                    </div>

                    <div>
                        {/*<label className="mylabel" htmlFor="c-count-input" ><b>Covid Patients Count : &nbsp; </b></label><br/>*/}
                        <input   type="number" id="c-count-input" name="c_count" min={0} placeholder="Enter Covid Patients Count"
                        value={c_count} onChange={this.onchangeHandler}required />
                    </div>

                    <div >
                        {/*<label className="mylabel" htmlFor="beds-input" ><b>Available Beds Count : &nbsp; </b></label><br/>*/}
                        <input  type="number" id="beds-input" name="beds" min={0} placeholder="Enter Beds Count" 
                        value={beds} onChange={this.onchangeHandler}required/>
                    </div>

                    <div >
                        {/*<label className="mylabel" htmlFor="ventilators-input" ><b>Available Ventilators Count : &nbsp; </b></label><br/>*/}
                        <input  type="number"  id="ventilators-input" name="ventilators" min={0} placeholder="Enter Ventilators Count"
                        value={ventilators} onChange={this.onchangeHandler}required />
                    </div>

                    <div >
                        {/*<label className="mylabel" htmlFor="oxygen-input" ><b>Available Oxygen Cylinders Count : &nbsp; </b></label><br/>*/}
                        <input  type="number" id="oxygens-input" name="oxygens" min={0} placeholder="Enter Oxygen Cylinder Count" 
                        value={oxygens} onChange={this.onchangeHandler}required/>
                    </div>

                    {
                        (this.state.need_ventilators)?
                        <>
                        <div >
                            {/*<label className="mylabel" htmlFor="req-ventilators-input" ><b>Required Ventilators : &nbsp; </b></label><br/>*/}
                            <input  type="number"  id="req-ventilators-input" name="ventilators_required" min={1} placeholder="Enter Required Ventilators" 
                            value={ventilators_required} onChange={this.onchangeHandler}required/>
                        </div>
                        </>
                        :
                        <></>
                    }

                    {
                        (this.state.accepting_doctors)?
                        <>
                        <div >
                            {/*<label className="mylabel" htmlFor="req-doctors-input" ><b>Required Doctors : &nbsp; </b></label><br/>*/}
                            <input type="number"  id="req-doctors-input" name="doctors_required" min={1} placeholder="Enter Required Doctors" 
                            value={doctors_required} onChange={this.onchangeHandler}required/>
                        </div>
                        </>
                        :
                        <></>
                    }

                    {
                        (this.state.accepting_nurses)?
                        <>
                        <div>
                            {/*<label className="mylabel" htmlFor="req-nurses-input" ><b>Required Nurses : &nbsp; </b></label><br/>*/}
                            <input type="number" id="req-nurses-input" name="nurses_required" min={1} placeholder="Enter Required Nurses"
                            value={nurses_required} onChange={this.onchangeHandler}required/>
                        </div>
                        </>
                        :
                        <></>
                    }

                    {
                        (this.state.accepting_coworkers)?
                        <>
                        <div >
                        {/*<label className="mylabel" htmlFor="req-co-workers-input" ><b>Required Co-Workers : &nbsp; </b></label><br/>*/}
                        <input type="number" id="req-co-workers-input" name="coworkers_required" min={1} placeholder="Enter Required Co-Workers"
                        value={coworkers_required} onChange={this.onchangeHandler}required />
                        </div>
                        </>
                        :
                        <></>
                    }
                    
                    
                    </>
                    :
                        (this.state.radio === "3")?
                        <>
                        <div>
                            {/*<label className="mylabel" htmlFor="age-input" ><b>Age : &nbsp; </b></label><br/>*/}
                            <input  type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                        </div>

                        <div >
                            <br/><label className="mylabel" htmlFor="genderselect" ><b>Select Gender &nbsp; </b></label><br/>
                            <input className="radiobtn" type="radio" value="male" id="male_r" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="male_r">Male</label>
                            <input className="radiobtn" type="radio" value="female" id="female_r" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="female_r">Female</label>
                            <input className="radiobtn" type="radio" value="other" id="other_r" checked={this.state.gender === "other"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="other_r">Other</label>
                        </div>
                        
                        <div >                           
                            <input class="selectval" type="checkbox" name="myCheckbox" defaultChecked={this.state.ven_available} id="ven_available"
                            onChange={this.handle_ven_available}/>
                            <label className="mylabel" htmlFor="ven_available"><b>Ventilators Available? </b></label>                            
                        </div>

                        {
                            (this.state.ven_available)?
                                <div >
                                    {/*<label className="mylabel" htmlFor="total_ven" ><b>Total Ventilators : &nbsp; </b></label><br/>*/}
                                    <input  type="number" id="total_ven" name="total_ven" placeholder="Enter Total Ventilators Count" value={total_ven} onChange={this.onchangeHandler}required/>
                                </div>
                            :
                            <></>
                        }
                        
                        </>   
                        :
                        
                        (this.state.radio === "4") || (this.state.radio === "5") || (this.state.radio === "6")?
                        <>
                        <div >
                            {/*<label className="mylabel" htmlFor="age-input" ><b>Age : &nbsp; </b></label><br/>*/}
                            <input type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                        </div>

                        <div >
                            <label className="mylabel" htmlFor="genderselect" ><b>Select Gender &nbsp; </b></label><br/>
                            <input className="radiobtn" type="radio" value="male" id="male_r" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="male_r">Male</label>
                            <input className="radiobtn" type="radio" value="female" id="female_r" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="female_r">Female</label>
                            <input className="radiobtn" type="radio" value="other" id="other_r"  checked={this.state.gender === "other"} onChange={this.genderHandler}/><label className="mylabel" htmlFor="other_r">Other</label>
                        </div>
                        </>   
                        :
                        <></>
            }
                </div>
                <button type='submit' className="btnn mb-3" value="Register" >Register</button>
                <br/>
                <span style={{fontSize: '15px'}}>Already have an Account? &nbsp;
                    <Link className="link" to='/login'>
                        <span >Log in</span>
                    </Link>
                </span>
               </form>
            </div>
            {/* */}</div>
        </div>
        )
    }
}

export default Register
