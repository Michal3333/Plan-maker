import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated, TouchableWithoutFeedback, Keyboard, Switch } from 'react-native';
import * as Colors from '../../constants/Colors'
import { validateEmail } from '../../utils/validators';
import ThemedText from '../UI/ThemdText';
import ThemedButton from '../UI/ThemedButton';
import ThemedInput from '../UI/ThemedInput';
import ThemedLabel from '../UI/ThemedLabel';

type Props = {
   darkMode: boolean,
   closeModal : () => void,
   addContributor : (mail: string, allowMessages: boolean, allowDetails: boolean) => void
}

const AddContributorModal = ({darkMode, closeModal, addContributor} : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode);
   const [mail, setMail] = useState('');
   const [allowMessages, setAllowMessage] = useState(false);
   const [allowDetails, setAllowDetails] = useState(false);
   const [mailState, setMailState] = useState(false);


   const contributorCallback = (text: string, state:boolean) => {
      setMail(text)
      setMailState(state)
   }

   return (
      <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
         <View style={{...styles.centeredView, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
         <View style={{backgroundColor: backgroundLighter, borderRadius: 20, ...styles.contentBox, paddingHorizontal: 20}}>
            <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Add Contributor</ThemedLabel>
            <ThemedInput validate={validateEmail} setTextAndState={contributorCallback} leftIcon="mail" validation={true} placeholder="Mail..." darkMode={darkMode} style={{width: '100%'}}/>
            <View style={{marginBottom: 10, width: '100%'}}>
               <View style={{...styles.switchbox}}>
                  <Switch style={{transform: [{ scaleX: .8 }, { scaleY: .8 }]}}
                     value={allowMessages}
                     onValueChange={() => {setAllowMessage((val) => !val)}}
                     trackColor={{ false: backgroundLighter, true: Colors.green }}
                  />
                  <ThemedText style={{...styles.marginAndHeight}}  darkMode={darkMode}>Allow messages</ThemedText>
               </View>
               <View style={styles.switchbox}>
                  <Switch style={{transform: [{ scaleX: .8 }, { scaleY: .8 }]}}
                     value={allowDetails}
                     onValueChange={() => {setAllowDetails((val) => !val)}}
                     trackColor={{ false: backgroundLighter, true: Colors.green }}
                  />
                  <ThemedText style={{...styles.marginAndHeight}}  darkMode={darkMode}>Allow details</ThemedText>
               </View>
            </View>
           
            <View style={styles.buttonsBox}>
               <ThemedButton title="Cancel" 
                  darkMode={darkMode} 
                  disabled={false} 
                  onPress={closeModal}
                  type="confirm" 
                  style={{ width: "40%",  paddingVertical: 10}}
                  colorText="reject"/>
               <ThemedButton title="Add" 
                  darkMode={darkMode} 
                  disabled={!mailState} 
                  onPress={() => {addContributor(mail, allowMessages, allowDetails)}}
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
    marginAndHeight: {
      marginTop: 5,
      marginLeft: 10,
   },
   switchbox: {
      flexDirection: 'row',
      width: '60%',
      justifyContent: 'flex-start',
      borderBottomColor: 'black',
      borderBottomWidth: 3,
      marginBottom: 20
   }
})

export default AddContributorModal;