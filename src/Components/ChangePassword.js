import axios from 'axios';
import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'

export class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password: "",
            new_password: "",
            new_password2: "",
        }
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onNewPasswordChange = this.onNewPasswordChange.bind(this);
        this.onNewPassword2Change = this.onNewPassword2Change.bind(this);
        
    }
    
    onPasswordChange(e) {
        this.setState({
            password: e.target.value
        })
    }
    
    onNewPasswordChange(e) {
        this.setState({
            new_password: e.target.value
        })
    }
    
    onNewPassword2Change(e) {
        this.setState({
            new_password2: e.target.value
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

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    onSubmit(e) {
        e.preventDefault();
        let access_token = this.getCookie('access_token');
        let csrf_token = this.getCookie('csrf_token');
        if(this.state.new_password!==this.state.new_password2){
            alert("new confirm password did not matched!\ntry again");
        }else{
            let changeData = {
                'password': this.state.password,
                'new_password': this.state.new_password,
            }
            axios.post('https://helpinghearts-mraj.onrender.com/user/update/', changeData, {
                withCredentials: true,
                headers: {
                    'Authorization': 'Token '+access_token,
                    'X-CSRFToken': csrf_token
                }
            }).then(response=>{
                if(response.data.status){
                    alert('password changed!');
                    window.location.href='/profile';
                }else{
                    if(response.data.status===false){
                        alert("password change Failed!\n"+response.data.message);
                    }else{
                        alert("Something went wring!");
                    }
                    window.location.href='/profile';
                }
            })
        }
    }

    render() {
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
                            <a className="mx-1" href="/profile">Profile</a>
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
                                        <a className="nav-link" href="/profile">Profile</a>
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
            
                <div>
                <form onSubmit={this.onSubmit}>
                    
                    <div className="edit-form text-center">
                        <h1>Change Password</h1>
                        <input type='password' placeholder='Enter Old password'  name="password-old" value={this.state.password} onChange={this.onPasswordChange} id="password-old" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Old password')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='password' placeholder='Enter New password'  name="password-new" value={this.state.new_password} onChange={this.onNewPasswordChange} id="password-new" required onInvalid={(e) => e.target.setCustomValidity('Please Enter New password')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='password' placeholder='Confirm password'  name="confirm-pass" value={this.state.new_password2} onChange={this.onNewPassword2Change} id="confirm-pass" required onInvalid={(e) => e.target.setCustomValidity('Confirm your password')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        
                        <button type='submit' className="btnn" value="Login" >Change Password</button><br/>
                    </div>
                </form>
                </div>
            </div>          
        )
    }
}

export default ChangePassword
