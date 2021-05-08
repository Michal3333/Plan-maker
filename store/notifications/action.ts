import { Alert } from "react-native"
import { ThunkAction } from "redux-thunk"
import { deleteNotification, keepGettingNotifications } from "../../API/notifications"
import NotificationUser from "../../models/NotificationUser"
import { changePendingStatusAction } from "../pendingStatus/action"
import { RootState } from "../store"
import { AddNotifications, DeleteNotification, InitNotifications, NotificationsActions, PendingStatusActions, UserActions } from "../types"


export enum NOTIFICATIONS_ACTION_TYPES {
   INIT_NOTIFICATIONS = 'INIT_NOTIFICATIONS',
   ADD_NOTIFICATIONS = 'ADD_NOTIFICATIONS',
   DELETE_NOTIFICATION = "DELETE_NOTIFICATION"
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

export const asyncDeleteNotification = (notificationId : string) : ThunkAction<void, RootState, unknown, NotificationsActions | PendingStatusActions>  => {
   return async (dispatch, getStore) => {
      try{
         dispatch(changePendingStatusAction(true))
         await deleteNotification(getStore().user.id, notificationId);
         dispatch(deleteNotificationAction(notificationId))
         dispatch(changePendingStatusAction(false))
      } catch (err) {
         dispatch(changePendingStatusAction(false))
         console.log(err)
         Alert.alert("There is something wrong!!!!", err.message);
      }
   }
}

export const deleteNotificationAction= (notificationId: string) : DeleteNotification => {
   return {
      type: NOTIFICATIONS_ACTION_TYPES.DELETE_NOTIFICATION,
      notificationId: notificationId
   }
}
