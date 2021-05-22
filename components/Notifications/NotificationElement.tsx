import React, {useRef, useState} from 'react';
import { StyleSheet, View, Text, Button, Animated,} from 'react-native'
import { NOTIFICATION_TYPE } from '../../API/collections';
import * as Colors from '../../constants/Colors'
import Card from '../UI/Card';
import ThemedText from '../UI/ThemdText';
import ThemedButton from '../UI/ThemedButton';
import ThemedIcon from '../UI/ThemedIcon';
import ThemedLabel from '../UI/ThemedLabel';

type Props = {
   id: string,
   sender: string,
   text: string,
   type: NOTIFICATION_TYPE,
   delete: () => void,
   darkMode : boolean,

}

const NotificationElement = (props : Props) => {
   const {background} = Colors.getColors(props.darkMode);
   const [isOpen, setIsOpen] = useState(false)
   const heightAnim = useRef(new Animated.Value(0)).current;
   const opdacityAnim = useRef(new Animated.Value(0)).current;
   const openBox = () => {
      Animated.timing(heightAnim, {
         toValue: 100, 
         duration:100, 
         useNativeDriver: false
      }).start()
   }
   const closeBox = () => {
      Animated.timing(heightAnim, {
         toValue: 0,
         duration:100, 
         useNativeDriver: false
      }).start()
   }
   const textShow = () => {
      Animated.timing(opdacityAnim, {
         toValue: 1, 
         duration:200, 
         useNativeDriver: false
      }).start()
   }
   const textHide = () => {
      Animated.timing(opdacityAnim, {
         toValue: 0, 
         duration: 80, 
         useNativeDriver: false
      }).start()
   }
   return (
      <Card style={{...styles.box}} darkMode={props.darkMode}>
         <View style={styles.header}>
            {!isOpen ?
               <ThemedIcon  darkMode={props.darkMode}  onPress={() => {
                  setIsOpen(true);
                  openBox();
                  textShow();
               }} style={{}} icon='chevron-down-circle'/>
               :
               <ThemedIcon  darkMode={props.darkMode}  onPress={() => {
                  setIsOpen(false)
                  closeBox();
                  textHide();
               }} style={{}} icon='chevron-up-circle'/>
            }
            <View style={{width: '80%'}}>
               <ThemedLabel  darkMode={props.darkMode}>{props.text}</ThemedLabel>
               <ThemedText style={{...styles.marginLeft}}  darkMode={props.darkMode}>From: {props.sender}</ThemedText>
            </View>
            <ThemedIcon  darkMode={props.darkMode}  onPress={props.delete} style={{}} icon='ios-close' type='delete'/>
         </View>
         <Animated.View style={{height: heightAnim}}>
            <Animated.View style={{opacity: opdacityAnim}}>
               <ThemedText style={{...styles.marginLeft}}  darkMode={props.darkMode}>From: {props.sender}</ThemedText>
               <ThemedText style={{...styles.marginLeft}}  darkMode={props.darkMode}>From: {props.sender}</ThemedText>
               <ThemedText style={{...styles.marginLeft}}  darkMode={props.darkMode}>From: {props.sender}</ThemedText>
            </Animated.View>
            
         </Animated.View >

      </Card>
   )
}

const styles = StyleSheet.create({
   box: {
      marginTop: 20,
      width: '100%',
      alignItems: 'center',
      borderRadius: 20,
   },
   header: {
      flexDirection: 'row',
      alignItems: 'center'

   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around"
   },
   marginLeft: {
      marginTop: 5,
      marginLeft: 10
   }
})

export default NotificationElement;