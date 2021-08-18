import React, {useState} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated, TouchableWithoutFeedback, Keyboard, Switch } from 'react-native';
import * as Colors from '../../constants/Colors'
import { sortID, sortOption } from '../../store/types';
import { validateTaskName } from '../../utils/validators';
import ThemedButton from '../UI/ThemedButton';
import ThemedInput from '../UI/ThemedInput';
import ThemedLabel from '../UI/ThemedLabel';

type Props = {
   darkMode: boolean,
   closeModal : () => void,
   sortOptions : sortOption[],
   changeOption: (id: sortID) => void
}



const SortModal = ({darkMode, closeModal, sortOptions, changeOption} : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode);
   const sortBoxes = sortOptions.map(x => {
      return <View key={x.id} style={{flexDirection: 'row', marginBottom: 20}}>
         <Switch style={{transform: [{ scaleX: .8 }, { scaleY: .8 }], marginRight: 20}}
            value={x.selected}
            onValueChange={() => {changeOption(x.id)}}/>
         <ThemedLabel darkMode={darkMode}>{x.text}</ThemedLabel>
      </View>
   })
   return (
         <View style={{...styles.centeredView, backgroundColor: 'rgba(0, 0, 0, 0.7)'}}>
         <View style={{backgroundColor: backgroundLighter, borderRadius: 20, ...styles.contentBox}}>
            {/* <ThemedLabel style={{...styles.text}} darkMode={darkMode}>Sort</ThemedLabel> */}
            <View style={{marginTop: 40}}>
               {sortBoxes}
            </View>
            <View style={styles.buttonsBox}>
               <ThemedButton title="Cancel" 
                  darkMode={darkMode} 
                  disabled={false} 
                  onPress={closeModal}
                  type="confirm" 
                  style={{ width: "40%",  paddingVertical: 10}}
                  colorText="reject"/>
            </View>
         </View>
      </View>
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

export default SortModal;