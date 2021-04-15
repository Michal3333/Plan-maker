import React from 'react';
import { StyleSheet, View, Button, ActivityIndicator } from 'react-native'
import { useAppSelector } from '../../store/store'



type Props = {
   children: React.ReactNode
}
export const LoadingScreen = (WrappeedScreen : React.ComponentType<any>) => {
   const Screen = (props: any) => {
      const isLoading = useAppSelector(state => state.user.pendingLoggin)
      console.log('xd')
      return (
         <>
            <WrappeedScreen {...props}/>
            {isLoading && <View style={styles.loading}>
               <ActivityIndicator size='large' />
            </View>}
         </>
      )
   }
   return Screen
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
    }
})
