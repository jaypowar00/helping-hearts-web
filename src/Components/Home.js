import React, {PureComponent} from 'react'
import '../Styles/home.css'
import Hospitals from './hospitals'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import axios from 'axios';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.default_radio_ref = React.createRef();

        this.state = {
            page_count: 0,
            total_hospitals: 0,
            loggedin: false
        }
        this.set_state_values = this.set_state_values.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
        this.default_radio_ref.current.checked = true;
    }

    set_state_values(pcount, hcount, loggedin) {
        this.setState({
            page_count: pcount,
            total_hospitals: hcount,
            loggedin: loggedin
        });
    }

    onLogoutClick(e) {
        e.preventDefault();
        var access_token = this.getCookie('access_token');
        var csrf_token = this.getCookie('csrf_token');
        if(access_token!=null) {
            axios.post('https://helpinghearts-mraj.herokuapp.com/user/logout/', undefined, {headers: {'Authorization': 'Token '+access_token, 'X-CSRFToken': csrf_token}})
            .then(response=>{
                console.log(response);
                if(response.data.status){
                    alert('successfully logged out!');
                    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }else{
                    alert('something went wrong!');
                }
                window.location.href='/';
            }).catch(e=>{
                document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                alert('error!\n'+e);
                console.log(e);
                window.location.href = '/';
            });
        }else{
            alert('already logged out!');
            window.location.href='/';
        }
    }

    render() {
        return (
            <>
                <div class="header">
                    <a class="logo" href="/">
                        <img src={mylogo} alt="" height={50} width={50} style={{marginTop: '-20px', marginBottom: '-10px'}}/>
                    </a>
                    <div class='project_name'><b>Helping Hearts</b></div>
                    <div class="header-right">
                        <a className="active" href="/">Home</a>
                        {
                            (this.state.loggedin)?
                            <a href='/profile'>Profile</a>
                            :
                            <a href="/login">Login</a>
                        }
                        <a href="/contact">Contact</a>
                        <a href="/about">About</a>
                        {
                            (this.state.loggedin)?
                            <a href='/' onClick={this.onLogoutClick}>Logout</a>:<></>
                        }
                    </div>
                </div>
                <section style={{textAlign: 'left'}}>
                    <div className="sidebar p-3">
                        <div className='mb-1'><b>Search:</b></div>
                        <input className='m-1' name='search'/>
                        <button style={{borderRadius: '17%'}}><i class="fas fa-search"></i></button>
                        <hr/>
                        <div className='mb-1'><b>Sort by:</b></div>
                        <label>
                            <input className='mx-2' name='sort_radio' type='radio' ref={this.default_radio_ref}></input>
                            Default
                        </label>
                        <br/>
                        <label>
                            <input className='mx-2' name='sort_radio' type='radio'></input>
                            Beds ↑
                        </label>
                        <br/>
                        <label>
                            <input className='mx-2' name='sort_radio' type='radio'></input>
                            Beds ↓
                        </label>
                        <br/>
                        <label>
                            <input className='mx-2' name='sort_radio' type='radio'></input>
                            Ventilators ↑
                        </label>
                        <br/>
                        <label>
                            <input className='mx-2' name='sort_radio' type='radio'></input>
                            Ventilators ↓
                        </label>
                        <br/>
                        <label>
                            <input className='mx-2' name='sort_radio' type='radio'></input>
                            Oxygens ↑
                        </label>
                        <br/>
                        <label>
                            <input className='mx-2' name='sort_radio' type='radio'></input>
                            Oxygens ↓
                        </label>
                        <br/>
                    </div>
                    <div className = "mt-4" style={{float:'left'}}>
                        <div className='container mx-4 mb-3'><b>{this.state.total_hospitals} Hospitals found!</b></div>
                        <Hospitals set_state_values={this.set_state_values} />
                    </div>
                </section>
            </>
        )
    }
}

export default Home