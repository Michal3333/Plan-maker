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
   date: Date,
   projectName: string,
   message: string,

}
const textHeight = 21;

const NotificationElement = (props : Props) => {
   const {background} = Colors.getColors(props.darkMode);
   const [isOpen, setIsOpen] = useState(false)
   const height = checkRequredHeight(props.sender, props.projectName, props.message);
   const heightAnim = useRef(new Animated.Value(0)).current;
   const opdacityAnim = useRef(new Animated.Value(0)).current;
   const openBox = () => {
      Animated.timing(heightAnim, {
         toValue: height, 
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
      <Card style={{}} darkMode={props.darkMode}>
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
            </View>
            <ThemedIcon  darkMode={props.darkMode}  onPress={props.delete} style={{}} icon='ios-close' type='delete'/>
         </View>
         <Animated.View style={{height: heightAnim}}>
            <Animated.View style={{opacity: opdacityAnim}}>
               <ThemedText style={{...styles.marginAndHeight}}  darkMode={props.darkMode}>{props.date.toUTCString()}</ThemedText>
               { props.sender !== '' && <ThemedText style={{...styles.marginAndHeight}}  darkMode={props.darkMode}>From : {props.sender}</ThemedText>}
               { props.projectName !== '' && <ThemedText style={{...styles.marginAndHeight}}  darkMode={props.darkMode}>Refers to : {props.projectName}</ThemedText>}
               { props.message !== '' && <ThemedText style={{...styles.marginAndHeight}}  darkMode={props.darkMode}>Message : {props.message}</ThemedText>}
            </Animated.View>
            
         </Animated.View >

      </Card>
   )
}

const styles = StyleSheet.create({
  
   header: {
      flexDirection: 'row',
      alignItems: 'center'
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around"
   },
   marginAndHeight: {
      marginTop: 5,
      marginLeft: 10,
      height: textHeight
   }
})

export default NotificationElement;

const checkRequredHeight = (sender: string, projectName: string, message: string) => {

   let height = textHeight + 15;
   if(projectName !== '') height += textHeight;
   if(sender !== '') height += textHeight;
   if(message !== '') height += textHeight;
   return height;
}