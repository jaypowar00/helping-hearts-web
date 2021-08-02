import React from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'

function About() {
    return (
        <div>
                <div className="header">
                    <a className="logo mx-2" style={{borderRadius: '50%'}}>
                        <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                    </a>
                    <div className='project_name'><b>Helping Hearts</b></div>
                    <div className="header-right">
                        <a className="mx-1" href="/">Home</a>
                        <a className="mx-1" href="/login">Login</a>
                        <a className="mx-1" href="/contact">Contact</a>
                        <a className="active mx-1" href="/about">About</a>
                    </div>
                </div>
                <div>
                    <div className="mycard my-5 p-5" style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'start', cursor: 'default'}}>
                        <h5>About Helping Hearts :</h5>
                        <p>This is Helping-Hearts Project developed by team MRAJ with members Jay Powar, Ajay Powar, Manasi Shinde, Rohan Mane students of D.Y.Patil College Kolhapur.</p>
                        <p>This projects aims at creating a platform which will be helpfull to bridge the gap between mainly patients and hospitals along with their admit request management it also helps hospitals to get help from either ventilator providers or other coworkers for specific work!</p>
                        <p>This project is still under development and is being deployed just to showcase the teams development capabilities along with their skills.</p>
                        <br/>
                        <h5>Created by :</h5>
                        <p>
                            Rohan Mane [Backend Dev.]<br/>
                            Ajay Powar [Frontend Dev.]<br/>
                            Manasi Shinde [Frontend Dev.]<br/>
                            Jay Powar [Backend + Frontend Dev.]<br/>
                        </p>
                    </div>
                </div>
            </div> 
    )
}

export default About
