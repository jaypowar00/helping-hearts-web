import React, { Component } from 'react'
import './CSS/MyCSS.css'
import {Link} from 'react-router-dom';
import axios from 'axios'
import mylogo from './CSS/HHLogo.jpg'


class LoginPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: "",
             password: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    onchangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {

        event.preventDefault()
        console.log(this.state)

        alert(`${this.state.email} Login Successful!`)

        axios.post('https://helpinghearts-mraj.herokuapp.com/user/login/', this.state)
        .then(response=>{
            console.log(response)
            document.cookie = 'access_token=' + response['response']['access_token']
            document.cookie = 'refresh_token=' + response['response']['refresh_token']
            document.cookie = 'csrf_token=' + response['response']['csrf_token']
        })
        .catch(error=>{
            console.log(error)
        })

        
        this.props.history.push('/profile/');

        this.setState({
            email: "",
            password: "",
        })
        
    }
    
    render() {

        const {email, password} = this.state

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

                        <h1>Login</h1>
                        <p>Please enter email and password to access your account.</p>           

                        <label ><b>Email </b></label>
                        <input type='email' placeholder='Enter email'  name="email"  
                        value={email} checked={this.state.email === "email"} onChange={this.onchangeHandler} required/><br/>

                        <label><b>Password </b></label>
                        <input type='password' placeholder='Enter password'  name="password" 
                        value={password} checked={this.state.password === "patient"} onChange={this.onchangeHandler} required/><br/>        
                                  
                        <button type='submit' className='registerButton' onClick={this.onSubmit}>Login</button>
                        
                   </form>
                </div>
            </div>
        </div> 
        )
    }
}

export default LoginPage
