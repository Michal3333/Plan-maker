import { Ionicons, } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'


type Props = {
   initialValue? : string
   style?: ViewStyle,
   leftIcon?: "mail" | "key-sharp",
   validation: boolean,
   validate: (text: string) => {state: boolean, error: string},
   setTextAndState: (text: string, state: boolean) => void,
   placeholder: string,
   darkMode: boolean,
}

type ValidationState = 'valid' | 'notValid' | null

const getValidationColor = (state: ValidationState) => {
   if (state === 'valid') {
      return Colors.green
   } else if (state === 'notValid') {
      return Colors.red
   }
}


const ThemedInput = ({style, leftIcon, validation, validate, setTextAndState, placeholder, darkMode, initialValue} : Props) => {
   const [text, setText] = useState(initialValue ? initialValue : "");
   const [validationState, setValidationState] = useState<ValidationState>(null);
   const [errorText, setErrorText] = useState('')
   const validationColor = getValidationColor(validationState);
   const { textColor, borderBottom, inputStyle, errorTextStyle } = Colors.getColors(darkMode);
   useEffect(() => {
      if(validationState !== null){
         const {state, error} = validate(text);
         setValidationState(state ? 'valid' : 'notValid');
         setErrorText(error);
         setTextAndState(text, state);
      }
   }, [validate])
   

   return (
      <View style={styles.box}>
         <View style={{...styles.inputBox, ...style, ...borderBottom}}>
               {leftIcon && <Ionicons style={styles.icon} name={leftIcon} size={20} color={"black"}/>}
               <TextInput style={{...styles.input, ...textColor, ...inputStyle}} value={text} onChangeText={(text) => setText(text)} onEndEditing={() => {
                  const {state, error} = validate(text);
                  setValidationState(state ? 'valid' : 'notValid');
                  setErrorText(error);
                  setTextAndState(text, state);
               }}
               placeholder={placeholder}/>
               {validation && validationState && <Ionicons name={validationState === 'valid' ? 'checkmark-circle' : 'close-circle'} size={25} color={validationColor}/>}
         </View>
         <Text style={{...styles.errorText, ...errorTextStyle}}>{errorText}</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   box: {
      marginBottom: 15,
      width: '80%'
   },
   inputBox: {
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
   },
   input: {
      width: '85%',
     
   },
   icon:{
      marginRight: 10
   },
   errorText: {
      textAlign: 'left',
      width: '80%',
   }
})

export default ThemedInput;