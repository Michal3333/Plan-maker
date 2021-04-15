import React from 'react';
import { StyleSheet, View, Button, ActivityIndicator, Text } from 'react-native'



type Props = {

}

const LoadingIndicator = (props: Props) => {

   return (
      <View style={styles.loading}>
         <ActivityIndicator size='large' />
         <Text style={styles.text}>Loading...</Text>
      </View>
   )
}

const styles = StyleSheet.create({
   loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(52, 52, 52, 0.6)'
   },
   text: {
      color: 'white',
      marginTop: 20,
      fontSize: 18
      
   }
})

export default LoadingIndicator;