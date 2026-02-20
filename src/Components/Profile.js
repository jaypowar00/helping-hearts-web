import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import axios from 'axios'
import { refreshToken } from '../utils/tokenRefresh'
import '../Styles/spinkit.css'
import API_BASE_URL from "../utils/api";

export class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             name: "",
             address: "",
             phone : "",
             email : "",
             username : "",
             age: "",
             gender: "",
             pincode: "",
             about: "",
             loading: true,
             requested: null,
             admitted: null,
             account_type: null,
        }
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);

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

    onLogoutClick(e) {
        e.preventDefault();
        var access_token = this.getCookie('access_token');
        var csrf_token = this.getCookie('csrf_token');
        if(access_token!=null) {
            this.setState({loading: true});
            axios.post(`${API_BASE_URL}/user/logout/`, undefined, {headers: {'Authorization': 'Token '+access_token, 'X-CSRFToken': csrf_token}})
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
    componentDidMount(){
        var access_token = this.getCookie('access_token');
        if(access_token){
            this.setState({loading: true});
            axios.get(`${API_BASE_URL}/user/`,{
                headers : {
                    'Authorization' : `token `+access_token
                }
            })
            .then(response=>{
                console.log(response)
                if(response.data.status){
                    this.setState({
                        name: response.data.user.name,
                        address: response.data.user.address,
                        phone: response.data.user.phone,
                        email: response.data.user.email,
                        username: response.data.user.username,
                        age: response.data.user.detail.age,
                        gender: response.data.user.detail.gender,
                        pincode: response.data.user.pincode,
                        about: response.data.user.about,
                        loading: false,
                        requested: response.data.user.detail.requested_hospital,
                        admitted: (response.data.user.account_type==='patient')?response.data.user.detail.admitted_hospital:response.data.user.detail.working_at,
                        account_type: response.data.user.account_type
                    })
                }else{
                    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    window.location.hre="/login";
                }
            })
            .catch(error=>{
                console.log(error)
                if(error.response && error.response.data && error.response.data.detail === "access token expired!"){
                    refreshToken();
                }
                this.setState({loading: false})
            })
        }else{
            this.setState({loading: false})
            console.log('Not logged in!\nPlease log in again!');
            window.location.href='/login';
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
                            <a className="active mx-1" href="/profile">Profile</a>
                            <a className="mx-1" href="/contact">Contact</a>
                            <a className="mx-1" href="/about">About</a>
                            <a className="mx-1" href="/profile/#" onClick={this.onLogoutClick}>Logout</a>
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
                                        <a className="nav-link active" href="/profile">Profile</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/contact">Contact</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/about">About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/profile/#" onClick={this.onLogoutClick}>Logout</a>
                                        </li>
                                        </ul>
                                    </div>
                            </section>
                        </div>
                    </div>
                </div>
                </div>  
                <div style={{textAlign: 'center'}}>
                    <div className="container card profile-div p-4 mt-3" style={{textAlign: 'left', minWidth: '350px', backgroundColor: 'rgb(194, 230, 253)'}}>
                        <h2 className="mb-3">Profile </h2>
                        <h5>Name : &nbsp; </h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '80px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :
                            this.state.name
                        } </span> <br/>
                        <h5>Email : &nbsp; </h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '75px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :
                            this.state.email
                        } </span> <br/>
                        <h5>Age : &nbsp; </h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '65px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :
                            this.state.age
                        } </span> <br/>
                        <h5>Gender : &nbsp; </h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '95px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :
                            this.state.gender
                        } </span> <br/>
                        <h5>Phone : &nbsp; </h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '80px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :
                            this.state.phone
                        } </span> <br/>
                        <h5>Address : &nbsp; </h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '105px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :
                            this.state.address
                        } </span> <br/>
                        <h5>Pincode : &nbsp; </h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '100px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :
                            this.state.pincode
                        } </span> <br/>
                        <h5>About : &nbsp; </h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '90px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :
                            this.state.about
                        } </span> <br/>
                        {(this.state.account_type!=='hospital' && this.state.account_type!=='ventilator provider' && this.state.account_type!==null)?
                        <>
                        <h5>Requested Hospital :&nbsp;</h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '205px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :(this.state.requested)?<a href={"/hospital?hd="+this.state.requested.id}>{this.state.requested.name}</a>:'None'
                        } </span> <br/>
                        <h5>{(this.state.account_type==="patient")?"Admitted Hospital ":"Working At "} :&nbsp;</h5> <span> {
                            (this.state.loading)?
                            <>
                                <div className="sk-flow" style={{marginTop: '-20px', marginLeft: '190px', marginBottom: '-36px', inlineSize: '30px', blockSize: '30px'}}>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                    <div className="sk-flow-dot"></div>
                                </div>
                            </>
                            :(this.state.admitted)?<a href={"/hospital?hd="+this.state.admitted.id}>{this.state.admitted.name}</a>:'None'
                        } </span> <br/>
                        </>:<></>}
                        <input type="button" className="btn btn-success mx-3 mt-4" style={{float: 'right'}} onClick={()=>{window.location.href='/update'}} value="Edit" />
                        <input type="button" className="btn btn-primary mx-3 mt-4" style={{float: 'right'}} onClick={()=>{window.location.href='/changepassword'}} value="Change Password" />
                    </div>
                </div>
                
            </div>
        )
    }
}



export default Profile
