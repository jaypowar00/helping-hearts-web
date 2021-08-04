import axios from 'axios';
import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import '../Styles/mycss.css'

export class Update extends Component {

    constructor(props) {
        super(props);
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
        this.state = {
            name: '',
            age: '',
            gender: '',
            phone: '',
            address: '',
            pincode: '',
            about: '',
        }
        this.onNameChange = this.onNameChange.bind(this);
        this.onAgeChange = this.onAgeChange.bind(this);
        this.onGenderChange = this.onGenderChange.bind(this);
        this.onPhoneChange = this.onPhoneChange.bind(this);
        this.onAddressChange = this.onAddressChange.bind(this);
        this.onPincodeChange = this.onPincodeChange.bind(this);
        this.onAboutChange = this.onAboutChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onNameChange(e) {
        this.setState({
            name: e.target.value
        });
    }
    onPincodeChange(e) {
        this.setState({
            pincode: e.target.value
        });
    }
    onAboutChange(e) {
        this.setState({
            about: e.target.value
        });
    }
    onAgeChange(e) {
        this.setState({
            age: e.target.value
        });
    }
    onGenderChange(e) {
        this.setState({
            gender: e.target.value
        });
    }
    onPhoneChange(e) {
        this.setState({
            phone: e.target.value
        });
    }
    onAddressChange(e) {
        this.setState({
            address: e.target.value
        });
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

    componentDidMount() {
        let access_token = this.getCookie('access_token');
        if(access_token!==null){
            axios.get('https://helpinghearts-mraj.herokuapp.com/user/',{
                headers : {
                    'Authorization' : `token `+access_token
                }
            }).then(response => {
                console.log(response);
                this.setState({
                    name: response.data.user.name,
                    age: response.data.user.detail.age,
                    gender: response.data.user.detail.gender,
                    phone: response.data.user.phone,
                    address: response.data.user.address,
                    pincode: response.data.user.pincode,
                    about: response.data.user.about
                });
            })
        }else{
            window.location.href='/login';
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let access_token = this.getCookie('access_token');
        let csrf_token = this.getCookie('csrf_token');
        if(access_token!==null && csrf_token!==null){
            axios.post('https://helpinghearts-mraj.herokuapp.com/user/update', this.state, {
                headers: {
                    'Authorization': `Token `+access_token,
                    'X-CSRFToken': csrf_token
                }
            }).then(response=>{
                if(response.data.status){
                    window.location.href='/profile';
                }else{
                    if(response.data.status===false)
                        alert('something went wrong!\n'+response.data.message);
                    else
                        alert('something went wrong!\nTry again later');
                }
            }).catch(e=>{
                // alert('Error:\n'+e);
                // window.location.href='/profile';
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
                <form onSubmit={this.onSubmit}>
                    
                    <div className="edit-form">
                        <h1>Edit Your Information</h1>
                        <input type='text' placeholder='Enter Name' onChange={this.onNameChange} name="name" value={this.state.name} id="name" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Name')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Age' onChange={this.onAgeChange} name="age" value={this.state.age} id="age" required onInvalid={(e) => e.target.setCustomValidity('Please Enter age')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Gender' onChange={this.onGenderChange} name="gender" value={this.state.gender} id="gender" required onInvalid={(e) => e.target.setCustomValidity('Please Enter gender')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Phone number'onChange={this.onPhoneChange}  name="ph-number" value={this.state.phone} id="ph-number" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Phone Number')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Address' onChange={this.onAddressChange} name="email" value={this.state.address} id="address" required onInvalid={(e) => e.target.setCustomValidity('Please Enter address')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter Pincode'onChange={this.onPincodeChange}  name="pincode" value={this.state.pincode} id="pincode" required onInvalid={(e) => e.target.setCustomValidity('Please Enter Pincode')} onInput={(e)=>e.target.setCustomValidity('')}/><br/>
                        <input type='text' placeholder='Enter About' onChange={this.onAboutChange} name="about" value={this.state.about} id="about" /><br/>
                        <button type='submit' className="btnn" value="Login" >Update</button><br/>
                    </div>
                </form>
                </div>
            </div>          
        )
    }
}

export default Update
