import React, { Component } from 'react'
import './CSS/MyCSS.css'
import axios from 'axios'

export class HospitalRegister extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            c_count: "",
            beds: "",
            ventilators: "",
            oxygens: "",
            accepting_patients: "",
            accepting_coworkers: "",
            accepting_doctors: "",
            accepting_nurses: "",
            need_ventilators: "",
            ventilators_required: "",
            doctors_required: "",
            nurses_required: "",
            coworkers_required: ""
        }
    }

    onchangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        alert(`Hospital Registered Successfully!`)
        console.log(this.state)

        axios.post('https://helpinghearts-mraj.herokuapp.com/user/login/', this.state)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })

        this.setState({
            c_count: "",
            beds: "",
            ventilators: "",
            oxygens: "",
            accepting_patients: "",
            accepting_coworkers: "",
            accepting_doctors: "",
            accepting_nurses: "",
            need_ventilators: "",
            ventilators_required: "",
            doctors_required: "",
            nurses_required: "",
            coworkers_required: ""

        })
        event.preventDefault()
    }
    
    render() {
        const{c_count, beds,ventilators,
        oxygens,
        accepting_patients,
        accepting_coworkers,
        accepting_doctors,
        accepting_nurses,
        need_ventilators,
        ventilators_required,
        doctors_required,
        nurses_required,
        coworkers_required} = this.state
        return (
            <div className="container">
                <div className="card">
                <form onSubmit={this.handleSubmit}>
                    <h1>Hospital Register </h1>

                    <label><b>Covid Patient Count </b></label>
                    <input type = 'text' placeholder='Enter Covid Patient Count' name="c_count" 
                    value={c_count} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Beds </b></label>
                    <input type = 'text' placeholder='Enter No of Beds' name="beds" 
                    value={beds} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Ventilators </b></label>
                    <input type = 'text' placeholder='Enter No of ventilators' name="ventilators" 
                    value={ventilators} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Oxygens </b></label>
                    <input type = 'text' placeholder='Enter No of oxygens' name="oxygens" 
                    value={oxygens} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Accepting Patients </b></label>
                    <input type = 'text' placeholder='Enter No of accepting_patients' name="accepting_patients" 
                    value={accepting_patients} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Accepting Co-Workers </b></label>
                    <input type = 'text' placeholder='Enter No of accepting_coworkers' name="accepting_coworkers" 
                    value={accepting_coworkers} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Accepting Doctors </b></label>
                    <input type = 'text' placeholder='Enter No of accepting_doctors' name="accepting_doctors" 
                    value={accepting_doctors} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Accepting Nurses </b></label>
                    <input type = 'text' placeholder='Enter No of accepting_nurses' name="accepting_nurses" 
                    value={accepting_nurses} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Ventilators Needed </b></label>
                    <input type = 'text' placeholder='Enter No of need_ventilators' name="need_ventilators" 
                    value={need_ventilators} onChange={this.onchangeHandler}required/><br/>

                    <label><b>ventilators Required  </b></label>
                    <input type = 'text' placeholder='Enter No of ventilators_required' name="ventilators_required" 
                    value={ventilators_required} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Doctors Required  </b></label>
                    <input type = 'text' placeholder='Enter No of doctors_required' name="doctors_required" 
                    value={doctors_required} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Nurses Required  </b></label>
                    <input type = 'text' placeholder='Enter No of nurses_required' name="nurses_required" 
                    value={nurses_required} onChange={this.onchangeHandler}required/><br/>

                    <label><b>Co-Workers Required  </b></label>
                    <input type = 'text' placeholder='Enter No of coworkers_required' name="coworkers_required" 
                    value={coworkers_required} onChange={this.onchangeHandler}required/><br/>
                    
                    <input type='submit' className='submitButton' value="Submit" />
                    
                </form>
                </div>
            </div>
        )
    }
}

export default HospitalRegister
