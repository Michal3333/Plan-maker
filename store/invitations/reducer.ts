import { InvitationActions, InvitationsState, UserActions } from "../types";
import { USER_ACTION_TYPES } from "../user/action";
import { INVITATION_ACTION_TYPES } from "./action";

const initialState : InvitationsState = {
   invitations: [],
   unsubscribe: null
}

export default (state = initialState, action: InvitationActions | UserActions) : InvitationsState => {
   switch(action.type) {
      case INVITATION_ACTION_TYPES.ADD_INVITATION:
         return {
            ...state,
            invitations: [...state.invitations, action.invitation]
         }
      case INVITATION_ACTION_TYPES.INIT_INVITATIONS:
         return {
            ...state,
            unsubscribe : action.unsubscribe
         }
      case USER_ACTION_TYPES.SIGN_OUT:
         if(state.unsubscribe){
            state.unsubscribe()
         } else {
            console.log('no unsubscribe')
         }
         return initialState
   }
   return state;
} 