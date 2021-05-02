import { NotificationsActions, NotificationState, UserActions,  } from "../types";
import { USER_ACTION_TYPES } from "../user/action";
import { NOTIFICATIONS_ACTION_TYPES } from "./action";



const initialState : NotificationState = {
   notifications: [],
   unsubscribe: null
}

export default (state = initialState, action: NotificationsActions | UserActions) : NotificationState => {
   switch(action.type) {
      case NOTIFICATIONS_ACTION_TYPES.INIT_NOTIFICATIONS:
         return {
            ...state,
            unsubscribe: action.unsubscribe
         }
      case NOTIFICATIONS_ACTION_TYPES.ADD_NOTIFICATIONS:
         return {
            ...state,
            notifications: [...state.notifications, action.notification]
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
