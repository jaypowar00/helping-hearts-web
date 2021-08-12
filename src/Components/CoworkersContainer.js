import React, {PureComponent} from 'react'
import '../Styles/home.css'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import axios from 'axios';
import Coworkers from './coworkers';

class CoworkersContainer extends PureComponent {
    constructor(props) {
        super(props);
        let urlParams = new URLSearchParams(window.location.search);
        this.state = {
            total_coworkers: 0,
            loggedin: false,
            order: (urlParams.has('or'))?urlParams.get('or'):'',
            active_dropdown: 'dp-default',
        }
        this.set_state_values = this.set_state_values.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
        this.CoworkerRef = React.createRef();
        this.default_radio_ref = React.createRef();
    }

    range(start, end) {
        return Array(end - start + 1).fill().map((_, idx) => start + idx)
      }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
        // this.default_radio_ref.current.checked = true;
    }

    set_state_values(ccount, loggedin) {
        this.setState({
            total_coworkers: ccount,
            loggedin: loggedin,
        });
    }

    // onSortingChange(order, id) {
    //     let oldElement = document.getElementById(this.state.active_dropdown);
    //     oldElement.classList.remove('active');
    //     let sortElement = document.getElementById(id);
    //     sortElement.classList.add('active');
    //     let btnElement = document.getElementById('dropdown_sortby');
    //     btnElement.innerHTML = sortElement.innerHTML;
    //     this.setState({
    //         active_dropdown: id,
    //         order: order
    //     }, ()=>{
    //         this.CoworkerRef.current.set_order(this.state.order);
    //     })
    // }

    // onRadioChange(e) {
    //     this.setState(
    //         {order: (e.target.value!=='default')?e.target.value:''
    //     }, ()=>{
    //         this.CoworkerRef.current.set_order(this.state.order);
    //     });
    // }

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
                    document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                }else{
                    console.log('something went wrong!');
                }
            }).catch(e=>{
                document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
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
                    <div>
                        <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
                            <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                        </a>
                        <div className='project_name'><b>Helping Hearts</b></div>
                        <div className="header-right">
                            <a className="mx-1" href="/">Home</a>
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
                        <div className="header-right-mobile">
                            <button className="btn btn-success my-1" id="menuBtn" style={{float: 'right'}} onClick={this.onMenuBtnClick} ><i className="fas fa-bars"></i></button><br/><br/>
                            <section className="panel panel-hide">
                                    <div className="navbar-collapse">
                                        <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <a className="nav-link" href="/">Home</a>
                                        </li>
                                        <li className="nav-item">
                                        {
                                            (this.state.loggedin)?
                                            <a className="nav-link" href="/profile">Profile</a>
                                            :
                                            <a className="nav-link" href="/login">Login</a>
                                        }
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/contact">Contact</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/about">About</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/patients">Admit Requests</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/patients/admitted">Admitted Patients</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link active" href="/coworkers">Work Requests</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="/coworkers/working">Working CoWorkers</a>
                                        </li>
                                        {
                                            (this.state.loggedin)?
                                            <li className="nav-item">
                                                <a className="nav-link" href='/' onClick={this.onLogoutClick}>Logout</a>
                                            </li>:<></>
                                        }
                                        </ul>
                                    </div>
                            </section>
                        </div>
                    </div>
                </div>
                <section style={{textAlign: 'left'}}>
                    <div className="dropdown-sorting" style={{float: 'right', marginBottom: '-60px', marginTop: '10px', marginRight: '10px'}}>
                        <div className="dropdown">
                            <span className="mx-2 px-1" style={{fontSize: '13px', fontWeight: 'bold'}}>sort by:</span>
                            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdown_sortby" data-bs-toggle="dropdown" aria-expanded="false">
                                Default
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdown_sortby">
                                <li><span className="dropdown-item active" onClick={()=>{this.onSortingChange('', 'dp-default')}} id="dp-default">Default</span></li>
                                <li><span className="dropdown-item" onClick={()=>{this.onSortingChange('ct_a', 'dp-ct-a')}} id="dp-ct-a">CT Scan Score ↑</span></li>
                                <li><span className="dropdown-item" onClick={()=>{this.onSortingChange('ct_d', 'dp-ct-d')}} id="dp-ct-d">CT Scan Score ↓</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar p-3">
                        <div className='mb-1'><b>Navigate To:</b></div>
                        <hr/>
                            <a className="badge bg-info" style={{fontSize: '16px', textDecoration: 'none'}} href="/patients">Admit Requests</a><br/>
                            <a className="mt-2 badge bg-info" style={{fontSize: '16px', textDecoration: 'none'}} href="/patients/admitted">Admitted Patients</a><br/>
                            <a className="mt-2 badge bg-info" style={{fontSize: '16px', textDecoration: 'none'}} href="/coworkers/working">Working CoWorkers</a><br/>
                    </div>
                    <div className="mt-4 hospitals-list" style={{float:'left'}}>
                        <div className='container mx-4 mb-3'><b>{this.state.total_coworkers} Requests Found!</b></div>
                        <Coworkers ref={this.CoworkerRef} set_state_values={this.set_state_values} />
                    </div>
                </section>
            </>
        )
    }
}

export default CoworkersContainer