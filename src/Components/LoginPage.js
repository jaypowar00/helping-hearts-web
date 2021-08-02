import React, { Component } from 'react'
import '../Styles/mycss.css'
import axios from 'axios'
import mylogo from '../Styles/helpinghearts_logo.jpg'


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

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
        var access_token = this.getCookie('access_token');
        if(access_token != null){
            axios.get('https://helpinghearts-mraj.herokuapp.com/user/', {headers: {'Authorization': 'Token '+access_token}})
            .then(response => {
                if(response.data.status) {
                    window.location.href = '/';
                }else{
                    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }
            }).catch(err => {
                document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                alert(err);
            });
        }
    }

    handleSubmit = (event) => {

        event.preventDefault()
        console.log(this.state)

        axios.post('https://helpinghearts-mraj.herokuapp.com/user/login/', this.state)
        .then(response=>{
            console.log(response)
            document.cookie = 'access_token=' + response.data['access_token'];
            document.cookie = 'refresh_token=' + response.data['refresh_token'];
            document.cookie = 'csrf_token=' + response.data['csrf_token'];
            window.location.href = '/';
        })
        .catch(error=>{
            console.log(error)
        })

        
        // this.props.history.push('/profile/');

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
                    <a class="logo" href="/">
                    <img src={mylogo} alt="" height={50} width={50} style={{marginTop: '-20px', marginBottom: '-10px'}}/>
                    </a>
                    <div class='project_name'><b>Helping Hearts</b></div>
                    <div class="header-right">
                        <a href="/">Home</a>               
                        <a class="active" href="/login">Login</a>               
                        <a href="/contact">Contact</a>
                        <a href="/about">About</a>                                      
                    </div>
                </div>
            </div>  


            <div className="container">
                <div className="card pt-4 px-5 pb-4 my-5" style={{width: '40vw', minWidth: '500px'}}>
                    <form className="form-group" onSubmit={this.handleSubmit}>
                        <div className=" form-group container" style={{textAlign: 'left'}}>
                            <label className="form-control-plaintext" htmlFor="email_login"><b>Email:</b></label>
                            <input style={{width: '100%'}} className="form-control" type='email' placeholder='Enter Email'  name="email"
                            value={email} onChange={this.onchangeHandler} id="email_login" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Email')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                            <label htmlFor="password_login" className="form-control-plaintext"><b>Password:</b></label>
                            <input style={{width: '100%'}} className="form-control" type='password' placeholder='Enter password'  name="password"
                            value={password} onChange={this.onchangeHandler} id="password_login" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Password')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>      
                        </div>
                        <input type='submit' className='form-control registerButton btn my-3' onClick={this.onSubmit} value="Login" />
                   </form>
                   <div className="mt-2 mb-2">New User? <a href="/register">Register Here</a></div>
                </div>
            </div>
        </div> 
        )
    }
}

export default LoginPage
