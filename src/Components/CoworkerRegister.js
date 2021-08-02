import React, { Component } from 'react'
import './CSS/MyCSS.css'

class CoworkerRegister extends Component {

    constructor(props) {
        super(props)
    
        this.state = {          
             age: "",
             gender: "",
             available: "",
             working_at: ""
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    genderHandler = (event) => {
        this.setState({
            gender : event.target.value
        });
      }

    handleSubmit = (event) => {
        alert(`${this.state.gender} ${this.state.age} ${this.state.available} ${this.state.working_at} Registered Successfully!`)
        console.log(this.state)
        this.setState({
            age: "",
            gender: "",
            available: "",
            working_at: ""
        })
        event.preventDefault()
    }

    render() {
        const{age,  gender, available, working_at} = this.state
        return (
            <div className="container">
                <div className="card">
                <form onSubmit={this.handleSubmit}>
                    <h1>Co-Worker Registration</h1>
                    <label><b>Age  </b></label>
                    <input type = 'text' placeholder='Enter age' name="age" 
                    value={age} onChange={this.changeHandler}required/><br/>

                    <label><b>Available or not </b></label>
                    <input type = 'text' placeholder='Enter availability' name="available" 
                    value={available} onChange={this.changeHandler}required/><br/>

                    <label><b>Currently Working At </b></label>
                    <input type = 'text' placeholder='Enter working_at' name="working_at" 
                    value={working_at} onChange={this.changeHandler}required/><br/>

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

export default CoworkerRegister
