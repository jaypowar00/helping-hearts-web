import React from 'react'
import mylogo from './CSS/HHLogo.jpg'

function About() {
    return (
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
                <div>
                    <h1>About Helping Hearts</h1>
                    <h2>Created by :</h2>
                    <p>
                        Ajay Powar<br/>
                        Jay Powar<br/>
                        Manasi Shinde<br/>
                        Rohan Mane<br/>
                    </p>
                </div>
            </div> 
    )
}

export default About
