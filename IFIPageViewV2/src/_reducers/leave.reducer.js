import {leaveConstants} from '../_constants/leave.constants';

export function leaves(state = {},action){
    switch(action.type){
        case leaveConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case leaveConstants.GETALL_SUCCESS:
            return{
                loading: false,
                leaveList: action.leaveBean
                // pages: action.leaveBean.pages
            }
        case leaveConstants.GETALL_FAILURE:
            return{
                loading: false,
                error: action.error
            }
        default:
            return state;
    }

}