import axios from 'axios'
import React, {PureComponent} from 'react'

class WorkingCoworkers extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            coworkers : [],
            loading: true,
            accountType: 0
        }
        this.onRemoveRequest = this.onRemoveRequest.bind(this);
        this.getAdmittedPatients = this.getAdmittedPatients.bind(this);
    }

    /**
     * &nbsp;
     * @param {number} cid coworker's id
     */
    onRemoveRequest(cid){
        var access_token = this.getCookie("access_token");
        if(access_token!=null){
            axios.post('https://helpinghearts-mraj.herokuapp.com/api/coworker/remove-worker/', {cid: cid}, {
                withCredentials: true,
                headers: {
                    'Authorization': `Token `+access_token
                }
            }).then(response => {
                if(response.data.status){
                    alert('CoWorker successfully removed!');
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
            axios.get('https://helpinghearts-mraj.herokuapp.com/api/hospital/get-working-coworkers/', {
                headers: {
                    'Authorization': `Token `+access_token
                }
            })
            .then(response => {
                console.log(response);
                if(response.data.status){
                    this.setState({
                        coworkers: response.data.coworkers,
                        loading: false
                    });
                    this.props.set_state_values(response.data.coworkers.length, true);
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

    render() {
        const { coworkers } = this.state;
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
                (this.state.coworkers.length===0)?
                <div className="mycard py-4">
                    <h5>There are no Workers to show right now...</h5>
                </div>
                :<></>
            }
            {
                coworkers.map((coworker)=>
                <div key={coworker.id} className="mycard py-3" style={{cursor: 'default', paddingRight: '10px'}}>
                    <input type="button" onClick={() => {this.onRemoveRequest(coworker.id)}} style={{float: 'right', position: 'relative', top: '5px'}} className="btn btn-success" value="Remove"/>
                    <div id={coworker.id}>
                        <h1>{coworker.name}</h1>
                        <span>Gender: {coworker.gender} &nbsp; | &nbsp; Age: {coworker.age} | &nbsp; Role: {
                        (coworker.account_type===4)?"CoWorker"
                        :(coworker.account_type===5)?"Doctor"
                        :"Nurse"}</span>
                    </div>
                </div>
                )
            }
            </>
        )
    }
}

export default WorkingCoworkers