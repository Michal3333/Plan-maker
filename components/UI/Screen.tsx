import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useRef } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Keyboard, View, ViewStyle, useColorScheme, Animated, Image, useWindowDimensions } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from './CustomHeader';
import LoadingIndicator from './LoadingIndicator';
import * as Colors from '../../constants/Colors'



type Props = {
   children: React.ReactNode
   style?: ViewStyle,
   withKeyboard?: boolean,
   headerImage?: boolean,
   darkMode : boolean
}
export const assets = [require('../../assets/headerColors1.png'), require('../../assets/screen-background-1.png')]


const Screen = (props: Props) => {
   const windowWidth = useWindowDimensions().width;
   const offsetAnim = useRef(new Animated.Value(-1 * windowWidth)).current
   const slideIn = () => {
      Animated.timing(offsetAnim, {
         toValue: 0, 
         duration:500,
         delay: 200, 
         useNativeDriver: false
      }).start()
   }
   useFocusEffect(
      
      React.useCallback(() => {
         if (props.headerImage) slideIn()
      }, [])
    );
   const inner = (
      <View style={{...styles.screen, ...props.style}}>
         {props.headerImage && 
            <Animated.View style={{height: "100%", width: '90%', position: 'absolute', top: 0, left: offsetAnim}}>
               <Image source={assets[1]} resizeMode='cover' style={{ height: '100%', width: '100%', borderTopRightRadius: 20, borderBottomRightRadius: 20}}/>
            </Animated.View>
         }
         {
            props.children
         }
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
      paddingHorizontal: 10,
   }
})


export default Screen;