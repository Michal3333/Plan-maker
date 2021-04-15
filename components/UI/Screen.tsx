import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, Keyboard, View, ViewStyle } from 'react-native'
import LoadingIndicator from './LoadingIndicator';



type Props = {
   children: React.ReactNode
   style?: ViewStyle
}

const Screen = (props: Props) => {
   return (
      <TouchableWithoutFeedback  onPress={() => Keyboard.dismiss()}>
         <View style={{...styles.screen, ...props.style}}>
            {
               props.children
            }
            <LoadingIndicator/>
         </View>
         
      </TouchableWithoutFeedback>
   )
}

const styles = StyleSheet.create({
   screen: {
      flex: 1,
      alignItems: 'center',
   }
})


export default Screen;