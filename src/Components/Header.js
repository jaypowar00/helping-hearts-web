import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import {Link} from 'react-router-dom';
import About from './About';
import Contact from './FirstPage';


class Header extends Component {
    
    render() {
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
            </div>  
        )
    }
}

export default Header
