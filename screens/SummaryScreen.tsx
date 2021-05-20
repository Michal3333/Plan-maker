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



type Props = {

}

const SummaryScreen = (props: Props) => {
   const userData = useAppSelector(state => state.user);
   const dispatch = useDispatch();
   const navigation = useNavigation();
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   const {iconColor} = Colors.getColorsForNavigator(darkMode);
   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }

   useEffect(() => {
      navigation.setOptions({
         headerRight : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <Item title='log out' iconName={'log-out'} color={iconColor} onPress={logOut}/>
            </HeaderButtons>
         ),
         headerLeft : () => (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
               <Item title='Orders' iconName={'notifications-circle'} color={iconColor} onPress={() => {navigation.navigate('Notifications', {screen: 'Messages'})}}/>
            </HeaderButtons>
         )
      })
   }, [iconColor])

   return (
      <Screen>
         <Text>{userData.id}</Text>
         {/* <Button title="Test rules" onPress={() => {testRules()}}/> */}
      </Screen>
   )
}

const styles = StyleSheet.create({

})

export default SummaryScreen;