import React, { Component } from 'react'
import '../Styles/mycss.css'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import axios from 'axios'
import { refreshToken } from '../utils/tokenRefresh'

class About extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             loggedIn: false
        }
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }
    
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
        var access_token = this.getCookie('access_token');
        if(access_token){
            axios.get('https://helpinghearts-mraj.herokuapp.com/user/',{
                headers : {
                    'Authorization' : `token `+access_token
                }
            })
            .then(response=>{
                console.log(response)
                if(response.data.status){
                    this.setState({
                        loggedIn: true
                    })
                }
            })
            .catch(error=>{
                console.log(error)
                if(error.response && error.response.data && error.response.data.detail === "access token expired!"){
                    refreshToken();
                }
            })
        }
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

    onLogoutClick(e) {
        e.preventDefault();
        var access_token = this.getCookie('access_token');
        var csrf_token = this.getCookie('csrf_token');
        if(access_token!=null) {
            axios.post('https://helpinghearts-mraj.herokuapp.com/user/logout/', undefined, {headers: {'Authorization': 'Token '+access_token, 'X-CSRFToken': csrf_token}})
            .then(response=>{
                console.log(response);
                if(response.data.status){
                    console.log('successfully logged out!');
                    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }else{
                    console.log('something went wrong!');
                }
            }).catch(e=>{
                document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                console.log(e);
                window.location.reload();
            }).finally(() => {
                window.location.reload();
            });
        }else{
            console.log('already logged out!');
            window.location.reload();
        }
    }

    render() {
        return (
            <div>
                    <div className="header">
                        <div>
                            <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
                                <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                            </a>
                            <div className='project_name'><b>Helping Hearts</b></div>
                            <div className="header-right">
                                <a className="mx-1" href="/">Home</a>
                                {
                                    (this.state.loggedIn)?
                                        <a className="mx-1" href="/profile">Profile</a>
                                    :
                                        <a className="mx-1" href="/login">Login</a>
                                }
                                <a className="mx-1" href="/contact">Contact</a>
                                <a className="active mx-1" href="/about">About</a>
                                {
                                    (this.state.loggedIn)?
                                        <a className="mx-1" href="/about/#" onClick={this.onLogoutClick}>Logout</a>
                                    :<></>
                                }
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
                                            {
                                                (this.state.loggedIn)?
                                                <a className="nav-link" href="/profile">Profile</a>
                                                :
                                                <a className="nav-link" href="/login">Login</a>
                                            }
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/contact">Contact</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="active nav-link" href="/about">About</a>
                                            </li>
                                            {
                                                (this.state.loggedIn)?
                                                <li className="nav-item">
                                                    <a className="nav-link" href="/about/#" onClick={this.onLogoutClick}>Logout</a>
                                                </li>
                                                :<></>
                                            }
                                            </ul>
                                        </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="aboutpg" >
                            <h5>About Helping Hearts :</h5>
                            <p>&emsp;&emsp;This is Helping-Hearts Project developed by team MRAJ with members Jay Powar, Ajay Powar, Manasi Shinde, Rohan Mane students of D.Y.Patil College Kolhapur.</p>
                            <p>&emsp;&emsp;This projects aims at creating a platform which will be helpfull to bridge the gap between mainly patients and hospitals along with their admit request management it also helps hospitals to get help from either ventilator providers or other coworkers for specific work!</p>
                            <p>&emsp;&emsp;This project is still under development and is being deployed just to showcase the teams development capabilities along with their skills.</p>
                            <br/>
                            <h5>Created by :</h5>
                            <span className="names">
                                Rohan Mane [Backend + FrontEnd Dev.]<br/>
                                Ajay Powar [Frontend Dev.]<br/>
                                Manasi Shinde [Frontend Dev.]<br/>
                                Jay Powar [Backend + Frontend Dev.]<br/>
                            </span>
                        </div>
                    </div>
                </div> 
        )
    }
}

export default About
