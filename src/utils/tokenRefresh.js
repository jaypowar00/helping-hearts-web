import axios from "axios";


export function refreshToken() {
    if(getCookie('refreshtoken')!=="" || getCookie('refreshtoken')!==null){
        axios.post('https://helpinghearts-mraj.herokuapp.com/user/refresh-token/', undefined, {
            withCredentials: true
        }).then(response => {
            if(response.data.status){
                document.cookie = "access_token="+response.data.access_token;
                document.cookie = "csrf_token="+response.data.csrf_token;
            }else{
                document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                window.location.reload();
            }
        }).catch(e=>{
            document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "refreshtoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "csrf_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.reload();
        })
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}