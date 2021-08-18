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
import ThemedButton from '../components/UI/ThemedButton';



type Props = {

}

const SettingsScreen = (props: Props) => {
   const dispatch = useDispatch();

   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";

   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }

   return (
      <Screen darkMode={darkMode}>
          <View style={styles.buttonsBox}>
               <ThemedButton title="Log out" 
                  darkMode={darkMode} 
                  disabled={false} 
                  onPress={logOut}
                  type="confirm" 
                  style={{ width: "40%",  paddingVertical: 10, marginTop: 20, }}/>
            </View>
      </Screen>
   )
}

const styles = StyleSheet.create({
   contentBox: {
      alignItems: 'center',
      width: '90%'
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-around",
      // marginTop: 20,
      maxWidth: 400,
      marginBottom: 20
   },
})

export default SettingsScreen;