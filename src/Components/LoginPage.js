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

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
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
                console.log(err);
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
            window.location.href = '/login/#';
        })
        .catch(error=>{
            console.log(error)
        })
        // this.props.history.push('/profile/');
    }
    
    render() {

        const {email, password} = this.state

        return ( 

        <div>

            <div>
                <div className="header">
                    <div>
                        <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
                            <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                        </a>
                        <div className='project_name'><b>Helping Hearts</b></div>
                        <div className="header-right">
                            <a className="mx-1" href="/">Home</a>
                            <a className="active mx-1" href="/login">Login</a>
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
                                        <a className="nav-link active" href="/login">Login</a>
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


            <div className="container">
                <form onSubmit={this.handleSubmit}> 
                    <div className="loginform">    
                         <h1>Login Here</h1>       
                        <input type='email' placeholder='Enter Email'  name="email"
                        value={email} onChange={this.onchangeHandler} id="email_login" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Email')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <p>We'll never share your email with anyone else.</p> 
                        <input type='password' placeholder='Enter Password'  name="password"
                        value={password} onChange={this.onchangeHandler} id="password_login" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Password')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>                   
                        <button type='submit' className="btnn" onClick={this.onSubmit} value="Login" >Login</button><br/>
                        <br/><span>Don't have an account?   </span>
                        <a className="link" href="/register">SignUp</a><br/>
                    </div>
                </form>
            </div>
        </div> 
        )
    }
}

export default LoginPage
