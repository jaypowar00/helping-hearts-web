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
            get_page: (urlParams.has('pg'))?urlParams.get('pg'):1,
            order: '',
            search: '',
            active_dropdown: 'dp-default',
        }
        this.set_state_values = this.set_state_values.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.hospitalRef = React.createRef();
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

    onSearchHospital(sinput_id) {
        if(sinput_id==='dropdown-search-input'){
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
        let input_tag = document.getElementById(sinput_id);
        this.setState({
            search: input_tag.value
        }, ()=>{
            if (window.history.pushState) {
                const newURL = new URL(window.location.href);
                newURL.search = '?';
                window.history.pushState({ path: newURL.href }, '', newURL.href);
            }
            this.hospitalRef.current.set_search(this.state.search);
        });
    }

    onSortingChange(order, id) {
        let oldElement = document.getElementById(this.state.active_dropdown);
        oldElement.classList.remove('active');
        let sortElement = document.getElementById(id);
        sortElement.classList.add('active');
        let btnElement = document.getElementById('dropdown_sortby');
        btnElement.innerHTML = sortElement.innerHTML;
        this.setState({
            active_dropdown: id,
            order: order
        }, ()=>{
            this.hospitalRef.current.set_order(this.state.order);
        })
        document.getElementById('sidebar-search-input').value = "";
        document.getElementById('dropdown-search-input').value = "";
    }

    onRadioChange(e) {
        let input_tag1 = document.getElementById('sidebar-search-input');
        let input_tag2 = document.getElementById('dropdown-search-input');
        input_tag1.value = ''
        input_tag2.value = ''
        this.setState(
            {order: (e.target.value!=='default')?e.target.value:''
        }, ()=>{
            this.hospitalRef.current.set_order(this.state.order);
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
                panel.classList.toggle('panel-hide');
            }, 200);
        }else{
            panel.classList.toggle('panel-hide');
            panel.classList.toggle('panel-margin-top');
            panel.style.maxHeight = panel.scrollHeight + 'px';
        }
    }

    goToPage(page) {
        if (window.history.pushState) {
            const newURL = new URL(window.location.href);
            newURL.search = '?pg='+page;
            window.history.pushState({ path: newURL.href }, '', newURL.href);
        }
        this.setState({
            get_page: page
        }, ()=>{
            this.hospitalRef.current.set_order(this.state.order);
        });
        
        let input_tag1 = document.getElementById('sidebar-search-input');
        let input_tag2 = document.getElementById('dropdown-search-input');
        input_tag1.value = ''
        input_tag2.value = ''
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
                            <section className="panel panel-hide">
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
                                        <input id="dropdown-search-input" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                        <button onClick={()=>{this.onSearchHospital('dropdown-search-input');}} className="btn btn-success form-control my-2 my-sm-0" type="button">Search</button>
                                        </form>
                                    </div>
                                    {/*  */}
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
                                <li><span className="dropdown-item" onClick={()=>{this.onSortingChange('bed_a', 'dp-beds-a')}} id="dp-beds-a">Beds ↑</span></li>
                                <li><span className="dropdown-item" onClick={()=>{this.onSortingChange('bed_d', 'dp-beds-d')}} id="dp-beds-d">Beds ↓</span></li>
                                <li><span className="dropdown-item" onClick={()=>{this.onSortingChange('ven_a', 'dp-ven-a')}} id="dp-ven-a">Ventilators ↑</span></li>
                                <li><span className="dropdown-item" onClick={()=>{this.onSortingChange('ven_d', 'dp-ven-d')}} id="dp-ven-d">Ventilators ↓</span></li>
                                <li><span className="dropdown-item" onClick={()=>{this.onSortingChange('ox_a', 'dp-oxy-a')}} id="dp-oxy-a">Oxygens ↑</span></li>
                                <li><span className="dropdown-item" onClick={()=>{this.onSortingChange('ox_d', 'dp-oxy-d')}} id="dp-oxy-d">Oxygens ↓</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="sidebar p-3">
                        <div  className='mb-1'><b>Search:</b></div>
                        <input className='m-1' name='search' id="sidebar-search-input"/>
                        <button onClick={()=>{this.onSearchHospital('sidebar-search-input');}} style={{borderRadius: '17%'}}><i className="fas fa-search"></i></button>
                        <hr/>
                        <div className='mb-1'><b>Sort by:</b></div>
                        <label>
                            <input onClick={this.onRadioChange} className='mx-2' value="default" name='sort_radio' type='radio' ref={this.default_radio_ref}></input>
                            Default
                        </label>
                        <br/>
                        <label>
                            <input onClick={this.onRadioChange} className='mx-2' value="bed_a" name='sort_radio' type='radio'></input>
                            Beds ↑
                        </label>
                        <br/>
                        <label>
                            <input onClick={this.onRadioChange} className='mx-2' value="bed_d" name='sort_radio' type='radio'></input>
                            Beds ↓
                        </label>
                        <br/>
                        <label>
                            <input onClick={this.onRadioChange} className='mx-2' value="ven_a" name='sort_radio' type='radio'></input>
                            Ventilators ↑
                        </label>
                        <br/>
                        <label>
                            <input onClick={this.onRadioChange} className='mx-2' value="ven_d" name='sort_radio' type='radio'></input>
                            Ventilators ↓
                        </label>
                        <br/>
                        <label>
                            <input onClick={this.onRadioChange} className='mx-2' value="ox_a" name='sort_radio' type='radio'></input>
                            Oxygens ↑
                        </label>
                        <br/>
                        <label>
                            <input onClick={this.onRadioChange} className='mx-2' value="ox_d" name='sort_radio' type='radio'></input>
                            Oxygens ↓
                        </label>
                        <br/>
                    </div>
                    <div className="mt-4 hospitals-list" style={{float:'left'}}>
                        <div className='container mx-4 mb-3'><b>{this.state.total_hospitals} Hospitals found!</b></div>
                        <Hospitals ref={this.hospitalRef} get_page={this.state.get_page} set_state_values={this.set_state_values} />
                        <div className="container pagination">
                            <span onClick={() => {if(this.state.isPrev){this.goToPage(this.state.current_page-1)}}} style={(this.state.isPrev)?{cursor: 'pointer'}:{cursor: 'no-drop', display: 'none'}} ><i className="fas fa-step-backward my-3 mx-1 px-2 p-1"></i></span>
                            <small style={{marginTop: '17px'}}>
                            {   
                            (this.state.page_count!==0)?
                                (this.state.current_page===1 || this.state.current_page===2)?
                                    (this.state.page_count>=3)?
                                        [...Array(3)].map((x, i) => 
                                        (i+1===this.state.current_page)?
                                            <span key={i+1} className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}}>{i+1}</span>
                                        :
                                            <span key={i+1} onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1">{i+1}</span>)
                                    :(this.state.page_count>=2)?
                                        [...Array(2)].map((x, i) => 
                                        (i+1===this.state.current_page)?
                                            <span key={i+1} className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}}>{i+1}</span>
                                        :
                                            <span key={i+1} onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1">{i+1}</span>)
                                    :
                                        [...Array(1)].map((x, i) => 
                                        (i+1===this.state.current_page)?
                                            <span key={i+1} className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}}>{i+1}</span>
                                        :
                                            <span key={i+1} onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1">{i+1}</span>)
                                :((this.state.page_count-this.state.current_page)===0)?
                                    [...Array(3)].map((x, i) => 
                                    (i+1===this.state.current_page)?
                                        <span key={i+1} className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}}>{i+1}</span>
                                    :
                                        <span key={i+1} onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1">{i+1}</span>)
                                :(this.state.page_count-this.state.current_page>=1)?
                                    [...this.range(this.state.current_page-1, this.state.current_page+1)].map((x, i) => 
                                    (x===this.state.current_page)?
                                        <span key={i+1} className="rounded-circle bg-info mx-1 px-2 py-1" style={{cursor:"default"}}>{x}</span>
                                    :
                                        <span key={i+1} onClick={() => this.goToPage(i+1)} style={{cursor:"pointer"}} className="mx-1 px-2 py-1">{x}</span>)
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
                            <span onClick={() => {if(this.state.isNext){this.goToPage(this.state.current_page+1)}}} style={(this.state.isNext)?{cursor: 'pointer'}:{cursor: 'no-drop', display: 'none'}} ><i className="fas fa-step-forward my-3 mx-1 px-2 py-1"></i></span>
                        </div>
                    </div>
                </section>
            </>
        )
    }
}

export default Home