import { Alert } from "react-native"
import { ThunkAction } from "redux-thunk"
import { INITATION_STATUS } from "../../API/collections"
import { keepGettingInvitations, sendInvitationAnswer } from "../../API/invitations"
import Invitation from "../../models/Invitation"
import { changePendingStatusAction } from "../pendingStatus/action"
import { RootState } from "../store"
import { AddInvitation, DeleteAnsweredInvitation, InitInvitations, InvitationActions, PendingStatusActions, UserActions } from "../types"

export enum INVITATION_ACTION_TYPES {
   INIT_INVITATIONS = 'INIT_INVITATIONS',
   DELETE_ANSWER_INVITATION = 'DELETE_ANSWER_INVITATION',
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
      } catch (err : any) {
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
export const asyncAnswerInvitation = (invitationId: string, answer: boolean) : ThunkAction<void, RootState, unknown, InvitationActions | PendingStatusActions>  => {
   return async (dispatch, getStore) => {
      try{
         dispatch(changePendingStatusAction(true))
         const status = answer ? INITATION_STATUS.ACCEPTED : INITATION_STATUS.DECLINED;
         await sendInvitationAnswer(getStore().user.id, invitationId, status);
         dispatch(deleteAnsweredInvitation(invitationId))
         dispatch(changePendingStatusAction(false))
      } catch (err : any) {
         console.log(err)
         dispatch(changePendingStatusAction(false))
         Alert.alert("There is something wrong!!!!", err.message);
      }
   }
}

export const deleteAnsweredInvitation = (invitationId: string) : DeleteAnsweredInvitation => {
   return {
      type: INVITATION_ACTION_TYPES.DELETE_ANSWER_INVITATION,
      invitationId
   }
}