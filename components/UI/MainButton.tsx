import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Platform, TouchableNativeFeedback, ViewStyle} from 'react-native';
type Props = {
   onPress : () => void,
   style?: ViewStyle,
   children?: React.ReactNode,
   title: string

}
const MainButton = (props: Props) => {
   return (
      <TouchableOpacity onPress={props.onPress}>
         <View style={{...styles.button, ...props.style}}>
         <Text style={styles.buttonText}>{props.title}</Text>
            {/* <Text style={styles.buttonText}>{props.children}</Text> */}
         </View>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   button: {
      backgroundColor: '#2A9D8F',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderRadius: 20
   },
   buttonText: {
      color: 'white',
      fontFamily: 'open-sans',
      fontSize: 18
   }
})

export default MainButton;