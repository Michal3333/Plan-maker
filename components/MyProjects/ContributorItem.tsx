import React, {useRef, useState} from 'react';
import { StyleSheet, View, Text, Button, Animated, Switch} from 'react-native'
import { NOTIFICATION_TYPE } from '../../API/collections';
import * as Colors from '../../constants/Colors'
import Card from '../UI/Card';
import ThemedText from '../UI/ThemdText';
import ThemedButton from '../UI/ThemedButton';
import ThemedIcon from '../UI/ThemedIcon';
import ThemedLabel from '../UI/ThemedLabel';

type Props = {
   mail: string,
   status: string,
   allowMessages: boolean,
   allowDetails: boolean
   delete: () => void,
   darkMode : boolean,
   editMode : boolean
}
const textHeight = 21;

const ContributorItem = (props : Props) => {
   const {background} = Colors.getColors(props.darkMode);
   const [isOpen, setIsOpen] = useState(false)
   const height = 100;
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
      <Card style={{marginTop: 0, marginBottom: 20}} darkMode={props.darkMode}>
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
            <View style={{width: '65%'}}>
               <ThemedLabel  darkMode={props.darkMode}>{props.mail}</ThemedLabel>
            </View>
            {props.editMode && <ThemedIcon  darkMode={props.darkMode}  onPress={props.delete} style={{marginRight: 10}} icon='ios-trash' type={'delete'}/>}
         </View>
         <Animated.View style={{height: heightAnim, width: "100%"}}>
            <Animated.View style={{opacity: opdacityAnim, width: '70%'}}>
               <ThemedText style={{...styles.marginAndHeight}}  darkMode={props.darkMode}>Status   :   {props.status}</ThemedText>
               <View style={{...styles.switchbox, marginTop: 10}}>
                  <Switch style={{transform: [{ scaleX: .8 }, { scaleY: .8 }], marginRight: 3}} value={props.allowMessages} disabled={!props.editMode}/>
                  <ThemedText style={{...styles.marginAndHeight}}  darkMode={props.darkMode}>Allow messages</ThemedText>
               </View>
               <View style={styles.switchbox}>
                  <Switch style={{transform: [{ scaleX: .8 }, { scaleY: .8 }], marginRight: 3}} value={props.allowDetails} disabled={!props.editMode}/>
                  <ThemedText style={{...styles.marginAndHeight}}  darkMode={props.darkMode}>Allow details</ThemedText>
               </View>
               
            </Animated.View>
            
         </Animated.View >

      </Card>
   )
}

const styles = StyleSheet.create({
  
   header: {
      flexDirection: 'row',
      alignItems: 'center',
      alignContent: 'flex-start',
      width: '100%'
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
   },
   switchbox: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-start'
   }
})

export default ContributorItem;

const checkRequredHeight = (sender: string, projectName: string, message: string) => {

   let height = textHeight + 15;
   if(projectName !== '') height += textHeight;
   if(sender !== '') height += textHeight;
   if(message !== '') height += textHeight;
   return height;
}