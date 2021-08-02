import React, { Component } from 'react'
import mylogo from './CSS/HHLogo.jpg'

class Contact extends Component {
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

            <div className="container">
                <div className="card">
                    <h1>Contact Us at :</h1>
                    <p>
                        Manasi Shinde<br/>
                        manasi0019@gmail.com
                    </p>
                </div>
            </div>
        </div>
        )
    }
}

export default Contact
