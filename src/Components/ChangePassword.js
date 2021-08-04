import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'

export class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
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

    render() {
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
                <form /*onSubmit={this.handleSubmit}*/>
                    
                    <div className="edit-form">
                        <h1>Change Password</h1>
                        <input type='password' placeholder='Enter Old password'  name="password-old" /*value={oldpass}*/ onChange={this.onchangeHandler} id="password-old" required onInvalid={(e) => e.target.setCustomValidity('Please Enter old password')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='password' placeholder='Enter New password'  name="password-new" /*value={newpass}*/ onChange={this.onchangeHandler} id="password-new" required onInvalid={(e) => e.target.setCustomValidity('Please Enter new password')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='password' placeholder='Confirm password'  name="confirm-pass" /*value={confirmpass}*/ onChange={this.onchangeHandler} id="confirm-pass" required onInvalid={(e) => e.target.setCustomValidity('Confirm your password')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        
                        <button type='submit' className="btnn" onClick={this.onSubmit} value="Login" >Change Password</button><br/>
                    </div>
                </form>
                </div>
            </div>          
        )
    }
}

export default ChangePassword
