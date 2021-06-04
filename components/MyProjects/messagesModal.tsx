import React from 'react';
import { useAppSelector } from '../../store/store'
import { useDispatch } from 'react-redux';
import { useFocusEffect, } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, useColorScheme, ScrollView, Image, Animated, useWindowDimensions, Button} from 'react-native'
import Screen from '../../components/UI/Screen';
import NotificationElement from '../../components/Notifications/NotificationElement';
import * as NotificationActions from '../../store/notifications/action'
import ThemedTitle from '../../components/UI/ThemedTitle';
import * as Colors from '../../constants/Colors'
import { useRef } from 'react';
import { useEffect } from 'react';
import Card from '../../components/UI/Card';
import ThemedText from '../../components/UI/ThemdText';
import * as Haptics from 'expo-haptics';
import ThemedButton from '../UI/ThemedButton';

type Props = {
   projectId : string
   darkMode: boolean,
   closeModal : () => void
}

const MessagesModal = ({projectId, darkMode, closeModal}: Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode)

   const notifications = useAppSelector(state => state.notifications.notifications).filter(x => x.projectId === projectId);
   const dispatch = useDispatch();


   return (
      <View style={{...styles.modal, paddingTop: 70}}>
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
               </View> 
         }
         <View style={styles.buttonsBox}>
               <ThemedButton title="Close" 
                  darkMode={darkMode} 
                  disabled={false} 
                  onPress={() => closeModal()}
                  type="confirm" 
                  style={{ width: "100%", backgroundColor: backgroundLighter, marginBottom: 30}}/>
            </View>
      </View>
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
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      maxWidth: 400,
      // marginBottom: 40
   },
   modal: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'black',
      height: '100%',
      justifyContent: 'center'
   },
})

export default MessagesModal;