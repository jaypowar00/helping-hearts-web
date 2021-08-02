import React, { Component } from 'react'
import './CSS/MyCSS.css'
import axios from 'axios'

class PatientRegister extends Component {

    constructor(props) {

        super(props)
    
        this.state = {
             age: "",
             gender: "",
             diseases: ""
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onchangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    genderHandler = (event) => {
        this.setState({
            gender: event.target.value
        })
    }

    handleSubmit = (event) => {

        alert(`${this.state.name} Registered Successfully!`)

        axios.post('https://helpinghearts-mraj.herokuapp.com/user/register/', this.state)
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })

        console.log(this.state)
        this.setState({
            age: "",
            gender: "",
            diseases: ""
        })
        event.preventDefault()
        
    }

    render() {
        const  {age, gender, diseases} = this.state
        return (
            <div className="container">
                <div className="card">
                <form onSubmit={this.handleSubmit}>
                    <h1>Patient Register </h1>
                    <label><b>Age  </b></label>
                    <input type = 'text' placeholder='Enter age' name="age" value={age} onChange={this.onchangeHandler}required/><br/>
                    <label><b>Diseases  </b></label>
                    <input type = 'text' placeholder='Enter Diseases' name="diseases" value={diseases} onChange={this.onchangeHandler}required/><br/>

                    <br/><br/><label><b>Select Gender : </b></label>
                    <div >
                    <input type="radio" value="male" checked={this.state.gender === "male"} onChange={this.genderHandler}/><label htmlFor="male">Male</label>
                    <input type="radio" value="female" checked={this.state.gender === "female"} onChange={this.genderHandler}/><label htmlFor="female">Female</label>
                    <input type="radio" value="other"  checked={this.state.gender === "other"} onChange={this.genderHandler}/><label htmlFor="other">Other</label>
                    <br/>
                    </div>
                    <br/>
                    <input type='submit' className='submitButton' value="Submit" />
                    
                </form>
                </div>
            </div>
        )
    }
}

export default PatientRegister
