import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import '../Styles/mycss.css'

export class Update extends Component {

    constructor(props) {
        super(props);
    }
    

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

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
                            <a className="active" href="/">Home</a>               
                            <a href="/contact">Contact</a>
                            <a href="/about">About</a>                
                        </div>
                    </div>
                </div>   
                <div>

                
                </div>
            </div>          
        )
    }
}

export default Update
