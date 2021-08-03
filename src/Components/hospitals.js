import axios from 'axios'
import React, {PureComponent} from 'react'

class Hospitals extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            hospitals : [],
            loading: true,
            order: (this.props.order && this.props.order!=='default')?this.props.order:''
        }
    }

    set_search(search){
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
        axios.get('https://helpinghearts-mraj.herokuapp.com/api/get-hospitals/?page='+this.props.get_page+'&s_name='+search)
        .then(response => {
            console.log(response);
            if(response.data.status){
                this.setState({
                    hospitals: response.data.hospitals,
                    loading: false
                });
                let isNext = response.data.next_page!=null;
                let isPrev = response.data.previous_page!=null;
                if(search==='')
                    if (window.history.pushState) {
                        const newURL = new URL(window.location.href);
                        newURL.search = '?';
                        window.history.pushState({ path: newURL.href }, '', newURL.href);
                    }
                this.props.set_state_values(response.data.total_pages, response.data.current_page, response.data.total_hospitals, loggedin, isNext, isPrev);
            }else{
                console.log('error: '+response.data.message);
                this.setState({
                    loading: false,
                    hospitals: []
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

    set_order(order){
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
        axios.get('https://helpinghearts-mraj.herokuapp.com/api/get-hospitals/?page='+this.props.get_page+'&order='+order)
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
                    newURL.search = '?pg='+response.data.current_page;
                    window.history.pushState({ path: newURL.href }, '', newURL.href);
                }
                this.props.set_state_values(response.data.total_pages, response.data.current_page, response.data.total_hospitals, loggedin, isNext, isPrev);
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

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    componentDidMount() {
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
                if(response.data.status){
                    loggedin = true;
                }
            }).catch(err=>{
                console.log(err);
                // alert(err);
            });
        }
        axios.get('https://helpinghearts-mraj.herokuapp.com/api/get-hospitals/?page='+this.props.get_page+'&order='+this.state.order)
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
                    newURL.search = '?pg='+response.data.current_page;
                    window.history.pushState({ path: newURL.href }, '', newURL.href);
                }
                this.props.set_state_values(response.data.total_pages, response.data.current_page, response.data.total_hospitals, loggedin, isNext, isPrev);
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
                    <h5>There are no such hospitals to show right now...</h5>
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