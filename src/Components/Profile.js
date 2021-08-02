import React, { Component } from 'react'
import mylogo from './CSS/HHLogo.jpg'
import axios from 'axios'

export class Profile extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             name: "",
             address: "",
             phone : "",
             email : "",
             username : ""
        }

    }

    componentDidMount(){
   
        console.log(document.cookie)

        axios.get('https://helpinghearts-mraj.herokuapp.com/user/',{
            headers : {
                'Authorization' : `token${access_token}`
            }
        })
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log(error)
        })

        this.setState({
            name: "",
            address: "",
            phone : "",
            email : "",
            username : ""
        })
        
    }

    render() {    
         
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
                <div>
                    <h1>Profile</h1>
                    <div>
                        Name : {this.name}
                    </div>
                    <div>
                        Address : {this.address}
                    </div>
                    <div>
                        Phone Number : {this.phone}
                    </div>
                    <div>
                        Email : {this.email}
                    </div>
                    <div>
                        Username : {this.username}
                    </div>
                        <p>Want to update your profile?
                        <a href="/update">Update Profile</a>
                        </p>

                        <p>Want to change your password?
                        <a href="/changepassword">Change Password</a>
                        </p>
                </div>
                
            </div>
        )
    }
}



export default Profile
