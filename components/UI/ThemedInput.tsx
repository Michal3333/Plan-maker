import { Ionicons, } from '@expo/vector-icons';
import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, ViewStyle, TextInput, Animated } from 'react-native';
import * as Colors from '../../constants/Colors'


type Props = {
   initialValue? : string
   style?: ViewStyle,
   leftIcon?: "mail" | "key-sharp" | "ios-text" | "ios-calendar" | "cellular" | "time-sharp",
   validation: boolean,
   validate: (text: string) => {state: boolean, error: string},
   setTextAndState: (text: string, state: boolean) => void,
   placeholder: string,
   darkMode: boolean,
   type? : 'number-pad',
}

type ValidationState = 'valid' | 'notValid' | null

const getValidationColor = (state: ValidationState) => {
   if (state === 'valid') {
      return Colors.green
   } else if (state === 'notValid') {
      return Colors.red
   }
}


const ThemedInput = ({style, leftIcon, validation, validate, setTextAndState, placeholder, darkMode, initialValue, type} : Props) => {
   const [text, setText] = useState(initialValue ? initialValue : "");
   const [validationState, setValidationState] = useState<ValidationState>(initialValue ? 'valid' : null);
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
      <View style={{...styles.box, ...style}}>
         <View style={{...styles.inputBox, ...borderBottom }}>
               {leftIcon && <Ionicons style={styles.icon} name={leftIcon} size={20} color={Colors.primary}/>}
               <TextInput style={{...styles.input, ...textColor, ...inputStyle}} value={text} 
                  keyboardType={type ? type : "default"}
                  onChangeText={(inputText) => {
                     const {state, error} = validate(inputText);
                     if(validationState === null){
                        if(state){
                           setValidationState('valid');
                           setErrorText(error);
                        }
                     } else {
                        setValidationState(state ? 'valid' : 'notValid');
                        setErrorText(error);
                     }
                     setTextAndState(inputText, state);
                     setText(inputText);
                     
                  }} 
                  onEndEditing={() => {
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
      width: '80%',
      // borderColor: 'red',
      // borderWidth: 2
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