import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native'
import { validateProjectName, validateWeeklyLimit } from '../../utils/validators';
import ColorPicker from '../UI/ColorPicker';
import ThemedInput from '../UI/ThemedInput';
import ThemedLabel from '../UI/ThemedLabel';
import * as Colors from '../../constants/Colors'
import ThemedTitle from '../UI/ThemedTitle';
import ThemedButton from '../UI/ThemedButton';
import ThemedIcon from '../UI/ThemedIcon';


type Props = {
   addProject: (name: string, weeklyLimit: string, dueDate: string, color: string) => void,
   closeModel: () => void,
   darkMode : boolean,
   name? : string | undefined,
   color? : string | undefined,
   weeklyLimit?: string | undefined,
   date? : string,
   deleteProject? : () => void
}

const NewProjectModal = (props : Props) => {
   const [name, setName] = useState('')
   const [nameState, setNameState] = useState(false)
   const [weeklyLimit, setWeeklyLimit] = useState('')
   const [weeklyLimitState, setWeeklyLimitState] = useState(false)
   const [color, setColor] = useState("")
   const [colorState, setColorState] = useState(false)
   const [dueDate, setDueDate] = useState('2022-03-03')
   const [dueDateState, setDueDateState] = useState(false)

   const {background} = Colors.getColors(props.darkMode);
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(props.darkMode)



   const nameCallback = (text: string, state:boolean) => {
      setName(text);
      setNameState(state);
   }

   const weeklyGoalCallback = (text: string, state:boolean) => {
      setWeeklyLimit(text);
      setWeeklyLimitState(state);
   }

   const DueDateCallback = (text: string, state:boolean) => {
      setDueDate(text);
      setDueDateState(state);
   }

   const createValidation = nameState && weeklyLimitState && colorState;

   return (
      <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
         <ScrollView style={{backgroundColor: backgroundDarker}}>
            <View style={{...styles.modal, backgroundColor: backgroundDarker}}>
            <View style={{width: '100%', paddingBottom: 20, paddingTop: 70, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
               <ThemedTitle style={{fontSize: 45}} darkMode={props.darkMode}>{props.name ? 'Update Project' : 'Create Project'}</ThemedTitle>
               {
                  props.deleteProject && <ThemedIcon darkMode={props.darkMode} onPress={props.deleteProject} icon={"ios-trash"} type="delete" size={35}/>
               }
            </View>
               <KeyboardAvoidingView style={{...styles.contentBox, ...background}} behavior={'padding'} keyboardVerticalOffset={10}>
                  <ThemedLabel style={{...styles.text}} darkMode={props.darkMode}>Name</ThemedLabel>
                  <ThemedInput validate={validateProjectName} setTextAndState={nameCallback} leftIcon="ios-text" validation={true} placeholder="Project name..." darkMode={props.darkMode} initialValue={props.name}/>
                  <ThemedLabel style={{...styles.text}} darkMode={props.darkMode}>Weekly Goal</ThemedLabel>
                  <ThemedInput validate={validateWeeklyLimit} setTextAndState={weeklyGoalCallback} leftIcon="cellular" validation={true} placeholder="Weekly goal..." darkMode={props.darkMode} type="number-pad" initialValue={props.weeklyLimit}/>
               </KeyboardAvoidingView>
               
               <ColorPicker darkMode={props.darkMode} pickColor={(color) => {
                     setColor(color);
                     setColorState(true)
                  }}
                  initialColor={props.color}/>

               <View style={styles.buttonsBox}>
                  <ThemedButton title="Cancel" 
                     darkMode={props.darkMode} 
                     disabled={false} 
                     onPress={() => props.closeModel()}
                     type="confirm" 
                     style={{ width: "48%", backgroundColor: backgroundLighter, paddingVertical: 10}}
                     colorText="reject"/>
                  <ThemedButton title={props.name ? 'Update' : 'Create'}
                     darkMode={props.darkMode} 
                     disabled={!createValidation} 
                     onPress={() => props.addProject(name, weeklyLimit, dueDate, color)}
                     type="confirm" 
                     style={{width: "48%", backgroundColor: backgroundLighter, paddingVertical: 10}}
                     colorText="accept"/>
               </View>
            </View>
         </ScrollView>
      </TouchableWithoutFeedback>
   )
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '80%',
      marginBottom: 20
   },
   modal: {
      alignItems: 'center',
      padding: 10,
      height: '100%',
      width: "100%",
      // borderColor: 'red',
      // borderWidth: 1
   },
   text: {
      textAlign: 'left',
      width: "80%",
   },
   contentBox: {
      width: "100%",
      maxWidth: 400,
      borderRadius: 20,
      alignItems: "center",
      paddingVertical: 30,
      marginBottom: 20
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      maxWidth: 400,
      marginBottom: 40
   },
})

export default NewProjectModal;