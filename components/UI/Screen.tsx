import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Keyboard, View, ViewStyle } from 'react-native'
import LoadingIndicator from './LoadingIndicator';



type Props = {
   children: React.ReactNode
   style?: ViewStyle,
   withKeyboard?: boolean
}

const Screen = (props: Props) => {
   const inner = (
      <View style={{...styles.screen, ...props.style}}>
         {
            props.children
         }
         <LoadingIndicator/>
      </View>
   )
   if(props.withKeyboard){
      return (
         <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
            {
               inner
            }
         </TouchableWithoutFeedback>
      )
   } else {
      return inner
   }
   
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      alignItems: 'center',
      padding: 10
   }
})


export default Screen;