import { USER_ACTION_TYPES } from "./user/action";

export interface UserState {
   isLoggedIn: boolean,
   mail: string
}
export type SignUp = {
   type : USER_ACTION_TYPES.SIGN_UP,
   result : boolean,
   mail: string
}

export type UserActions = SignUp