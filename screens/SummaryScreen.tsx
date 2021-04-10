import React from 'react';
import { useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { StyleSheet, View, Text} from 'react-native'

type Props = {

}

const SummaryScreen = (props: Props) => {
   const userData = useAppSelector(state => state.user)
   return (
      <View>
         <Text>{userData.id}</Text>
      </View>
   )
}

const styles = StyleSheet.create({

})

export default SummaryScreen;