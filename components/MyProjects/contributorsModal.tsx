import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, TextInput, FlatList } from 'react-native'
import Contributor from '../../models/Contributor';
import Card from '../UI/Card';
import Screen from '../UI/Screen';
import ThemedButton from '../UI/ThemedButton';
import ThemedIcon from '../UI/ThemedIcon';
import ThemedLabel from '../UI/ThemedLabel';
import * as Colors from '../../constants/Colors'
import ThemedTitle from '../UI/ThemedTitle';



type Props = {
   addConributor: (email: string) => void,
   closeModel: () => void,
   contributors : Contributor[],
   deleteContributor: (contributorId: string) => void,
   darkMode: boolean,
   color: string,
   shared: boolean,
   convertToShared : () => void,
   convertToNormal: () => void

}

const ContributorsModal = (props : Props) => {
   const [email, setEmail] = useState('');
   const {backgroundLighter, backgroundDarker} = Colors.getColorsForNavigator(props.darkMode)

   const [tasksEditMode, setTasksEditMode] = useState(false)

   
   const editButtonText = tasksEditMode ? "Cancel" : "Edit"

   return (
      // <Screen style={styles.modal} darkMode={false}>
      //    {/* <Text>email</Text>
      //    <TextInput style={styles.input} onChangeText={(text) => setEmail(text)} value={email} />
      //    <View>
      //       <Button title="Add" onPress={() => props.addConributor(email)}/>
      //       <Button title="Cancel" onPress={props.closeModel}/>
      //    </View>
      //    <FlatList data={props.contributors} renderItem={(itemData) => <View>
      //          <Text>{itemData.item.contributorMail}</Text>
      //          <Button title="delete" onPress={() => {props.deleteContributor(itemData.item.id)}}/>
      //       </View>}/> */}
      // </Screen>
      <View style={styles.modal}>
          
          <Card darkMode={props.darkMode} style={{width: '100%', marginBottom: 20}}>
            <View style={{width: '100%', marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
               <ThemedTitle style={{fontSize: 45}} darkMode={props.darkMode}>Contributors</ThemedTitle>
               {props.shared && <ThemedIcon darkMode={props.darkMode} onPress={props.convertToNormal} icon={"people-circle-sharp"} type="delete" size={40} style={{padding: 0, margin: 0}}/>}
            </View>
            <View style={{ ...styles.tasksBar}}>
               <ThemedIcon darkMode={props.darkMode} icon='ios-add' onPress={() => {}} color={props.shared ? props.color : 'gray'} style={{ ...styles.addTaskIcon, backgroundColor: backgroundDarker}} size={35} />
               <ThemedButton darkMode={props.darkMode} onPress={() => {}} disabled={!props.shared} title={editButtonText} type='confirm' style={{paddingHorizontal: 20, marginLeft: 5}}/>
            </View>
            {props.contributors.length > 0 ?
               <View style={styles.list}>
                  {
                     <FlatList data={props.contributors} renderItem={(itemData) => <Text>{itemData.item.contributorMail}</Text>}/>
                  }
               </View>
               :
               <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: backgroundDarker, width: '100%', marginTop: 10, borderRadius: 20, height:250}}>
                  <ThemedLabel style={{fontSize: 20}} darkMode={props.darkMode}>{props.shared ? "No Contributors" : "Project not shared"}</ThemedLabel>
                  {!props.shared && <ThemedButton title={'Convert to shared'} darkMode={props.darkMode} onPress={props.convertToShared} disabled={false} type="confirm" style={{backgroundColor : backgroundLighter, paddingHorizontal: 20, marginTop: 20}}/>}
               </View>
            }
            <View style={styles.buttonsBox}>
               <ThemedButton title="Close" 
                  darkMode={props.darkMode} 
                  disabled={false} 
                  onPress={() => props.closeModel()}
                  type="confirm" 
                  style={{ width: "100%", marginBottom: 0}}/>
            </View>
         </Card>
        
      </View>
      
   )
}

const styles = StyleSheet.create({
   input: {
      height: 40,
      borderBottomColor: 'gray',
      borderBottomWidth: 1,
      width: '80%',
      marginBottom: 20
   },
   modal: {
      alignItems: 'center',
      padding: 10,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      height: '100%',
      justifyContent: 'center'
   },
   tasksBar: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      width: '100%'
   },
   list : {
      width: '100%',
      marginTop: 10,
   },
   buttonsBox: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 15,
      maxWidth: 400,
      // marginBottom: 40
   },
   addTaskIcon: {
      padding: 2, 
      paddingHorizontal: 15,  
      margin: 0, 
      backgroundColor: 'black', 
      borderRadius: 20
   },
})

export default ContributorsModal;