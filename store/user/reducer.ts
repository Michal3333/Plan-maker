import { UserActions, UserState } from "../types";
import { USER_ACTION_TYPES } from "./action";



const initialState : UserState = {
   isLoggedIn: false,
   id: '',
   email: '',
   raportObjects: []
}

export default (state = initialState, acton: UserActions ) : UserState => {
   switch(acton.type) {
      case USER_ACTION_TYPES.SIGN_IN:
         return {
            ...state,
            isLoggedIn: true,
            email: acton.email,
            id: acton.id,
         }
      case USER_ACTION_TYPES.SIGN_OUT:
         return {
            ...initialState
         }
      case USER_ACTION_TYPES.GET_RAPORT:
         return {
            ...state,
            raportObjects : acton.raportObjects
         }
      case USER_ACTION_TYPES.DELETE_RAPORT:
         return {
            ...state,
            raportObjects: []
         }
   }
   return state;
} 
