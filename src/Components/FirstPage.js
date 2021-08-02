import React, { Component } from 'react'
import mylogo from './CSS/HHLogo.jpg'
import pic from './CSS/pp1.jpg'
import {Link} from 'react-router-dom';


export class FirstPage extends Component {
    render() {
        return (
            <div >
                <div>
                    <div class="header">
                        <a class="logo"><img src={mylogo} alt="" height={50} width={50} /></a>
                        <div class='project_name'><b>Helping Hearts</b></div>
                        <div class="header-right">
                            <a class="active" href="/">Home</a>
                            <a href="/register">Register</a>
                            <a href="/contact">Contact</a>
                            <a href="/about">About</a>                
                        </div>
                    </div>
                </div>  

                <div>
                    <h1>Welcome to Helping Hearts!</h1> 
                    
                    <a ><img src={pic} alt="" height={400} width={800} /></a>
                </div>
            </div>
        )
    }
}

export default FirstPage
