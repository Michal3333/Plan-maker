import React, { useRef } from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text, FlatList, Animated, Image, useWindowDimensions, useColorScheme} from 'react-native'
import Screen from '../components/UI/Screen';
import InvitationElement from '../components/Invitations/InvitationElement';
import * as InvitationsActions from '../store/invitations/action'
import { useFocusEffect } from '@react-navigation/native';
import ThemedTitle from '../components/UI/ThemedTitle';
type Props = {

}

export const assets = [require('../assets/headerColors1.png')]

const InvitationsScreen = (props: Props) => {
   const invitations = useAppSelector(state => state.invitations.invitations);
   const dispatch = useDispatch()
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   const windowWidth = useWindowDimensions().width;
   const offsetAnim = useRef(new Animated.Value(-1 * windowWidth)).current
   const slideIn = () => {
      Animated.timing(offsetAnim, {
         toValue: 0, 
         duration:500,
         // delay: 200, 
         useNativeDriver: false
      }).start()
   }
   useFocusEffect(
      React.useCallback(() => {
         slideIn()
      }, [])
   );
   return (
      <Screen style={{padding: 0}}>
          <Animated.View style={{height: 150, width: '85%', position: 'absolute', top: 0, left: offsetAnim}}>
            <Image source={assets[0]} resizeMode='cover' style={{ height: '100%', width: '100%', borderTopRightRadius: 20, borderBottomRightRadius: 20}}/>
         </Animated.View>
         <FlatList style={styles.list} data={invitations} renderItem={itemData => <InvitationElement 
            id={itemData.item.id} 
            projectName={itemData.item.projectName}
            ownerEmail={itemData.item.fromMail}
            sendAnswer={(answer: boolean) => {
               dispatch(InvitationsActions.asyncAnswerInvitation(itemData.item.id, answer))
            }}
            darkMode={darkMode}
            />
         }
         ListHeaderComponent={<ThemedTitle style={{fontSize: 50}} darkMode={darkMode}>Invitations</ThemedTitle>}/>
      </Screen>
   )
}

const styles = StyleSheet.create({
   list: {
      width: "100%",
      padding: 10
   }
})

export default InvitationsScreen;