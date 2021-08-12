import axios from 'axios'
import React, {PureComponent} from 'react'

class AdmittedPatients extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            patients : [],
            loading: true,
            accountType: 0
        }
        this.onpatientClick = this.onpatientClick.bind(this);
        this.onCollapseClick = this.onCollapseClick.bind(this);
        this.onDischargeRequest = this.onDischargeRequest.bind(this);
        this.getAdmittedPatients = this.getAdmittedPatients.bind(this);
    }

    /**
     * &nbsp;
     * @param {number} pid patient's id
     */
    onDischargeRequest(pid){
        var access_token = this.getCookie("access_token");
        if(access_token!=null){
            axios.post('https://helpinghearts-mraj.herokuapp.com/api/patient/discharge/', {pid: pid}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Token `+access_token
                }
            }).then(response => {
                if(response.data.status){
                    alert('patient successfully discharged!');
                    this.getAdmittedPatients();
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
        this.getAdmittedPatients();
    }
    
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    componentDidMount() {
        // let urlParams = new URLSearchParams(window.location.search);
        this.getAdmittedPatients();
    }

    getAdmittedPatients() {
        var access_token = this.getCookie("access_token");
        if(access_token!=null){
            this.setState({loading: true})
            axios.get('https://helpinghearts-mraj.herokuapp.com/api/hospital/get-admitted-patients/', {
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
            window.location.href='/login';
        }
    }

    onpatientClick(id) {
        window.location.href = '/patient/?hd='+id;
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
                <div key={patient.id} className="mycard py-3" style={{cursor: 'default', paddingRight: '10px'}}>
                    <input type="button" onClick={() => {this.onDischargeRequest(patient.id)}} style={{float: 'right', position: 'relative', top: '5px'}} className="btn btn-success" value="Discharge"/>
                    <div id={patient.id}>
                        <h1>{patient.name}</h1>
                        <span>Gender: {patient.gender} &nbsp; | &nbsp; Age: {patient.age}</span>
                    </div>
                </div>
                )
            }
            </>
        )
    }
}

export default AdmittedPatients