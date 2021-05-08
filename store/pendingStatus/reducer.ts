import { PendingState, PendingStatusActions } from "../types";
import { PENDING_STATUS_TYPES } from "./action";

const initialState : PendingState = {
   pendingLoggin: false,

}

export default (state = initialState, acton: PendingStatusActions) : PendingState => {
   switch(acton.type) {
      case PENDING_STATUS_TYPES.CHANGE_PENDING_STATUS:
         return {
            pendingLoggin: acton.newStatus,
         }
   }
   return state;
} 