import { Alert } from "react-native"
import { ThunkAction } from "redux-thunk"
import { keepGettingInvitations } from "../../API/invitations"
import Invitation from "../../models/Invitation"
import { RootState } from "../store"
import { AddInvitation, InitInvitations, InvitationActions } from "../types"

export enum INVITATION_ACTION_TYPES {
   INIT_INVITATIONS = 'INIT_INVITATIONS',
   ANSWER_INVITATION = 'ANSWER_INVITATION',
   ADD_INVITATION = 'ADD_INVITATION'
}

export const asyncKeepGettingInvitations = () : ThunkAction<void, RootState, unknown, InvitationActions>  => {
   return async (dispatch, getStore) => {
      try{
         const callBackAdd = (invitation: Invitation) => {
            dispatch(addInvitation(invitation))
         }
         const unsubscribe = await keepGettingInvitations(getStore().user.id, callBackAdd);
         dispatch(initInvitations(unsubscribe))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
      }
   }
}

export const addInvitation = (invitation: Invitation) : AddInvitation => {
   return {
      type: INVITATION_ACTION_TYPES.ADD_INVITATION,
      invitation
   }
}

export const initInvitations = ( unsubscribe : () => void) : InitInvitations => {
   return {
      type: INVITATION_ACTION_TYPES.INIT_INVITATIONS,
      unsubscribe
   }
}