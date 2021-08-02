import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'

export class ChangePassword extends Component {
    render() {
        return (          
            <div>
                <div>
                    <div class="header">
                        <a class="logo" href="/"><img src={mylogo} alt="" height={50} width={50} style={{marginTop: '-20px', marginBottom: '-10px'}}/></a>
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
