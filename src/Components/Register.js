import React, { Component } from 'react'
import '../Styles/mycss.css'
import {Link} from 'react-router-dom';
import mylogo from '../Styles/helpinghearts_logo.jpg'

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

        console.log(radio, acc_type);
           
        return ( 
        <div>          
            <div>
                <div class="header">
                <a className="logo mx-2" style={{borderRadius: '50%'}}>
                        <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                    </a>
                    <div class='project_name'><b>Helping Hearts</b></div>
                    <div class="header-right">
                        <a className="mx-1" href="/">Home</a>               
                        <a class="active mx-1" href="/register">Register</a>               
                        <a className="mx-1" href="/contact">Contact</a>
                        <a className="mx-1" href="/about">About</a> 
                                      
                    </div>
                </div>
            </div>  

            <div className="container my-4" style={{width: '70vw'}}>
                <div className="card py-4 px-0" style={{textAlign: 'center'}}>
               <form style={{minWidth: '500px'}} onSubmit={this.handleSubmit}>
                <div className="container px-5" style={{textAlign: 'start', width: 'fit-content'}}>
                    <div className="form-group my-3">
                        <label htmlFor="name_reg"><b>Name : </b></label><br/>
                        <input className="form-control my-0" id="name_reg" type='text' placeholder='Enter Name' name="name" value={name} onChange={this.onchangeHandler} required/><br/>
                    </div>

                    <div className="form-group my-3">
                    <label htmlFor="phone_reg"><b>Phone Number : </b></label><br/>
                    <input className="form-control my-0" id="phone_reg" type='text' placeholder='Enter Phone No' name="phone" value={phone} onChange={this.onchangeHandler} required /><br/>
                    </div>

                    <div className="form-group my-3">
                    <label htmlFor="address_reg"><b>Address : </b></label><br/>
                    <input className="form-control my-0" id="address_reg" type='text' placeholder='Enter Address' name="address" value={address} onChange={this.onchangeHandler} required /><br/>
                    </div>

                    <div className="form-group my-3">
                    <label htmlFor="username_reg"><b>Username : </b></label><br/>
                    <input className="form-control my-0" id="username_reg" type='text' placeholder='Enter username' name="username" value={username} onChange={this.onchangeHandler} required /><br/>
                    </div>

                    <div className="form-group my-3">
                    <label htmlFor="email_reg"><b>Email : </b></label><br/>
                    <input className="form-control my-0" id="email_reg" type='email' placeholder='Enter email' name="email" value={email} onChange={this.onchangeHandler} required /><br/>
                    </div>

                    <div className="form-group mt-3 mb-1">
                    <label htmlFor="password_reg"><b>Password : </b></label><br/>
                    <input className="form-control my-0" id="password_reg" type='password' placeholder='Enter password' name="password" value={password} onChange={this.onchangeHandler} required /><br/>
                    </div>

                <br/>
                    <div className="form-group">
                        <label htmlFor="selectaccounttype"><b>Select Account Type: &nbsp; </b></label><br/>
                        <select   id="selectaccounttype" name="account-type"  ref={this.accountRef} onChange={this.onAccountChange} required>
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
                    <div className="form-group">
                        <label htmlFor="age-input" ><b>Age : &nbsp; </b></label><br/>
                        <input className="form-control mb-3" type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                    </div>

                    <div className="form-group mb-2">
                        <label htmlFor="genderselect" ><b>Gender : &nbsp; </b></label><br/>
                        <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="male" name="gender" id="male_r" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label htmlFor="male_r">Male</label>
                        <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="female" name="gender" id="female_r" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label htmlFor="female_r">Female</label>
                        <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="other" name="gender"  id="other_r" checked={this.state.gender === "other"} onChange={this.genderHandler}/><label htmlFor="other_r">Other</label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="diseases_reg"><b>Diseases : &nbsp; </b></label><br/>
                        <input className="form-control mb-3" id="diseases_reg" type='text' placeholder='Enter Diseases' name="diseases" value={diseases} onChange={this.onchangeHandler}required/><br/>
                    </div>
                    
                    </>
                    :
                    (this.state.radio === "2")?
                    <>
                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_patients} id="accepting_patients" 
                        onChange={this.handle_accepting_patients} />
                        <label htmlFor="accepting_patients" className="form-check-label"><b>Accepting Patients</b></label>
                    </div>

                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_coworkers} id="accepting_coworkers"
                        onChange={this.handle_accepting_coworkers} />
                        <label htmlFor="accepting_coworkers" className="form-check-label"><b>Accepting Co-Workers</b></label>
                    </div>

                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_doctors} id="accepting_doctors"
                        onChange={this.handle_accepting_doctors} />
                        <label htmlFor="accepting_doctors" className="form-check-label"><b>Accepting Doctors</b></label>
                    </div>

                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" name="myCheckbox" defaultChecked={this.state.accepting_nurses} id="accepting_nurses"
                        onChange={this.handle_accepting_nurses}  />
                        <label htmlFor="accepting_nurses" className="form-check-label"><b>Accepting Nurses</b></label>
                    </div>

                    <div className="form-group form-check">
                        <input className="form-check-input" type="checkbox" name="myCheckbox" defaultChecked={this.state.need_ventilators}  id="need-ventilators"
                        onChange={this.handle_need_ventilators}  />
                        <label htmlFor="need-ventilators" className="form-check-label"><b>Need Ventilators</b></label>
                    </div>

                    <div className="form-group">
                        <label htmlFor="c-count-input" ><b>Covid Patients Count : &nbsp; </b></label><br/>
                        <input className="form-control mb-3" type="number" id="c-count-input" name="c_count" min={0} placeholder="Enter Covid Patients Count"
                        value={c_count} onChange={this.onchangeHandler}required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="beds-input" ><b>Available Beds Count : &nbsp; </b></label><br/>
                        <input className="form-control mb-3" type="number" id="beds-input" name="beds" min={0} placeholder="Enter Beds Count" 
                        value={beds} onChange={this.onchangeHandler}required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="ventilators-input" ><b>Available Ventilators Count : &nbsp; </b></label><br/>
                        <input className="form-control mb-3" type="number"  id="ventilators-input" name="ventilators" min={0} placeholder="Enter Ventilators Count"
                        value={ventilators} onChange={this.onchangeHandler}required />
                    </div>

                    <div className="form-group">
                        <label htmlFor="oxygen-input" ><b>Available Oxygen Cylinders Count : &nbsp; </b></label><br/>
                        <input className="form-control mb-3" type="number" id="oxygens-input" name="oxygens" min={0} placeholder="Enter Oxygen Cylinder Count" 
                        value={oxygens} onChange={this.onchangeHandler}required/>
                    </div>

                    {
                        (this.state.need_ventilators)?
                        <>
                        <div className="form-group">
                            <label htmlFor="req-ventilators-input" ><b>Required Ventilators : &nbsp; </b></label><br/>
                            <input className="form-control" type="number"  id="req-ventilators-input" name="ventilators_required" min={1} placeholder="Enter Required Ventilators" 
                            value={ventilators_required} onChange={this.onchangeHandler}required/>
                        </div>
                        </>
                        :
                        <></>
                    }

                    {
                        (this.state.accepting_doctors)?
                        <>
                        <div className="form-group">
                            <label htmlFor="req-doctors-input" ><b>Required Doctors : &nbsp; </b></label><br/>
                            <input className="form-control" type="number"  id="req-doctors-input" name="doctors_required" min={1} placeholder="Enter Required Doctors" 
                            value={doctors_required} onChange={this.onchangeHandler}required/>
                        </div>
                        </>
                        :
                        <></>
                    }

                    {
                        (this.state.accepting_nurses)?
                        <>
                        <div className="form-group">
                            <label htmlFor="req-nurses-input" ><b>Required Nurses : &nbsp; </b></label><br/>
                            <input className="form-control" type="number" id="req-nurses-input" name="nurses_required" min={1} placeholder="Enter Required Nurses"
                            value={nurses_required} onChange={this.onchangeHandler}required/>
                        </div>
                        </>
                        :
                        <></>
                    }

                    {
                        (this.state.accepting_coworkers)?
                        <>
                        <div className="form-group">
                        <label htmlFor="req-co-workers-input" ><b>Required Co-Workers : &nbsp; </b></label><br/>
                        <input className="form-control" type="number" id="req-co-workers-input" name="coworkers_required" min={1} placeholder="Enter Required Co-Workers"
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
                        <div className="form-group mb-2">
                            <label htmlFor="age-input" ><b>Age : &nbsp; </b></label><br/>
                            <input className="form-control" type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="genderselect" ><b>Gender : &nbsp; </b></label><br/>
                            <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="male" id="male_r" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label htmlFor="male_r">Male</label>
                            <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="female" id="female_r" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label htmlFor="female_r">Female</label>
                            <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="other" id="other_r" checked={this.state.gender === "other"} onChange={this.genderHandler}/><label htmlFor="other_r">Other</label>
                        </div>
                        
                        <div className="form-group form-check mb-3">                           
                            <input className="form-check-input" type="checkbox" name="myCheckbox" defaultChecked={this.state.ven_available} id="ven_available"
                            onChange={this.handle_ven_available}/>
                            <label className="form-check-label" htmlFor="ven_available"><b>Ventilators Available? </b></label>                            
                        </div>

                        {
                            (this.state.ven_available)?
                                <div className="form-group mb-3">
                                    <label htmlFor="total_ven" ><b>Total Ventilators : &nbsp; </b></label><br/>
                                    <input className="form-control" type="number" id="total_ven" name="total_ven" placeholder="Total Ventilators" value={total_ven} onChange={this.onchangeHandler}required/>
                                </div>
                            :
                            <></>
                        }
                        
                        </>   
                        :
                        
                        (this.state.radio === "4") || (this.state.radio === "5") || (this.state.radio === "6")?
                        <>
                        <div className="form-group mb-3">
                            <label htmlFor="age-input" ><b>Age : &nbsp; </b></label><br/>
                            <input type="text"  id="age-input" name="age" placeholder="Enter Age" value={age} onChange={this.onchangeHandler}required/>
                        </div>

                        <div className="form-group mb-3">
                            <label htmlFor="genderselect" ><b>Gender : &nbsp; </b></label><br/>
                            <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="male" id="male_r" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label htmlFor="male_r">Male</label>
                            <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="female" id="female_r" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label htmlFor="female_r">Female</label>
                            <input style={{marginLeft: '10px', marginRight: '3px'}} type="radio" value="other" id="other_r"  checked={this.state.gender === "other"} onChange={this.genderHandler}/><label htmlFor="other_r">Other</label>
                        </div>
                        
                        
                        <div className="form-group form-check mb-3">                           
                            <input className="form-check-input" type="checkbox" name="myCheckbox" defaultChecked={this.state.available} id="available"
                            onChange={this.handle_available}  />
                            <label htmlFor="available" className="form-check-label"><b>Available for work? </b></label>                            
                        </div>

                        {
                            (this.state.available)?
                                <></>
                                :
                                <div className="form-group mb-3">
                                    <label htmlFor="working_at" ><b>Currently Working At: &nbsp; </b></label><br/>
                                    <input className="form-control" type="number"  id="hospital_id" name="working_at" placeholder="Enter current working place" value={working_at} onChange={this.onchangeHandler}required/>
                                </div>
                        }
                        
                        
                        </>   
                        :
                        <></>
            }
                </div>
                <input type='submit' className='registerButton btn form-control mb-3' value="Register" />
                <p>Already have an Account? &nbsp;
                    <Link to='/login'>
                        <span>Log in</span>
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
