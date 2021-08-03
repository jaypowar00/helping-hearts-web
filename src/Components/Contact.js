import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'

class Contact extends Component {
    render() {
        return (

        <div>
            <div>
                <div className="header">
                    <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
                        <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                    </a>
                    <div className='project_name'><b>Helping Hearts</b></div>
                    <div className="header-right">
                        <a className="mx-1" href="/">Home</a>               
                        <a className="mx-1" href="/login">Login</a>               
                        <a className="active mx-1" href="/contact">Contact</a>
                        <a className="mx-1" href="/about">About</a>                
                    </div>
                </div>
            </div>  

            <div className="container my-3">
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
