import { authHeader } from '../_helpers/auth-header.js';
import { systemConstants } from '../_constants/system.constants.js';


export const leaveService = {
    getLeaveByPage
};

function getLeaveByPage(page, pageSize, sorted, status){
    const requestOptions = {
        method: "GET",
        headers: authHeader()
    };
    let url = systemConstants.API_URL+"/private/overtime/getOvertimesByPage?page="+page+"&pageSize="+pageSize+"&status="+status;
    if(sorted && sorted.id && sorted.desc){
        url+="&sortedColumn="+sorted.id+"&desc="+sorted.desc;
    }
    return fetch(url,requestOptions).then(handleResponse);

}


function handleResponse(response) {
    if (!response.ok) {
        return Promise.reject(response.statusText);
    }
    return response.json();
}
