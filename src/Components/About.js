import React from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'

function About() {
    return (
        <div>
                <div className="header">
                    <a className="logo" href="/"><img src={mylogo} alt="" height={50} width={50} style={{marginTop: '-20px', marginBottom: '-10px'}}/></a>
                    <div className='project_name'><b>Helping Hearts</b></div>
                    <div className="header-right">
                        <a href="/">Home</a>
                        <a href="/login">Login</a>
                        <a href="/contact">Contact</a>
                        <a className="active" href="/about">About</a>
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
