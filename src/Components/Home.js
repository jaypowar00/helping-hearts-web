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
                    console.log('successfully logged out!');
                    document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }else{
                    console.log('something went wrong!');
                }
            }).catch(e=>{
                document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                console.log(e);
                window.location.reload();
            }).finally(() => {
                window.location.reload();
            });
        }else{
            console.log('already logged out!');
            window.location.reload();
        }
    }

    render() {
        return (
            <>
                <div className="header">
                    <a className="logo mx-2" style={{borderRadius: '50%'}}>
                        <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                    </a>
                    <div className='project_name'><b>Helping Hearts</b></div>
                    <div className="header-right">
                        <a className="active mx-1" href="/">Home</a>
                        {
                            (this.state.loggedin)?
                            <a className="mx-1" href='/profile'>Profile</a>
                            :
                            <a className="mx-1" href="/login">Login</a>
                        }
                        <a className="mx-1" href="/contact">Contact</a>
                        <a className="mx-1" href="/about">About</a>
                        {
                            (this.state.loggedin)?
                            <a className="mx-1" href='/' onClick={this.onLogoutClick}>Logout</a>:<></>
                        }
                    </div>
                </div>
                <section style={{textAlign: 'left'}}>
                    <div className="sidebar p-3">
                        <div className='mb-1'><b>Search:</b></div>
                        <input className='m-1' name='search'/>
                        <button style={{borderRadius: '17%'}}><i className="fas fa-search"></i></button>
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
                    <div className="mt-4 hospitals-list" style={{float:'left'}}>
                        <div className='container mx-4 mb-3'><b>{this.state.total_hospitals} Hospitals found!</b></div>
                        <Hospitals set_state_values={this.set_state_values} />
                    </div>
                </section>
            </>
        )
    }
}

export default Home