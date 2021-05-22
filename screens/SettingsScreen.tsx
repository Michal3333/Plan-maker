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

const SettingsScreen = (props: Props) => {
   const dispatch = useDispatch();
   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }

   return (
      <Screen>
         <Button title="log out" onPress={logOut} color="white"/>
      </Screen>
   )
}

const styles = StyleSheet.create({

})

export default SettingsScreen;