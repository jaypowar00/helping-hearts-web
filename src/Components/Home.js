import React, {PureComponent} from 'react'
import '../Styles/home.css'
import Hospitals from './hospitals'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import axios from 'axios';

class Home extends PureComponent {
    constructor(props) {
        super(props);
        this.default_radio_ref = React.createRef();
        let urlParams = new URLSearchParams(window.location.search);
        this.state = {
            page_count: 0,
            current_page: 1,
            isNext: false,
            isPrev: false,
            total_hospitals: 0,
            loggedin: false,
            get_page: (urlParams.has('pg'))?urlParams.get('pg'):1
        }
        this.set_state_values = this.set_state_values.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
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
        this.default_radio_ref.current.checked = true;
    }

    set_state_values(pcount, cpage, hcount, loggedin, isNext, isPrev) {
        this.setState({
            page_count: pcount,
            current_page: cpage,
            total_hospitals: hcount,
            loggedin: loggedin,
            isNext: isNext,
            isPrev: isPrev
        });
    }

    onMenuBtnClick() {
        var MenuBtn = document.getElementById("menuBtn");
        MenuBtn.classList.toggle("active");
        var panel = MenuBtn.nextElementSibling.nextElementSibling.nextElementSibling;
        console.log(panel);
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
            window.setTimeout(() => {
                panel.classList.toggle('panel-margin-top');
            }, 200);
        }else{
            panel.classList.toggle('panel-margin-top');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    goToPage(page) {
        window.location.href = '/?pg='+page;
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
                    <div>
                        <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
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
                {/*  */}
                {/*  */}
                        </div>
                        <div className="header-right-mobile">
                            <button className="btn btn-success my-1" id="menuBtn" style={{float: 'right'}} onClick={this.onMenuBtnClick} ><i className="fas fa-bars"></i></button><br/><br/>
                            <section className="panel">
                                    {/*  */}
                                    <div className="navbar-collapse">
                                        <ul className="navbar-nav mr-auto">
                                        <li className="nav-item active">
                                            <a className="nav-link active" href="/">Home</a>
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
                                        {
                                            (this.state.loggedin)?
                                            <li className="nav-item">
                                                <a className="nav-link" href='/' onClick={this.onLogoutClick}>Logout</a>
                                            </li>:<></>
                                        }
                                        </ul>
                                        <form className="form-inline my-2 my-lg-0">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                        <button className="btn btn-success form-control my-2 my-sm-0" type="submit">Search</button>
                                        </form>
                                    </div>
                                    {/*  */}
                            </section>
                        </div>
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
                        <Hospitals get_page={this.state.get_page} set_state_values={this.set_state_values} />
                        <div className="container mx-5 pagination">
                            <span onClick={() => {if(this.state.isPrev){this.goToPage(this.state.current_page-1)}}} style={(this.state.isPrev)?{cursor: 'pointer'}:{cursor: 'no-drop'}} ><i className="fas fa-step-backward my-3 mx-1 px-2 py-1"></i></span>
                            <small className="my-3">
                            {   
                            (this.state.page_count!==0)?
                                (this.state.current_page===1 || this.state.current_page===2)?
                                    (this.state.page_count>=3)?
                                        [...Array(3)].map((x, i) => 
                                        (i+1===this.state.current_page)?
                                            <span className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}} id={i+1}>{i+1}</span>
                                        :
                                            <span onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1" id={i+1}>{i+1}</span>)
                                    :(this.state.page_count>=2)?
                                        [...Array(2)].map((x, i) => 
                                        (i+1===this.state.current_page)?
                                            <span className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}} id={i+1}>{i+1}</span>
                                        :
                                            <span onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1" id={i+1}>{i+1}</span>)
                                    :
                                        [...Array(2)].map((x, i) => 
                                        (i+1===this.state.current_page)?
                                            <span className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}} id={i+1}>{i+1}</span>
                                        :
                                            <span onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1" id={i+1}>{i+1}</span>)
                                :((this.state.page_count-this.state.current_page)===0)?
                                    [...Array(3)].map((x, i) => 
                                    (i+1===this.state.current_page)?
                                        <span className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}} id={i+1}>{i+1}</span>
                                    :
                                        <span onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1" id={i+1}>{i+1}</span>)
                                :(this.state.page_count-this.state.current_page>=1)?
                                    [...this.range(this.state.current_page-1, this.state.current_page+1)].map((x, i) => 
                                    (x===this.state.current_page)?
                                        <span className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}} id={i+1}>{x}</span>
                                    :
                                        <span onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1" id={i+1}>{x}</span>)
                                :<></>
                            :<></>
                            }
                            {
                            (this.state.page_count>3)?
                                (this.state.page_count-3===1)?
                                <></>
                                :(this.state.page_count-3===2)?
                                    [...this.range(this.state.page_count,this.state.page_count)].map((x, i) => 
                                    (x===this.state.current_page)?
                                        <span className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}} id={i+1}>{x}</span>
                                    :
                                        <span onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1" id={i+1}>{x}</span>)
                                :(this.state.page_count-3===3)?
                                    [...this.range(this.state.page_count-1,this.state.page_count)].map((x, i) => 
                                    (x===this.state.current_page)?
                                        <span className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}} id={i+1}>{x}</span>
                                    :
                                        <span onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1" id={i+1}>{x}</span>)
                                :(this.state.page_count-3>3)?
                                    <> &nbsp; . . . &nbsp; &nbsp;
                                    {
                                        [...this.range(this.state.page_count-2,this.state.page_count)].map((x, i) => 
                                        (x===this.state.current_page)?
                                            <span className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}} id={i+1}>{x}</span>
                                        :
                                            <span onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1" id={i+1}>{x}</span>)
                                    }
                                    </>
                                :<></>
                            :<></>
                            }
                            </small>
                            <span onClick={() => {if(this.state.isNext){this.goToPage(this.state.current_page+1)}}} style={(this.state.isNext)?{cursor: 'pointer'}:{cursor: 'no-drop'}} ><i className="fas fa-step-forward my-3 mx-1 px-2 py-1"></i></span>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Home