import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import '../Styles/mycss.css'

export class Update extends Component {

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

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
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
                        <h1>Edit Your Information</h1>
                        <input type='text' placeholder='Enter Name'  name="name" /*value={email}*/ onChange={this.onchangeHandler} id="name" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Name')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='email' placeholder='Enter Email'  name="email" /*value={email}*/ onChange={this.onchangeHandler} id="email_login" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Email')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Age'  name="age" /*value={email}*/ onChange={this.onchangeHandler} id="age" required onInvalid={(e) => e.target.setCustomValidity('Please Enter age')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Gender'  name="gender" /*value={email}*/ onChange={this.onchangeHandler} id="gender" required onInvalid={(e) => e.target.setCustomValidity('Please Enter gender')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Phone number'  name="ph-number" /*value={email}*/ onChange={this.onchangeHandler} id="ph-number" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Phone Number')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Address'  name="email" /*value={email}*/ onChange={this.onchangeHandler} id="address" required onInvalid={(e) => e.target.setCustomValidity('Please Enter address')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <button type='submit' className="btnn" onClick={this.onSubmit} value="Login" >Update</button><br/>
                    </div>
                </form>
                </div>
            </div>          
        )
    }
}

export default Update
