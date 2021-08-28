import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Animated } from 'react-native'
import Card from '../UI/Card';
import ProgressIndicator from '../UI/ProgressIndicator';
import ThemedText from '../UI/ThemdText';
import ThemedButton from '../UI/ThemedButton';
import ThemedLabel from '../UI/ThemedLabel';
import * as Colors from '../../constants/Colors'
import InfoBox from '../UI/InfoBox';


type Props = {
   id: string,
   name: string,
   openDetails: () => void,
   darkMode: boolean,
   goal : number,
   done: number,
   color: string,
   total: number,
   owner: string,
   allowMessages: boolean,
   allowDetails : boolean,
   openModal: ()=> void,
   complited: number
}

const OtherProjectBox = (props : Props) => {
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(props.darkMode)
   const animatedOpacity = useRef(new Animated.Value(0)).current;
   useEffect(() => {
      Animated.timing(animatedOpacity, {
         toValue: 1,
         duration: 300,
         useNativeDriver: false
      }).start();
   }, [])

   return (
      <Animated.View style={{opacity: animatedOpacity}}>
         <Card darkMode={props.darkMode}>
            <View style={styles.projectName} >
               <ThemedLabel style={{fontSize: 40, width: '70%'}} darkMode={props.darkMode}>{props.name}</ThemedLabel>
            </View>
            <ProgressIndicator darkMode={props.darkMode} max={props.goal} current={props.done} color={props.color} style={{marginTop: 10}}/>
            <ThemedLabel style={{width: '100%', marginTop: 20}} darkMode={props.darkMode}> Owner : {props.owner}</ThemedLabel>
            <View style={styles.scoreBox}>
               <InfoBox darkMode={props.darkMode} backgroudColor={backgroundDarker} label={'Total hours'} text={props.total.toString()} style={{marginRight: 20}} textColor={props.color}/>
               <InfoBox darkMode={props.darkMode} backgroudColor={props.color} label={'Complited Weeks'} text={props.complited ? props.complited.toString() : '0'}/>
            </View>
           
            <View style={styles.buttonsBox}>
               <ThemedButton title="Message" 
                  darkMode={props.darkMode} 
                  disabled={!props.allowMessages} 
                  onPress={props.openModal}
                  type="confirm" 
                  style={{ width: "48%"}}/>
               <ThemedButton title="Details" 
                  darkMode={props.darkMode} 
                  disabled={!props.allowDetails} 
                  onPress={props.openDetails}
                  type="confirm" 
                  style={{width: "48%"}}/>
            </View>
         </Card>
      </Animated.View>
      

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
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      maxWidth: 400,
      marginBottom: 10
   },

  
})

export default OtherProjectBox;