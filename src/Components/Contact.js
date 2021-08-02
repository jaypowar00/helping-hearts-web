import React, { Component } from 'react'
import mylogo from './CSS/HHLogo.jpg'

class Contact extends Component {
    render() {
        return (

        <div>
            <div>
                <div className="header">
                    <a className="logo"><img src={mylogo} alt="" height={50} width={50} style={{marginTop: '-20px', marginBottom: '-10px'}}/></a>
                    <div className='project_name'><b>Helping Hearts</b></div>
                    <div className="header-right">
                        <a href="/">Home</a>               
                        <a href="/login">Login</a>               
                        <a className="active" href="/contact">Contact</a>
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
