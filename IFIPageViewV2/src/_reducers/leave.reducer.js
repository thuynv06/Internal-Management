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

        case leaveConstants.DELETE_LEAVE_SUCCESS:
            let leaveList = state.leaveList;
            let leaveDelete = [];
      
            for (var i = 0 ;i < leaveList.length;i++) {
              if(leaveList[i].id != action.id){
                leaveDelete.push(leaveList[i]);
              }
            }
            state.leaveList = leaveDelete;
            return {
                leaveList: leaveDelete,
            };
        default:
            return state;
    }

}