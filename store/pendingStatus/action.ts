import { ChangePendingStatus } from "../types"

export enum PENDING_STATUS_TYPES {
   CHANGE_PENDING_STATUS = 'CHANGE_PENDING_STATUS'
}
export const changePendingStatusAction = (status : boolean) : ChangePendingStatus => {
   return {
      type: PENDING_STATUS_TYPES.CHANGE_PENDING_STATUS,
      newStatus: status
   }
}