import { authHeader } from '../_helpers/auth-header.js';
import { systemConstants } from '../_constants/system.constants.js';


export const leaveService = {
    getLeaveByPage,
    deleteLeave
};

function getLeaveByPage(){
    const requestOptions = {
        method: "GET",
        // headers: authHeader()
    };
    let url = "https://5b0d22408126c90014997580.mockapi.io/data";
    
    return fetch(url,requestOptions).then(handleResponse);

}


function deleteLeave(id){
    const requestOptions = {
        method: "DELETE",
        // headers: authHeader()
    };
    return fetch("https://5b0d22408126c90014997580.mockapi.io/data/"+id,requestOptions).then(handleResponse);
}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
