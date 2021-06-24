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
import { timeLog } from '../../API/userData';
import Calendar from '../UI/Calendar';
import Diagram from '../UI/Diagram';
import { prepareDataForDiagram } from '../../utils/Utils';

type Props = {
   closeModel: () => void,
   darkMode : boolean,
   logs: timeLog[]
}

const StatsModal = (props : Props) => {
   const {background} = Colors.getColors(props.darkMode);
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(props.darkMode);
   const diagramData = prepareDataForDiagram(props.logs)

   return (
         <ScrollView style={{backgroundColor: backgroundDarker}}>
            <View style={{...styles.modal, backgroundColor: backgroundDarker}}>
               <View style={{width: '100%', paddingBottom: 0, paddingTop: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <ThemedTitle style={{fontSize: 45}} darkMode={props.darkMode}>Statistics</ThemedTitle>
                  <ThemedButton title="Close" 
                     darkMode={props.darkMode} 
                     disabled={false} 
                     onPress={() => props.closeModel()}
                     type="confirm" 
                     style={{ width: "30%", backgroundColor: backgroundLighter}}
                     colorText="reject"/>
               </View>
               <Calendar darkMode={props.darkMode} logs={props.logs} withLegend={true}/>
               <Diagram darkMode={props.darkMode} heigth={350} data={diagramData}/>
               {/* <View style={styles.buttonsBox}>
                  <ThemedButton title="Cancel" 
                     darkMode={props.darkMode} 
                     disabled={false} 
                     onPress={() => props.closeModel()}
                     type="confirm" 
                     style={{ width: "48%", backgroundColor: backgroundLighter, paddingVertical: 10}}
                     colorText="reject"/>
               </View> */}
            </View>
         </ScrollView>
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

export default StatsModal;