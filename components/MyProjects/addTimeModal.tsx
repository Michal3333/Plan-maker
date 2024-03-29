import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated, TouchableWithoutFeedback, Keyboard } from 'react-native';
import * as Colors from '../../constants/Colors'
import { validateProjectName, validateTimeToAdd } from '../../utils/validators';
import ThemedButton from '../UI/ThemedButton';
import ThemedInput from '../UI/ThemedInput';
import ThemedLabel from '../UI/ThemedLabel';

type Props = {
   darkMode: boolean,
   closeModal : () => void,
   addTime : (time: number) => void
}

const AddTimeModal = ({darkMode, closeModal, addTime} : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode);
   const [timeToAdd, setTimeToAdd] = useState(0);
   const [timeToAddState, setTimeToAddState] = useState(false);


   const timeToAddCallback = (text: string, state:boolean) => {
      const timeToAdd = parseInt(text)
      timeToAdd ? setTimeToAdd(timeToAdd) : setTimeToAdd(0)
      setTimeToAddState(state)
   }

   return (
      <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
         <View style={{...styles.centeredView, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
         <View style={{backgroundColor: backgroundLighter, borderRadius: 20, ...styles.contentBox}}>
            <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Register Time</ThemedLabel>
            <ThemedInput validate={validateTimeToAdd} setTextAndState={timeToAddCallback} leftIcon="time-sharp" validation={true} placeholder="Hours.." darkMode={darkMode} type="number-pad" style={{width: '90%'}}/>
            <View style={styles.buttonsBox}>
               <ThemedButton title="Cancel" 
                  darkMode={darkMode} 
                  disabled={false} 
                  onPress={closeModal}
                  type="confirm" 
                  style={{ width: "40%",  paddingVertical: 10}}
                  colorText="reject"/>
               <ThemedButton title="Add Time" 
                  darkMode={darkMode} 
                  disabled={!timeToAddState} 
                  onPress={() => {addTime(timeToAdd)}}
                  type="confirm" 
                  style={{width: "40%",  paddingVertical: 10}}
                  colorText="accept"/>
            </View>
         </View>
      </View>
      </TouchableWithoutFeedback>
     
     
   )
}

const styles = StyleSheet.create({
   text: {
      textAlign: 'left',
      width: "90%",
      fontSize: 30,
      marginVertical: 20
      
   },
   contentBox: {
      alignItems: 'center',
      width: '90%'
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      // marginTop: 20,
      maxWidth: 400,
      marginBottom: 20
   },
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
})

export default AddTimeModal;