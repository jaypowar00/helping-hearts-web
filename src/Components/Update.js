import React, { Component } from 'react'
import mylogo from './CSS/HHLogo.jpg'

export class Update extends Component {
    render() {
        return (          
            <div>
                <div>
                    <div className="header">
                        <a className="logo" href="/"><img src={mylogo} alt="" height={50} width={50} /></a>
                        <div className='project_name'><b>Helping Hearts</b></div>
                        <div className="header-right">
                            <a className="active" href="/">Home</a>               
                            <a href="/contact">Contact</a>
                            <a href="/about">About</a>                
                        </div>
                    </div>
                </div>   
            
                <div>
                    <h1>Update Page</h1>
                </div>
            </div>          
        )
    }
}

export default Update
