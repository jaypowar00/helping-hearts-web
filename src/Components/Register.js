import React, { Component } from 'react'
import './CSS/MyCSS.css'
import {Link} from 'react-router-dom';
import mylogo from './CSS/HHLogo.jpg'

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
            available: false,          
            total_ven: "",
            working_at: ""
             
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

    handleSubmit = (event) => {

        event.preventDefault()

        alert(`${this.state.name} Registered Successfully!`)

        const final_data = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                name: this.state.name,
                phone: this.state.phone,
                address: this.state.address,
                acc_type: this.state.acc_type,
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
            final_data.ven_available = this.state.ven_available 
            
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
            final_data.working_at = 0
        }

        console.log(final_data)

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

        //console.log(this.state)
        
    }
    

    render() {
        const {radio, username, email, password, name, phone, address, acc_type,
            age, diseases,
            c_count, beds, ventilators, oxygens,   
            ventilators_required,
            doctors_required,
            nurses_required,
            coworkers_required,
            total_ven, working_at
        } = this.state
           
        return ( 
        <div>          
            <div>
                <div class="header">
                    <a class="logo"><img src={mylogo} alt="" height={50} width={50} /></a>
                    <div class='project_name'><b>Helping Hearts</b></div>
                    <div class="header-right">
                        <a class="active" href="/">Home</a>               
                        <a href="/contact">Contact</a>
                        <a href="/about">About</a> 
                                      
                    </div>
                </div>
            </div>  

            <div className="container">
                <div className="card">
               <form onSubmit={this.handleSubmit}>
               <div >
                   <h1>Register</h1>
                   <p>Please fill in this form to create an account.</p>
                </div>
                <div>
                   <label><b>Name </b></label>
                   <input type='text' placeholder='Enter Name' name="name" value={name} onChange={this.onchangeHandler} required/><br/>
                </div>

                <div >
                   <label><b>Phone Number </b></label>
                   <input type='text' placeholder='Enter Phone No' name="phone" value={phone} onChange={this.onchangeHandler} required/><br/>
                </div>

                <div >
                   <label><b>Address </b></label>
                   <input type='text' placeholder='Enter Address' name="address" value={address} onChange={this.onchangeHandler} required/><br/>
                </div>

                <div >
                   <label><b>Username </b></label>
                   <input type='text' placeholder='Enter username' name="username" value={username} onChange={this.onchangeHandler} required/><br/>
                </div>

                <div >
                   <label><b>Email </b></label>
                   <input type='email' placeholder='Enter email' name="email" value={email} onChange={this.onchangeHandler} required/><br/>
                </div>

                <div >
                   <label><b>Password </b></label>
                   <input type='password' placeholder='Enter password' name="password" value={password} onChange={this.onchangeHandler} required/><br/>
                </div>
                <br/>

                <div >
                   <label><b>Select Account Type </b></label>
                   <select  id="selectaccounttype" name="account-type"  ref={this.accountRef} onChange={this.onAccountChange} required>
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
                    <div className="container">
                        <label htmlFor="age-input" ><b>Age </b></label>
                        <input type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                    </div>

                    <div className="container">
                        <label htmlFor="genderselect" ><b>Gender </b></label>
                        <input type="radio" value="male" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label htmlFor="male">Male</label>
                        <input type="radio" value="female" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label htmlFor="female">Female</label>
                        <input type="radio" value="other"  checked={this.state.gender === "other"} onChange={this.genderHandler}/><label htmlFor="other">Other</label>
                    </div>

                    <div className="container">
                        <label><b>Diseases </b></label>
                        <input type = 'text' placeholder='Enter Diseases' name="diseases" value={diseases} onChange={this.onchangeHandler}required/><br/>
                    </div>
                    
                    </>
                    :
                    (this.state.radio === "2")?
                    <>
                    <div className="container">
                        <input  type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_patients} id="accepting_patients" 
                        onChange={this.handle_accepting_patients} />
                        <label ><b>Accepting Patients </b></label>
                    </div>

                    <div className="container">
                        <input type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_coworkers} id="accepting_coworkers"
                        onChange={this.handle_accepting_coworkers} />
                        <label><b>Accepting Co-Workers </b></label>
                    </div>

                    <div className="container">
                        <input type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_doctors} id="accepting_doctors"
                        onChange={this.handle_accepting_doctors} />
                        <label  ><b>Accepting Doctors </b></label>
                    </div>

                    <div className="container">
                        <input type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_nurses} id="accepting_nurses"
                        onChange={this.handle_accepting_nurses}  />
                        <label ><b>Accepting Nurses </b></label>
                    </div>

                    <div className="container">
                        <input type="checkbox" name="myCheckbox" defaultChecked={this.state.need_ventilators}  id="need-ventilators"
                        onChange={this.handle_need_ventilators}  />
                        <label  ><b>Need Ventilators </b></label>
                    </div>

                    <div className="container">
                        <label htmlFor="c-count-input" ><b>Covid Patients Count </b></label>
                        <input type="number" id="c-count-input" name="c_count" min={0} placeholder="Enter Covid Patients Count"
                        value={c_count} onChange={this.onchangeHandler}required />
                    </div>

                    <div className="container">
                        <label htmlFor="beds-input" ><b>Available Beds Count </b></label>
                        <input type="number" id="beds-input" name="beds" min={0} placeholder="Enter Beds Count" 
                        value={beds} onChange={this.onchangeHandler}required/>
                    </div>

                    <div className="container">
                        <label htmlFor="ventilators-input" ><b>Available Ventilators Count </b></label>
                        <input type="number"  id="ventilators-input" name="ventilators" min={0} placeholder="Enter Ventilators Count"
                        value={ventilators} onChange={this.onchangeHandler}required />
                    </div>

                    <div className="container">
                        <label htmlFor="oxygen-input" ><b>Available Oxygen Cylinders Count </b></label>
                        <input type="number" id="oxygens-input" name="oxygens" min={0} placeholder="Enter Oxygen Cylinder Count" 
                        value={oxygens} onChange={this.onchangeHandler}required/>
                    </div>

                    {
                        (this.state.need_ventilators)?
                        <>
                        <div className="container">
                            <label htmlFor="req-ventilators-input" ><b>Required Ventilators </b></label>
                            <input type="number"  id="req-ventilators-input" name="ventilators_required" min={1} placeholder="Enter Required Ventilators" 
                            value={ventilators_required} onChange={this.onchangeHandler}required/>
                        </div>
                        </>
                        :
                        <></>
                    }

                    {
                        (this.state.accepting_doctors)?
                        <>
                        <div className="container">
                            <label htmlFor="req-doctors-input" ><b>Required Doctors </b></label>
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
                        <div className="container">
                            <label htmlFor="req-nurses-input" ><b>Required Nurses </b></label>
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
                        <div className="container">
                        <label htmlFor="req-co-workers-input" ><b>Required Co-Workers </b></label>
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
                        <div className="container">
                            <label htmlFor="age-input" ><b>Age </b></label>
                            <input type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                        </div>

                        <div className="container">
                            <label htmlFor="genderselect" ><b>Gender </b></label>
                            <input type="radio" value="male" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label htmlFor="male">Male</label>
                            <input type="radio" value="female" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label htmlFor="female">Female</label>
                            <input type="radio" value="other"  checked={this.state.gender === "other"} onChange={this.genderHandler}/><label htmlFor="other">Other</label>
                        </div>
                        
                        <div className="container">                           
                            <input type="checkbox" name="myCheckbox" defaultChecked={this.state.ven_available} id="ven_available"
                            onChange={this.handle_ven_available}  />
                            <label><b>Ventilators Available? </b></label>                            
                        </div>

                        {
                            (this.state.ven_available)?
                                <div className="container">
                                    <label htmlFor="total_ven" ><b>Total Ventilators </b></label>
                                    <input type="number" id="total_ven" name="total_ven" placeholder="Total Ventilators" value={total_ven} onChange={this.onchangeHandler}required/>
                                </div>
                            :
                            <></>
                        }
                        
                        </>   
                        :
                        
                        (this.state.radio === "4") || (this.state.radio === "5") || (this.state.radio === "6")?
                        <>
                        <div className="container">
                            <label htmlFor="age-input" ><b>Age </b></label>
                            <input type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                        </div>

                        <div className="container">
                            <label htmlFor="genderselect" ><b>Gender  </b></label>
                            <input type="radio" value="male" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label htmlFor="male">Male</label>
                            <input type="radio" value="female" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label htmlFor="female">Female</label>
                            <input type="radio" value="other"  checked={this.state.gender === "other"} onChange={this.genderHandler}/><label htmlFor="other">Other</label>
                        </div>
                        
                        
                        <div className="container">                           
                            <input type="checkbox" name="myCheckbox" defaultChecked={this.state.available} id="available"
                            onChange={this.handle_available}  />
                            <label><b>Available for work? </b></label>                            
                        </div>

                        {
                            (this.state.available)?
                                <></>
                                :
                                <div className="container">
                                    <label htmlFor="working_at" ><b>Currently Working At </b></label>
                                    <input type="number"  id="hospital_id" name="working_at" placeholder="Enter current working place" value={working_at} onChange={this.onchangeHandler}required/>
                                </div>
                        }
                        
                        
                        </>   
                        :
                        <></>
            }
               
                   <button type='submit' className='registerButton'>Register</button>
                   <p>Already have an account?
                    <Link to='/loginpage'>
                    <a>Log in</a>
                   </Link>
                    </p>

               </form>
            </div>
            </div>
        </div>
        )
        
        

        
    
    }
}

export default Register
