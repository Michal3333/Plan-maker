import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { useFocusEffect, } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, useColorScheme, ScrollView, Image, Animated, useWindowDimensions, Button} from 'react-native'
import Screen from '../components/UI/Screen';
import NotificationElement from '../components/Notifications/NotificationElement';
import * as NotificationActions from '../store/notifications/action'
import ThemedTitle from '../components/UI/ThemedTitle';
import * as Colors from '../constants/Colors'
import { useRef } from 'react';
import { useEffect } from 'react';
import Card from '../components/UI/Card';
import ThemedText from '../components/UI/ThemdText';
import * as Haptics from 'expo-haptics';

type Props = {

}
export const assets = [require('../assets/headerColors1.png')]

const MessagesScreen = (props: Props) => {
   const notifications = useAppSelector(state => state.notifications.notifications);
   const dispatch = useDispatch();
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";

   return (
      <Screen style={{padding: 0}} headerImage={true} darkMode={darkMode}>
         {
            notifications.length > 0 ? 
            <FlatList style={styles.list} data={notifications} renderItem={itemData => <NotificationElement 
               id={itemData.item.id} 
               text={itemData.item.text}
               type={itemData.item.type}
               sender={itemData.item.sender}
               date={itemData.item.date}
               message={itemData.item.message}
               projectName={itemData.item.projectName}
               delete={() => {
                  dispatch(NotificationActions.asyncDeleteNotification(itemData.item.id));
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
               }}
               darkMode={darkMode}/>}
               ListHeaderComponent={<ThemedTitle style={{fontSize: 50}} darkMode={darkMode}>Messages</ThemedTitle>}/>
               :
               <View style={{...styles.list,}}>
                  <ThemedTitle style={{fontSize: 50}} darkMode={darkMode}>Messages</ThemedTitle>
                  <Card darkMode={darkMode} style={{ ...styles.box}}> 
                     <ThemedText  darkMode={darkMode}>No Messages</ThemedText>
                  </Card>
                  {/* <Button title="1" onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);}}/>
                  <Button title="2" onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);}}/>
                  <Button title="3" onPress={() => {Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);}}/>
                  <Button title="4" onPress={() => {Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);}}/>
                  <Button title="5" onPress={() => {Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);}}/>
                  <Button title="6" onPress={() => {Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);}}/> */}
               </View>
         }
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      width: "100%",
      padding: 10
   },
   titleBox: {
      width: "100%",
      maxWidth: 400,
   },
   box: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
      borderRadius: 20,
      height: '80%',
      justifyContent: 'center'
   },
})

export default MessagesScreen;