import React, {useEffect} from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Button, useColorScheme} from 'react-native'
import Screen from '../components/UI/Screen';
import { keepGettingNotifications } from '../API/notifications';
import * as userActions from '../store/user/action';
import { useNavigation } from '@react-navigation/native';
import { SummaryNavigationProp } from '../navigation/navigationTypes';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeader';
import * as Colors from '../constants/Colors'
import Calendar from '../components/UI/Calendar';



type Props = {

}

const SummaryScreen = (props: Props) => {
   const logs = useAppSelector(state => state.myProjects.logs);
   const dispatch = useDispatch();
   const navigation = useNavigation();
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }

   useEffect(() => {
      navigation.setOptions({
         headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <Item title='settings' iconName={'ios-settings'} iconSize={25} onPress={() => {navigation.navigate('Settings', {screen: 'Settings'})}}/>
            </HeaderButtons>
         ),
         headerLeft : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <Item title='notification' iconName={'notifications'} iconSize={20} onPress={() => {navigation.navigate('Notifications', {screen: 'Messages'})}}/>
            </HeaderButtons>
         )
      })
   }, [])

   return (
      <Screen darkMode={darkMode}>
         <Calendar darkMode={darkMode} logs={logs}/>
      </Screen>
   )
}

const styles = StyleSheet.create({

})

export default SummaryScreen;