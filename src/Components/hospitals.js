import axios from 'axios'
import React, {PureComponent} from 'react'

class Hospitals extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hospitals : [],
            loading: true
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
        var access_token = this.getCookie("access_token");
        var loggedin = false;
        if(access_token!=null){
            axios.get('https://helpinghearts-mraj.herokuapp.com/user/', 
            {
                headers: {
                    'Authorization': 'Token '+access_token
                }
            }
            )
            .then(response=>{
                if(response.data.status){
                    loggedin = true;
                }
            }).catch(err=>{
                console.log(err);
                // alert(err);
            });
        }
        axios.get('https://helpinghearts-mraj.herokuapp.com/api/get-hospitals/')
        .then(response => {
            console.log(response);
            if(response.data.status){
                this.setState({
                    hospitals: response.data.hospitals,
                    loading: false
                });
                this.props.set_state_values(response.data.total_pages, response.data.hospitals.length, loggedin);
            }else{
                console.log('error: '+response.data.message);
                this.setState({
                    loading: false
                });
            }
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err);
        });
    }

    render() {
        const { hospitals } = this.state;
        return ( 
            <>
            {
                (this.state.loading)?
                <div className="mycard py-4">
                    <h5>Loading...</h5>
                </div>
                :
                (this.state.hospitals.length===0)?
                <div className="mycard py-4">
                    <h5>There are no hospitals to show right now...(try again later)</h5>
                </div>
                :<></>
            }
            {
                hospitals.map((hospital)=>
                <div key={hospital.id} className="mycard py-3">
                    <h1>{hospital.name}</h1>
                    <span>beds: {hospital.beds} &nbsp; | ventilators: {hospital.ventilators} &nbsp; | oxygens: {hospital.oxygens}</span>
                </div>
                )
            }
            </>
        )
    }
}

export default Hospitals