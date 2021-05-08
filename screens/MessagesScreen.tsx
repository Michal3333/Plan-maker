import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList} from 'react-native'
import Screen from '../components/UI/Screen';
import NotificationElement from '../components/Notifications/NotificationElement';
import * as NotificationActions from '../store/notifications/action'
type Props = {

}

const MessagesScreen = (props: Props) => {
   const notifications = useAppSelector(state => state.notifications.notifications);
   const dispatch = useDispatch();
   return (
      <Screen withDrawerButton={true}>
          <FlatList style={styles.list} data={notifications} renderItem={itemData => <NotificationElement 
            id={itemData.item.id} 
            text={itemData.item.text}
            type={itemData.item.type}
            sender={itemData.item.sender}
            delete={() => {
               dispatch(NotificationActions.asyncDeleteNotification(itemData.item.id))
            }}/>
         }/>
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      width: "100%"
   }
})

export default MessagesScreen;