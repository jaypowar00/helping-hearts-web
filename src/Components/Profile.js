import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import axios from 'axios'

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
             gender: ""
        }

    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount(){
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
                        name: response.data.user.name,
                        address: response.data.user.address,
                        phone: response.data.user.phone,
                        email: response.data.user.email,
                        username: response.data.user.username,
                        age: response.data.user.detail.age,
                        gender: response.data.user.detail.gender,
                    })
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }else{
            alert('Not logged in!\nPlease log in again!');
            window.location.href='/login';
        }

        
    }

    render() {    
         
        return (
            <div>
            
                <div>
                    <div className="header mb-3">
                        <a className="logo" href="/"><img src={mylogo} alt="" height={50} width={50} style={{marginTop: '-20px', marginBottom: '-10px'}}/></a>
                        <div className='project_name'><b>Helping Hearts</b></div>
                        <div className="header-right">
                            <a className="active" href="/">Home</a>               
                            <a href="/contact">Contact</a>
                            <a href="/about">About</a>                
                        </div>
                    </div>
                </div>  
                <div>
                        {
                            (this.state.username)?
                            <h1>Welcome back {this.state.username}!</h1>:<h1>Loading...</h1>
                        }
                    <div className="container card profile-div p-5 m-2" style={{textAlign: 'left'}}>
                        <h5>Name : &nbsp; </h5> <span> {this.state.name} </span> <br/>
                        <h5>Email : &nbsp; </h5> <span> {this.state.email} </span> <br/>
                        <h5>Age : &nbsp; </h5> <span> {this.state.age} </span> <br/>
                        <h5>Gender : &nbsp; </h5> <span> {this.state.gender} </span> <br/>
                        <h5>Phone : &nbsp; </h5> <span> {this.state.phone} </span> <br/>
                        <h5>Address : &nbsp; </h5> <span> {this.state.address} </span> <br/>
                        <input type="button" className="btn btn-success mx-3 mt-4" style={{float: 'right'}} onClick={()=>{window.location.href='/update'}} value="Edit" />
                        <input type="button" className="btn btn-primary mx-3 mt-4" style={{float: 'right'}} onClick={()=>{window.location.href='/changepassword'}} value="Change Password" />
                    </div>
                </div>
                
            </div>
        )
    }
}



export default Profile
