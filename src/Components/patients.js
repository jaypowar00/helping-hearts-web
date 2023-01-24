import axios from 'axios'
import React, {PureComponent} from 'react'

class Patients extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            patients : [],
            loading: true,
            accountType: 0
        }
        this.onCollapseClick = this.onCollapseClick.bind(this);
        this.onResponseRequest = this.onResponseRequest.bind(this);
        this.getRequestedPatients = this.getRequestedPatients.bind(this);
    }

    /**
     * &nbsp;
     * @param {number} pid patient's id
     * @param {boolean} accept request accepted or rejected status
     */
    onResponseRequest(pid, accept){
        var access_token = this.getCookie("access_token");
        if(access_token!=null){

            axios.post('https://helpinghearts-mraj.onrender.com/api/patient/answer-request/', {pid: pid, accept: accept}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Token `+access_token
                }
            }).then(response => {
                if(response.data.status){
                    (accept)?alert('request successfully accepted!'):alert('request successfully declined!');
                    this.getRequestedPatients();
                }else{
                    alert('action failed!\n'+response.data.message);
                }
            }).catch(error=>{
                (error.response && error.response.data)?alert('Error!\n'+error.response.data.detail):alert('Error!\n'+error);
            })
        }else{
            alert('not logged in!');
        }
    }

    onCollapseClick(d_id) {
        let divElement = document.getElementById(d_id);
        divElement.classList.toggle("active");
        var content = divElement.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            content.style.opacity = '0%';
            setTimeout(() => {
                content.style.display = 'none';
            }, 100);
        }else{
            content.style.display = 'block';
            content.style.maxHeight = content.scrollHeight + "px";
            content.style.opacity = '100%';
        }
    }

    set_order(order){
        this.getRequestedPatients();
    }
    
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    componentDidMount() {
        // let urlParams = new URLSearchParams(window.location.search);
        this.getRequestedPatients();
    }

    getRequestedPatients() {
        var access_token = this.getCookie("access_token");
        if(access_token!=null){
            axios.get('https://helpinghearts-mraj.onrender.com/api/hospital/get-patients/', {
                headers: {
                    'Authorization': `Token `+access_token
                }
            })
            .then(response => {
                console.log(response);
                if(response.data.status){
                    this.setState({
                        patients: response.data.patients,
                        loading: false
                    });
                    this.props.set_state_values(response.data.patients.length, true);
                }else{
                    this.props.set_state_values(0, true);
                    console.log('error: '+response.data.message);
                    this.setState({
                        loading: false
                    });
                }
            }).catch(err => {
                this.props.set_state_values(0, true);
                this.setState({
                    loading: false
                });
                console.log(err);
            });
        }else{
            alert('not logged in!');
            window.location.href = '/login';
        }
    }

    render() {
        const { patients } = this.state;
        return ( 
            <>
            {
                (this.state.loading)?
                <div className="mycard py-4">
                    <div className="sk-wave sk-center" style={{inlineSize: '40px', blockSize: '40px'}} >
                        <div className="sk-wave-rect"></div>
                        <div className="sk-wave-rect"></div>
                        <div className="sk-wave-rect"></div>
                        <div className="sk-wave-rect"></div>
                        <div className="sk-wave-rect"></div>
                    </div>
                </div>
                :
                (this.state.patients.length===0)?
                <div className="mycard py-4">
                    <h5>There are no such patients to show right now...</h5>
                </div>
                :<></>
            }
            {
                patients.map((patient)=>
                <div key={patient.id} className="mycard py-3" style={{cursor: 'default'}}>
                    <div id={patient.id} onClick={() => {this.onCollapseClick(patient.id)}} style={{cursor: 'pointer'}} >
                        <h1>{patient.name}</h1>
                        <span>Gender: {patient.gender} &nbsp; | &nbsp; Age: {patient.age} &nbsp; | &nbsp; CT Scan Score: {patient.ct_scan_score}</span>
                    </div>
                    <div className="collapsible-content rounded text-center px-3 pb-3" style={{cursor: 'default', paddingBottom: "15px", backgroundColor: 'rgba(0, 0, 0, 0.02)', opacity: '0%'}}>
                        <span style={{float: 'left'}}>CT Scan Document:</span><br/>
                        <a className="mb-3 rounded" href={patient.ct_scan_document} target="_blank" rel="noreferrer" download={"[ct_scan]"+patient.name+".png"}>
                            <img src={patient.ct_scan_document} alt="CT Scan Document.png" width="20%" style={{minWidth: '250px'}} /><br/>click to download document
                        </a><br/>
                        <input type="button" onClick={() => {this.onResponseRequest(patient.id, true)}} className="btn btn-success mt-3 mx-2" value="Accept"/>
                        <input type="button" onClick={() => {this.onResponseRequest(patient.id, false)}} className="btn btn-danger mt-3 mx-2" value="Decline"/>
                    </div>
                </div>
                )
            }
            </>
        )
    }
}

export default Patients