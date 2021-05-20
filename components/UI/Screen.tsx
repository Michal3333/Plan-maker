import { DrawerActions, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Keyboard, View, ViewStyle, useColorScheme } from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from './CustomHeader';
import LoadingIndicator from './LoadingIndicator';
import * as Colors from '../../constants/Colors'



type Props = {
   children: React.ReactNode
   style?: ViewStyle,
   withKeyboard?: boolean,
}

const Screen = (props: Props) => {
   // useEffect(() => {
   //    if(props.withNotificationButton){
   //       navigation.setOptions({
   //          headerLeft : () => (
   //             <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
   //                <Item title='Orders' iconName={'notification-circle'} color={iconColor} onPress={() => {navigation.navigate("")}}/>
   //             </HeaderButtons>
   //          )
   //       })
   //    }
      
   // }, [iconColor])
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
      padding: 10,
   }
})


export default Screen;