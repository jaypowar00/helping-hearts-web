import axios from 'axios'
import React, {PureComponent} from 'react'
import { refreshToken } from '../utils/tokenRefresh'
import '../Styles/spinkit.css'

class Hospitals extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            hospitals : [],
            loading: true,
            accountType: 0
        }
        this.onHospitalClick = this.onHospitalClick.bind(this);
    }

    set_search_order_page(search, order, page){
        let access_token = this.getCookie("access_token");
        let loggedin = false;
        let account_type = null;
        if(access_token!=null){
            this.setState({loading: true, hospitals: []});
            axios.get('https://helpinghearts-mraj.herokuapp.com/user/', {
                headers: {
                    'Authorization': 'Token '+access_token
                }
            }).then(response=>{
                if(response.data.status){
                    loggedin = true;
                    account_type = response.data.user.account_type;
                }
            }).catch(error=>{
                console.log(error)
                if(error.response && error.response.data && error.response.data.detail === "access token expired!"){
                    refreshToken();
                }
            });
        }
        axios.get('https://helpinghearts-mraj.herokuapp.com/api/get-hospitals/?page='+page+'&s_name='+search+'&order='+order)
        .then(response => {
            console.log(response);
            if(response.data.status){
                this.setState({
                    hospitals: response.data.hospitals,
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
                this.props.set_state_values(response.data.total_pages, response.data.current_page, response.data.total_hospitals, loggedin, isNext, isPrev, account_type);
            }else{
                console.log('error: '+response.data.message);
                this.setState({
                    loading: false,
                    hospitals: []
                });
                this.props.set_state_values(0, 1, 0, loggedin, false, false, account_type);
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
        let access_token = this.getCookie("access_token");
        let loggedin = false;
        if(access_token!=null){
            axios.get('https://helpinghearts-mraj.herokuapp.com/user/', {
                headers: {
                    'Authorization': 'Token '+access_token
                }
            }).then(response=>{
                console.log(response)
                if(response.data.status){
                    loggedin = true;
                }
                this.setState({
                    accountType: response.data.user.account_type
                })
            }).catch(error=>{
                console.log(error)
                if(error.response && error.response.data && error.response.data.detail === "access token expired!"){
                    refreshToken();
                }
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
        axios.get('https://helpinghearts-mraj.herokuapp.com/api/get-hospitals/?page='+page+'&order='+order+'&s_name='+search)
        .then(response => {
            console.log(response);
            if(response.data.status){
                this.setState({
                    hospitals: response.data.hospitals,
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
                this.props.set_state_values(response.data.total_pages, response.data.current_page, response.data.total_hospitals, loggedin, isNext, isPrev, this.state.accountType);
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

    onHospitalClick(id) {
        window.location.href = '/hospital/?hd='+id;
    }

    render() {
        const { hospitals } = this.state;
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
                (this.state.hospitals.length===0)?
                <div className="mycard py-4">
                    <h5>There are no such hospitals to show right now...</h5>
                </div>
                :<></>
            }
            {
                hospitals.map((hospital)=>
                <div key={hospital.id} className="mycard py-3" onClick={()=>this.onHospitalClick(hospital.id)}>
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