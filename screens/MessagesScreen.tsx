import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { useFocusEffect, } from '@react-navigation/native';
import { StyleSheet, View, Text, FlatList, useColorScheme, ScrollView, Image, Animated, useWindowDimensions, Vibration} from 'react-native'
import Screen from '../components/UI/Screen';
import NotificationElement from '../components/Notifications/NotificationElement';
import * as NotificationActions from '../store/notifications/action'
import ThemedTitle from '../components/UI/ThemedTitle';
import * as Colors from '../constants/Colors'
import { useRef } from 'react';
import { useEffect } from 'react';
import Card from '../components/UI/Card';
import ThemedText from '../components/UI/ThemdText';
type Props = {

}
export const assets = [require('../assets/headerColors1.png')]

const MessagesScreen = (props: Props) => {
   const notifications = useAppSelector(state => state.notifications.notifications);
   const dispatch = useDispatch();
   let colorScheme = useColorScheme();
   const windowWidth = useWindowDimensions().width;
   // const windowWidth = useWindowDimensions().width;
   
   const darkMode = colorScheme === "dark";
   const offsetAnim = useRef(new Animated.Value(-1 * windowWidth)).current
   const slideIn = () => {
      Animated.timing(offsetAnim, {
         toValue: 0, 
         duration:500,
         delay: 200, 
         useNativeDriver: false
      }).start()
   }

   useFocusEffect(
      React.useCallback(() => {
         slideIn()
      }, [])
    );

   return (
      <Screen style={{padding: 0}}>
         <Animated.View style={{height: 150, width: '85%', position: 'absolute', top: 0, left: offsetAnim}}>
            <Image source={assets[0]} resizeMode='cover' style={{ height: '100%', width: '100%', borderTopRightRadius: 20, borderBottomRightRadius: 20}}/>
         </Animated.View>
         {
            notifications.length > 0 ? 
            <FlatList style={styles.list} data={notifications} renderItem={itemData => <NotificationElement 
               id={itemData.item.id} 
               text={itemData.item.text}
               type={itemData.item.type}
               sender={itemData.item.sender}
               delete={() => {
                  dispatch(NotificationActions.asyncDeleteNotification(itemData.item.id));
                  Vibration.vibrate(50);
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