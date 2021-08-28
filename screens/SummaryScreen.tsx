import React, {useEffect, useState} from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, Button, useColorScheme, ScrollView, Modal} from 'react-native'
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
import { prepareDataForDiagram } from '../utils/Utils';
import WeeklyRaportModal from '../components/UI/WeeklyRaportModal';
import InfoBox from '../components/UI/InfoBox'



type Props = {

}
const SummaryScreen = (props: Props) => {
   const logs = useAppSelector(state => state.myProjects.logs);
   const projects = useAppSelector(state => state.myProjects.projects);
   const complitedWeeks = useAppSelector(state => state.myProjects.complitedWeeks);
   const raportData = useAppSelector(state => state.user.raportObjects)
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
   const diagramData =  prepareDataForDiagram(logs)

   const [raportModal, setRaportModal] = useState(false);
   
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

   useEffect(() => {
      
      if(raportData){
         setTimeout(() => {
         if(raportData.length > 0) {
            setRaportModal(true);
         }
         }, 500)
      } 
   }, [raportData])
   return (
      <ScrollView>
         <Screen darkMode={darkMode} headerImage={true}>
         <Modal animationType='fade'
            visible={raportModal} 
            transparent={true}>
               <WeeklyRaportModal darkMode={darkMode} 
               closeModal={async () => {
                  const result = await dispatch(userActions.asyncDeleteRaport());
                  //@ts-ignore
                  if(result) {
                     setRaportModal(false)
                  }
               }} 
               data={raportData}
         />
         </Modal>
            <Card darkMode={darkMode}>
               <View style={styles.projectName} >
                  <ThemedLabel style={{fontSize: 40, width: '70%'}} darkMode={darkMode}>Progress</ThemedLabel>
               </View>
               <View style={styles.scoreBox}>
                  <InfoBox darkMode={darkMode} backgroudColor={Colors.theme_red} label={'Weekly Hours'} text={weekHours.toString()} style={{marginRight: 20}}/>
                  <InfoBox darkMode={darkMode} backgroudColor={Colors.theme_green} label={'Weekly Projects'} text={`${complitedProjects}/${projectNumber}`}/>
               </View>
               <View style={{...styles.scoreBox, marginBottom: 10}}>
                  <InfoBox darkMode={darkMode} backgroudColor={Colors.theme_blue} label={'Total hours'} text={totalHours.toString()} style={{marginRight: 20}}/>
                  <InfoBox darkMode={darkMode} backgroudColor={Colors.theme_orange} label={'Weekly Projects'} text={`${complitedWeeks}`}/>
               </View>
            </Card>
            <Diagram darkMode={darkMode} heigth={350} data={diagramData}/>
            <Calendar darkMode={darkMode} logs={logs} style={{marginBottom: 20}} withLegend={true}/>
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