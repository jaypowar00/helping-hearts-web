import React, { Component } from 'react'
import mylogo from './CSS/HHLogo.jpg'

class ThankYou extends Component {
    render() {
        return (

        <div>
            <div>
                <div class="header">
                    <a class="logo" href="/"><img src={mylogo} alt="" height={50} width={50} /></a>
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
                    <h1>Thank You !</h1>
                </div>
            </div>
        </div>
        )
    }
}

export default ThankYou
