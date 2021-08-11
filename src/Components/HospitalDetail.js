import axios from 'axios'
import React, { Component } from 'react'
import mylogo from '../Styles/helpinghearts_logo.jpg'
import '../Styles/mycss.css'
import { refreshToken } from '../utils/tokenRefresh'

export class HospitalDetail extends Component {

    constructor(props) {
        super(props)
        let urlParams = new URLSearchParams(window.location.search);
        this.state = {
            loading: true,
            hdUrl: false,
            id: (urlParams.has('hd'))?urlParams.get('hd'):0,
            corona_count: 0,
            beds: 0,
            ventilators: 0,
            oxygens: 0,
            accepting_patients: false,
            accepting_coworkers: false,
            accepting_doctors: false,
            accepting_nurses: false,
            need_ventilator: false,
            ventilators_requirement: 0,
            workers_requirement: 0,
            doctors_requirement: 0,
            nurses_requirement: 0,
            email: "",
            name: "",
            phone: "",
            address: "",
            pincode: "",
            account_type: 0,
            about: "",
            date_joined: "",
            loggedIn: false,
            file: null,
        }
        this.ctscanRef = React.createRef();
        this.bedTypeRef = React.createRef();
        this.onMenuBtnClick = this.onMenuBtnClick.bind(this);
        this.getCookie = this.getCookie.bind(this);
        this.onLogoutClick = this.onLogoutClick.bind(this);
        this.onFileSelect = this.onFileSelect.bind(this);
        this.getBase64 = this.getBase64.bind(this);
        this.onAdmitRequestSubmit = this.onAdmitRequestSubmit.bind(this);
    }

    getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL = "";
          // Make new FileReader
          let reader = new FileReader();
    
          // Convert the file to base64 text
          reader.readAsDataURL(file);
    
