import { Alert } from "react-native"
import { ThunkAction } from "redux-thunk"
import { keepGettingNotifications } from "../../API/notifications"
import NotificationUser from "../../models/NotificationUser"
import { RootState } from "../store"
import { AddNotifications, InitNotifications, NotificationsActions } from "../types"

export enum NOTIFICATIONS_ACTION_TYPES {
   INIT_NOTIFICATIONS = 'INIT_NOTIFICATIONS',
   ADD_NOTIFICATIONS = 'ADD_NOTIFICATIONS',
}

export const asyncKeepGettingNotifications = () : ThunkAction<void, RootState, unknown, NotificationsActions>  => {
   return async (dispatch, getStore) => {
      try{
         const callBackAdd = (notifications: NotificationUser) => {
            dispatch(addNotifications(notifications))
         }
         const unsubscribe = await keepGettingNotifications(getStore().user.id, callBackAdd);
         dispatch(initNotifications(unsubscribe))
      } catch (err) {
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
      }
   }
}

export const addNotifications = (notification: NotificationUser) : AddNotifications => {
   return {
      type: NOTIFICATIONS_ACTION_TYPES.ADD_NOTIFICATIONS,
      notification: notification
   }
}

export const initNotifications = ( unsubscribe : () => void) : InitNotifications => {
   return {
      type: NOTIFICATIONS_ACTION_TYPES.INIT_NOTIFICATIONS,
      unsubscribe
   }
}
