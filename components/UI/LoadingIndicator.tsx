import React from 'react';
import { StyleSheet, View, Button, ActivityIndicator, Text, useWindowDimensions } from 'react-native';
import { useAppSelector } from '../../store/store'



type Props = {
   darkMode: boolean,
}

const LoadingIndicator = ({darkMode}: Props) => {
   const loading = useAppSelector(state => state.pendingStatus.pendingLoggin);
   return (
      <>
      {loading &&
         <View style={{...styles.loading}} pointerEvents={'box-none'}>
            <View style={styles.blocking}>
               <View style={styles.indicatorBox}>
                  <ActivityIndicator size='large' />
                  <Text style={styles.text}>Loading...</Text>
               </View>
            </View>
         </View>
      }
      </>
   )
}

const styles = StyleSheet.create({
   loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      zIndex: 2,
   },
   text: {
      color: 'white',
      marginTop: 20,
      fontSize: 18,
      fontFamily: 'open-sans-bold',
   },
   indicatorBox: {
      backgroundColor: '#141418',
      paddingVertical: 40,
      paddingHorizontal: 60,
      borderRadius: 20
   },
   blocking: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   }
})

export default LoadingIndicator;