          // on reader load somthing...
          reader.onload = () => {
            // Make a fileInfo Object
            console.log("Called", reader);
            baseURL = reader.result;
            console.log(baseURL);
            resolve(baseURL);
          };
          console.log(fileInfo);
        });
      };

    onFileSelect(e){
        let file = e.target.files[0];
        this.getBase64(file)
        .then(result => {
            this.setState({
                file: result
            },
            ()=>{console.log(this.state.file)}
            );
        })
    }

    componentDidMount() {
        let urlParams = new URLSearchParams(window.location.search);
        var access_token = this.getCookie('access_token');
        if(access_token){
            axios.get('https://helpinghearts-mraj.herokuapp.com/user/',{
                headers : {
                    'Authorization' : `token `+access_token
                }
            })
            .then(response=>{
                console.log(response)
                if(response.data.status){
                    this.setState({
                        loggedIn: true,
                        account_type: response.data.user.account_type
                    })
                }
            })
            .catch(error=>{
                console.log(error)
                if(error.response.data.detail === "access token expired!"){
                    refreshToken();
                }
            })
        }
        if(urlParams.has('hd')){
            axios.get('https://helpinghearts-mraj.herokuapp.com/api/get-hospital/?hid='+urlParams.get('hd'))
            .then(response => {
                console.log(response);
                if(response.data.status){
                    let hospital = response.data.hospital;
                    this.setState({
                        hdUrl: true,
                        loading: false,
                        name: hospital.name,
                        email: hospital.email,
                        corona_count: hospital.corona_count,
                        beds: hospital.beds,
                        ventilators: hospital.ventilators,
                        oxygens: hospital.oxygens,
                        phone: hospital.phone,
                        pincode: hospital.pincode,
                        address: hospital.address,
                        date_joined: hospital.date_joined,
                        about: (hospital.about!=="")?hospital.about:"not provided by Hospital",
                        accepting_patients: hospital.accepting_patients,
                        accepting_coworkers: hospital.accepting_coworkers,
                        accepting_doctors: hospital.accepting_doctors,
                        accepting_nurses: hospital.accepting_nurses,
                        need_ventilator: hospital.need_ventilator,
                        ventilators_requirement: hospital.ventilators_requirement,
                        workers_requirement: hospital.workers_requirement,
                        doctors_requirement: hospital.doctors_requirement,
                        nurses_requirement: hospital.nurses_requirement,
                    })
                }
            })
        }else{
            this.setState({
                hdUrl: false,
                loading: false
            })
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
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

    onAdmitRequestSubmit(e){
        let access_token = this.getCookie('access_token');
        if(access_token!=null){
            e.preventDefault();
            let admitData = {
                ct_scan_score: this.ctscanRef.current.value,
                ct_scan_document: this.state.file,
                bed_type: this.bedTypeRef.current.value
            }
            axios.post('https://helpinghearts-mraj.herokuapp.com/user/update/', admitData, {
                withCredentials: true,
                headers: {
                    'Authorization': `Token `+access_token
                }
            }).then(response=>{
                if(response.data.status){
                    alert('data uploaded!');
                    axios.post('https://helpinghearts-mraj.herokuapp.com/api/patient/submit-request/', {hid: this.state.id}, {
                        withCredentials: true,
                        headers: {
                            'Authorization': `Token `+access_token
                        }
                    }).then(response2 => {
                        if(response2.data.status){
                            alert('requested submitted!');
                        }else{
                            alert('error!\n'+response2.data.message);
                        }
                    }).catch(error=>{
                        console.log(error);
                    })
                }else{
                    if(response.data.status===false)
                    alert('something went wrong!\n'+response.data.message);
                    else
                    alert('something went wrong!\nTry again later');
                }
            }).catch(e=>{
                console.log('Error:\n'+e);
                // window.location.href='/profile';
            }).finally(()=>{
                let closeBtn = document.getElementById('requestFormCloseBtn');
                closeBtn.click();
            })
        }else{
            alert('not logged in!');
            let closeBtn = document.getElementById('requestFormCloseBtn');
            closeBtn.click();
        }
    }
    
    render() {
        let date = (this.state.date_joined!=="")?new Date(this.state.date_joined): new Date();
        return (
            <div>
                <div className="modal fade" id="mymodal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    {/* <div class="modal-dialog"> */}
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ModalLabel">Confirm Action</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {
                                (this.state.account_type!=='patient')?
                                <span>Are you sure want to submit a work request?</span>:
                                <div className="form">
                                    <form id="form1" onSubmit={this.onAdmitRequestSubmit}>
                                        <span style={{display: 'block'}}>
                                        <label className="form-control-label mb-2" style={{marginRight: '5px'}} htmlFor="bed_type">Bed Type:</label>
                                        <select className="selectopt"  id="bed_type" ref={this.bedTypeRef} onChange={this.onAccountChange}>
                                            <option value={1} >Bed</option>
                                            <option value={2} >Bed + Ventilator</option>
                                            <option value={3} >Bed + Oxygen</option>
                                        </select>
                                        </span>
                                        <label htmlFor="ctscore" className="form-control-label">CT Scan Score:</label>
                                        <input id="ctscore" className="form-control mb-2" ref={this.ctscanRef} name="ctscore" onInput={(e)=>e.target.setCustomValidity('')} onInvalid={(e)=>{e.target.setCustomValidity('Please provide CT Scan Score!');}} required/>
                                        <label htmlFor="ctfile" className="form-control-label">CT Scan Document:</label>
                                        <input id="ctfile" type="file" className="form-control mb-2" onInput={(e)=>e.target.setCustomValidity('')} onInvalid={(e)=>{e.target.setCustomValidity('Please provide CT Scan document!');}} onChange={this.onFileSelect} required/>
                                        <p>document preview:</p>
                                        <img src={this.state.file} className="mb-2" alt="preview.png" width={'100px'} style={{backgroundColor: 'lightgrey'}}/>
                                    </form>
                                </div>
                            }
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="requestFormCloseBtn" className="btn btn-secondary" data-bs-dismiss="modal">Cancle</button>
                            {
                                (['coworker','doctor','nurse'].includes(this.state.account_type))?
                                <button type="button" className="btn btn-success">Submit</button>
                                :(this.state.account_type==='patient')?
                                <button type="submit" form="form1" className="btn btn-success">Submit</button>
                                :<></>
                            }
                        </div>
                        </div>
                    </div>
                </div>
                <div>
                <div className="header">
                    <div>
                        <a href="/" className="logo mx-2" style={{borderRadius: '50%'}}>
                            <img src={mylogo} alt="" height={50} width={50} onClick={()=>{window.location.href='/'}} style={{borderRadius: '50%', marginTop: '-20px', marginBottom: '-15px', marginLeft: '-15px', marginRight: '-15px'}}/>
                        </a>
                        <div className='project_name'><b>Helping Hearts</b></div>
                        <div className="header-right">
                            <a className="mx-1" href="/">Home</a>
                            {
                                (this.state.loggedIn)?
                                <a className="mx-1" href="/profile">Profile</a>
                                :
                                <a className="mx-1" href="/login">Login</a>
                            }
                            <a className="mx-1" href="/contact">Contact</a>
                            <a className="mx-1" href="/about">About</a>
                            {
                                (this.state.loggedIn)?
                                <a className="mx-1" href="/contact/#" onClick={this.onLogoutClick}>Logout</a>
                                :<></>
                            }
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
                                            {
                                                (this.state.loggedIn)?
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
                                            (this.state.loggedIn)?
                                            <li className="nav-item">
                                                <a className="nav-link" href="/contact/#" onClick={this.onLogoutClick}>Logout</a>
                                            </li>

                                            :<></>
                                        }
                                        </ul>
                                    </div>
                            </section>
                        </div>
                    </div>
                </div>
                </div>
                <div className="container">
                    <div className="hospitalDetailContainer" style={{width: '70vw', minWidth: '300px', margin: '20px auto'}}>
                        {
                            (this.state.loading===false && this.state.hdUrl)?
                                <span className={(this.state.accepting_patients)?"badge bg-success no-txt-cursor non-selectable":"badge bg-danger no-txt-cursor non-selectable"} style={{float: 'right', marginRight: '15px', marginTop: '15px'}}>available</span>
                            :<></>
                        }
                        <div className="rounded detail">
                            {
                                (this.state.hdUrl)?
                                <>
                                    <h3 className="pb-1 mt-2">{this.state.name}</h3><hr className="detailHR" style={{width: '69.5vw', minWidth: '295px', marginLeft: '-57px'}}/>
                                    <span className="badge bg-info m-1 no-txt-cursor non-selectable">{this.state.beds} beds</span>
                                    <span className="badge bg-info m-1 no-txt-cursor non-selectable">{this.state.ventilators} ventilators</span>
                                    <span className="badge bg-info m-1 no-txt-cursor non-selectable">{this.state.oxygens} oxygens</span>
                                    <span className="badge bg-danger m-1 no-txt-cursor non-selectable">{this.state.corona_count} covid patients</span><br/>
                                    <span style={{marginRight: '10px', display: 'inline-block'}}><i className="fas fa-envelope-square fa-lg m-1"></i><a href={"mailto:"+this.state.email}>{this.state.email}</a></span>
                                    <span style={{display: 'inline-block'}}><i className="fas fa-phone-square-alt fa-lg m-1 my-3"></i><a href={"tel:"+this.state.phone}>{this.state.phone}</a></span><br/>
                                    <div style={{textAlign: 'left'}}>
                                        <span className="my-2" style={{display: 'inline-block'}} ><b>Address : </b> {this.state.address} </span> <br/>
                                        <span className="my-2" style={{display: 'inline-block'}} ><b>Pincode :</b> {this.state.pincode} </span> <br/>
                                        <span className="my-2" style={{display: 'inline-block'}} ><b>About :</b> {this.state.about} </span> <br/>
                                        <span className="my-2" style={{display: 'inline-block'}} ><b>Joined Date :</b> {date.toLocaleDateString()} </span> <br/>
                                        {
                                            (this.state.loggedIn && this.state.account_type!=='patient')?
                                            <>
                                                <span className="mt-2" style={{display: 'block'}}><b>Requirement:</b></span>
                                                <span style={{fontSize: '13px'}} className={(this.state.accepting_coworkers)?"p-2 badge bg-success m-1 no-txt-cursor non-selectable":"p-2 badge bg-danger m-1 no-txt-cursor non-selectable"}>Co-Workers {(this.state.accepting_coworkers)?<span className="badge bg-secondary" style={{fontSize: '10px', marginLeft: '5px'}}>{this.state.workers_requirement}</span>:""}</span>
                                                <span style={{fontSize: '13px'}} className={(this.state.accepting_doctors)?"p-2 badge bg-success m-1 no-txt-cursor non-selectable":"p-2 badge bg-danger m-1 no-txt-cursor non-selectable"}>Doctors {(this.state.accepting_doctors)?<span className="badge bg-secondary" style={{fontSize: '10px', marginLeft: '5px'}}>{this.state.doctors_requirement}</span>:""}</span>
                                                <span style={{fontSize: '13px'}} className={(this.state.accepting_nurses)?"p-2 badge bg-success m-1 no-txt-cursor non-selectable":"p-2 badge bg-danger m-1 no-txt-cursor non-selectable"}>Nurses {(this.state.accepting_nurses)?<span className="badge bg-secondary" style={{fontSize: '10px', marginLeft: '5px'}}>{this.state.nurses_requirement}</span>:""}</span>
                                                <span style={{fontSize: '13px'}} className={(this.state.need_ventilator)?"p-2 badge bg-success m-1 no-txt-cursor non-selectable":"p-2 badge bg-danger m-1 no-txt-cursor non-selectable"}>Ventilators {(this.state.need_ventilator)?<span className="badge bg-secondary" style={{fontSize: '10px', marginLeft: '5px'}}>{this.state.ventilators_requirement}</span>:""}</span><br/>                                    </>
                                            :<></>
                                        }
                                    </div>
                                    <button type="button" style={(this.state.loggedIn && this.state.account_type!=='hospital' && this.state.account_type!=='ventilator provider')?{}:{display: 'none'}} className="btnn" data-bs-toggle="modal" data-bs-target="#mymodal">
                                    Request
                                    </button><br/>
                                </>
                                :
                                <>
                                    <h3 className="pb-1 mt-2">{(this.state.loading)?"Loading Data ...":"Invalid URL"}</h3><hr style={{width: '69.5vw', minWidth: '295px', marginLeft: '-57px'}}/>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default HospitalDetail
