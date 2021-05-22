import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList, useColorScheme, ScrollView} from 'react-native'
import Screen from '../components/UI/Screen';
import NotificationElement from '../components/Notifications/NotificationElement';
import * as NotificationActions from '../store/notifications/action'
import ThemedTitle from '../components/UI/ThemedTitle';
import * as Colors from '../constants/Colors'
type Props = {

}

const MessagesScreen = (props: Props) => {
   const notifications = useAppSelector(state => state.notifications.notifications);
   const dispatch = useDispatch();
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   return (
      <Screen>
          <FlatList style={styles.list} data={notifications} renderItem={itemData => <NotificationElement 
            id={itemData.item.id} 
            text={itemData.item.text}
            type={itemData.item.type}
            sender={itemData.item.sender}
            delete={() => {
               dispatch(NotificationActions.asyncDeleteNotification(itemData.item.id))
            }}
            darkMode={darkMode}/>}
            ListHeaderComponent={<ThemedTitle darkMode={darkMode}>Messages</ThemedTitle>}/>
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      width: "100%",
   },
   titleBox: {
      width: "100%",
      maxWidth: 400,
   },
})

export default MessagesScreen;