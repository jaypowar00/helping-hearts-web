import axios from 'axios'
import React, {PureComponent} from 'react'
import { refreshToken } from '../utils/tokenRefresh'

class Patients extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            patients : [],
            loading: true,
            accountType: 0
        }
        this.onpatientClick = this.onpatientClick.bind(this);
    }

    set_search_order_page(search, order, page){
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
            }).catch(error=>{
                console.log(error)
                if(error.response && error.response.data && error.response.data.detail === "access token expired!"){
                    refreshToken();
                }
            });
        }
        axios.get('https://helpinghearts-mraj.herokuapp.com/api/hospital/get-patients/', {
            headers: {
                'Authorization': `Token `+access_token
            }
        }).then(response => {
            console.log(response);
            if(response.data.status){
                this.setState({
                    patients: response.data.patients,
                    loading: false
                });
                let isNext = response.data.next_page!=null;
                let isPrev = response.data.previous_page!=null;
                if (window.history.pushState) {
                    const newURL = new URL(window.location.href);
                    let pageUrl = '?pg='+response.data.current_page;
                    if(search!=='')
                        pageUrl+='&ser='+search;
                    if(order!=='')
                        pageUrl+='&or='+order;
                    newURL.search = pageUrl;
                    window.history.pushState({ path: newURL.href }, '', newURL.href);
                }
                this.props.set_state_values(response.data.total_pages, response.data.current_page, response.data.total_patients, loggedin, isNext, isPrev);
            }else{
                console.log('error: '+response.data.message);
                this.setState({
                    loading: false,
                    patients: []
                });
                this.props.set_state_values(0, 1, 0, loggedin, false, false);
            }
        }).catch(err => {
            this.setState({
                loading: false
            });
            console.log(err);
        });
    }
    
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
        let urlParams = new URLSearchParams(window.location.search);
        console.log('page='+this.props.get_page);
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
                console.log(response)
                if(response.data.status){
                    loggedin = true;
                }
                this.setState({
                    accountType: response.data.user.account_type
                })
            }).catch(err=>{
                console.log(err);
                // alert(err);
            });
        }
        let page=1;
        let order='';
        let search='';
        if(urlParams.has('pg'))
            page = (urlParams.get('pg')!=='' && urlParams.get('pg')!==null)?urlParams.get('pg'):1;
        if(urlParams.has('or'))
            order = (urlParams.get('or')!=='' && urlParams.get('or')!==null)?urlParams.get('or'):'';
        if(urlParams.has('ser'))
            search = (urlParams.get('ser')!=='' && urlParams.get('ser')!==null)?urlParams.get('ser'):'';
        axios.get('https://helpinghearts-mraj.herokuapp.com/api/hospital/get-patients/', {
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
                let isNext = response.data.next_page!=null;
                let isPrev = response.data.previous_page!=null;
                // if (window.history.pushState) {
                //     const newURL = new URL(window.location.href);
                //     let pageurl = '?pg='+response.data.current_page;
                //     newURL.search = pageurl;
                //     window.history.pushState({ path: newURL.href }, '', newURL.href);
                // }
                this.props.set_state_values(response.data.total_pages, response.data.current_page, response.data.patients.length, loggedin, isNext, isPrev);
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

    onpatientClick(id) {
        window.location.href = '/patient/?hd='+id;
    }

    render() {
        const { patients: patients } = this.state;
        return ( 
            <>
            {
                (this.state.loading)?
                <div className="mycard py-4">
                    <h5>Loading...</h5>
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
                <div key={patient.id} className="mycard py-3" onClick={()=>this.onpatientClick(patient.id)}>
                    <h1>{patient.name}</h1>
                    <span>beds: {patient.beds} &nbsp; | ventilators: {patient.ventilators} &nbsp; | oxygens: {patient.oxygens}</span>
                </div>
                )
            }
            </>
        )
    }
}

export default Patients