import { leaveConstants } from '../_constants/leave.constants.js';
import { leaveService } from '../_services/leave.service.js';

export const leaveActions = {
    getLeaveByPage
};

function getLeaveByPage(page, pageSize, sorted, status){
    return dispatch => {
        dispatch(request());
        leaveService.getLeaveByPage(page, pageSize, sorted, status).then(
            leaveBean => dispatch(success(leaveBean)),
            error => dispatch(failure(error))
        );
    };

    function request() {return  {type: leaveConstants.GETALL_REQUEST}}
    function success(leaveBean) { return {type: leaveConstants.GETALL_SUCCESS,leaveBean}}
    function failure(error) { return {type: leaveConstants.GETALL_FAILURE, error}}
}