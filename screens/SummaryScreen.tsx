import React, {useEffect, useState} from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Button, useColorScheme, ScrollView} from 'react-native'
import Screen from '../components/UI/Screen';
import { keepGettingNotifications } from '../API/notifications';
import * as userActions from '../store/user/action';
import { useNavigation } from '@react-navigation/native';
import { SummaryNavigationProp } from '../navigation/navigationTypes';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/UI/CustomHeader';
import * as Colors from '../constants/Colors'
import Calendar from '../components/UI/Calendar';
import ThemedText from '../components/UI/ThemdText';
import ThemedLabel from '../components/UI/ThemedLabel';
import Card from '../components/UI/Card';
import Diagram from '../components/UI/Diagram';



type Props = {

}
const SummaryScreen = (props: Props) => {
   const logs = useAppSelector(state => state.myProjects.logs);
   const projects = useAppSelector(state => state.myProjects.projects);
   const weekHours = projects.reduce((sum, cur) => {
      sum += cur.weeklyDone
      return sum;
   }, 0)
   const totalHours = projects.reduce((sum, cur) => {
      sum += cur.totalHours
      return sum;
   }, 0)
   const projectNumber = projects.length;
   const complitedProjects = projects.reduce((sum, cur) => {
      if(cur.weeklyDone >= cur.weeklyLimit) {
         sum++;
      }
      return sum;
   }, 0)

   const dispatch = useDispatch();
   const navigation = useNavigation();
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(darkMode)

   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }

   const [diagramData, setDiagramData] = useState([{
      title: 'Mo',
      value: 10
      },
      {
         title: 'Tu',
         value: 5
      },
      {
         title: 'We',
         value: 7
      },
      {
         title: 'Th',
         value: 0
      },
      {
         title: 'Fr',
         value: 11
      },
      {
         title: 'Sa',
         value: -1
      },
      {
         title: 'Su',
         value: -1
      }
   ])

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
      <ScrollView>
         <Screen darkMode={darkMode} headerImage={true}>
            <Card darkMode={darkMode}>
               <View style={styles.projectName} >
                  <ThemedLabel style={{fontSize: 40, width: '70%'}} darkMode={darkMode}>Progress</ThemedLabel>
               </View>
               <View style={styles.scoreBox}>
                  <View style={{...styles.scoreSqare, backgroundColor: Colors.theme_red, marginRight: 20 }}>
                     <ThemedText darkMode={darkMode}>Week Hours</ThemedText>
                     <ThemedLabel darkMode={darkMode} style={{fontSize: 60}}>{weekHours}</ThemedLabel>
                  </View>
               
                  <View style={{...styles.scoreSqare, backgroundColor: Colors.theme_green}}>
                     <ThemedText darkMode={darkMode} style={{color: 'white'}}>Week Projects</ThemedText>
                     <ThemedLabel darkMode={darkMode} style={{color: 'white', fontSize: 60}}>{complitedProjects}/{projectNumber}</ThemedLabel>
                  </View>
               </View>
               <View style={{...styles.scoreBox, marginBottom: 10}}>
                  <View style={{...styles.scoreSqare, backgroundColor: Colors.theme_blue, marginRight: 20 }}>
                     <ThemedText darkMode={darkMode}>Total hours</ThemedText>
                     <ThemedLabel darkMode={darkMode} style={{ fontSize: 60}}>{totalHours}</ThemedLabel>
                  </View>
               
                  <View style={{...styles.scoreSqare, backgroundColor: Colors.theme_orange}}>
                     <ThemedText darkMode={darkMode} style={{color: 'white'}}>Total Weeks</ThemedText>
                     <ThemedLabel darkMode={darkMode} style={{color: 'white', fontSize: 60}}>0</ThemedLabel>
                  </View>
                  
               </View>
            </Card>
            <Diagram darkMode={darkMode} heigth={400} data={diagramData}/>
            <Calendar darkMode={darkMode} logs={logs} style={{marginBottom: 20}}/>
         </Screen>
      </ScrollView>
      
   )
}

const styles = StyleSheet.create({
   projectName: {
      width: '100%'
   },
   scoreBox: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '100%',
      marginTop: 20
   },
   scoreSqare: {
      alignItems: 'center',
      // width: '30%',
      flex: 1,
      borderRadius: 10,
      paddingTop: 15
   },
})

export default SummaryScreen;