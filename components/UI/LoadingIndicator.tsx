import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Button, ActivityIndicator, Text, useWindowDimensions, Animated } from 'react-native';
import { useAppSelector } from '../../store/store'
import * as Colors from '../../constants/Colors'



type Props = {
   darkMode: boolean,
}

const LoadingIndicator = ({darkMode}: Props) => {
   const loading = useAppSelector(state => state.pendingStatus.pendingLoggin);
   const {buttonTextStyleConfirm, background, textColor} = Colors.getColors(darkMode)
   const opacityAll = useRef(new Animated.Value(0)).current;
   const opacityIndicator = useRef(new Animated.Value(0)).current;
   const [loadingVisible, setLoadingVisible] = useState(false)

   useEffect(() => {
      if(loading) {
         setLoadingVisible(true)
         Animated.timing(opacityAll, {
            toValue: 100,
            duration: 500,
            useNativeDriver: false
         }).start();
         Animated.timing(opacityIndicator, {
            toValue: 1,
            duration: 500,
            useNativeDriver: false
         }).start();
      } else {
         setTimeout(() => {
            setLoadingVisible(false)
         }, 500)
         Animated.timing(opacityAll, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
         }).start();
         Animated.timing(opacityIndicator, {
            toValue: 0,
            duration: 500,
            useNativeDriver: false
         }).start();
      }

   }, [loading])
   return (
      <>
      {loadingVisible &&
         <View style={{...styles.loading}} pointerEvents={'box-none'}>
            <Animated.View style={{...styles.blocking, backgroundColor: opacityAll.interpolate({inputRange:[0, 100], outputRange: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.7)']})}}>
               <Animated.View style={{...styles.indicatorBox, ...background, opacity: opacityIndicator}}>
                  <ActivityIndicator size='large' />
                  <Text style={{...styles.text, ...buttonTextStyleConfirm, ...textColor}}>Loading...</Text>
               </Animated.View>
            </Animated.View>
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
      marginTop: 20,
   },
   indicatorBox: {
      paddingVertical: 40,
      paddingHorizontal: 60,
      borderRadius: 20
   },
   blocking: {
      height: '100%',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
   }
})

export default LoadingIndicator;