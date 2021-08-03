import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'

export class ChangePassword extends Component {
    render() {
        return (          
            <div>
                <div>
                    <div class="header">
                        <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
                            <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                        </a>
                        <div class='project_name'><b>Helping Hearts</b></div>
                        <div class="header-right">
                            <a class="active" href="/">Home</a>               
                            <a href="/contact">Contact</a>
                            <a href="/about">About</a>                
                        </div>
                    </div>
                </div>   
            
                <div>
                    <h1>Password Change</h1>
                </div>
            </div>          
        )
    }
}

export default ChangePassword
