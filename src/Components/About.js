import React, { Component } from 'react'
import '../Styles/mycss.css'
import mylogo from '../Styles/helpinghearts_logo.jpg'

class About extends Component {
    
    onMenuBtnClick() {
        var MenuBtn = document.getElementById("menuBtn");
        MenuBtn.classList.toggle("active");
        var panel = MenuBtn.nextElementSibling.nextElementSibling.nextElementSibling;
        console.log(panel);
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
            window.setTimeout(() => {
                panel.classList.toggle('panel-margin-top');
                panel.classList.toggle('panel-hide');
            }, 200);
        }else{
            panel.classList.toggle('panel-hide');
            panel.classList.toggle('panel-margin-top');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    render() {
        return (
            <div>
                    <div className="header">
                        <div>
                            <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
                                <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                            </a>
                            <div className='project_name'><b>Helping Hearts</b></div>
                            <div className="header-right">
                                <a className="mx-1" href="/">Home</a>
                                <a className="mx-1" href="/login">Login</a>
                                <a className="mx-1" href="/contact">Contact</a>
                                <a className="active mx-1" href="/about">About</a>
                            </div>
                            <div className="header-right-mobile">
                                <button className="btn btn-success my-1" id="menuBtn" style={{float: 'right'}} onClick={this.onMenuBtnClick} ><i className="fas fa-bars"></i></button><br/><br/>
                                <section className="panel panel-hide">
                                        <div className="navbar-collapse">
                                            <ul className="navbar-nav mr-auto">
                                            <li className="nav-item active">
                                                <a className="nav-link" href="/">Home</a>
                                            </li>
                                            <li className="nav-item">
                                            <a className="nav-link" href="/login">Login</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="nav-link" href="/contact">Contact</a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="active nav-link" href="/about">About</a>
                                            </li>
                                            </ul>
                                        </div>
                                </section>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="aboutpg" >
                            <h5>About Helping Hearts :</h5>
                            <p>&emsp;&emsp;This is Helping-Hearts Project developed by team MRAJ with members Jay Powar, Ajay Powar, Manasi Shinde, Rohan Mane students of D.Y.Patil College Kolhapur.</p>
                            <p>&emsp;&emsp;This projects aims at creating a platform which will be helpfull to bridge the gap between mainly patients and hospitals along with their admit request management it also helps hospitals to get help from either ventilator providers or other coworkers for specific work!</p>
                            <p>&emsp;&emsp;This project is still under development and is being deployed just to showcase the teams development capabilities along with their skills.</p>
                            <br/>
                            <h5>Created by :</h5>
                            <span className="names">
                                Rohan Mane [Backend + FrontEnd Dev.]<br/>
                                Ajay Powar [Frontend Dev.]<br/>
                                Manasi Shinde [Frontend Dev.]<br/>
                                Jay Powar [Backend + Frontend Dev.]<br/>
                            </span>
                        </div>
                    </div>
                </div> 
        )
    }
}

export default About
