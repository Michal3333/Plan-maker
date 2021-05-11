import React from 'react';
import { StyleSheet, View, Text, ImageBackground} from 'react-native'

type Props = {

}

export const assets = [require('../assets/background1_spread.png')]

const SplashScreen = (props: Props) => {
   return (
      <ImageBackground source={assets[0]} style={styles.imgBackground} resizeMode="cover" >
         <View style={styles.testColor}>
            <Text style={styles.spashScreenText}>Splash screen</Text>
         </View>
      </ImageBackground>
      
   )
}

const styles = StyleSheet.create({
   testColor: {
      width: '100%',
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center'
   },
   spashScreenText : {
      color: "#1D272B",
      fontSize: 80,
      fontWeight: 'bold',
   },
   imgBackground: {
      width: '100%',
      height: '100%',
      flex: 1 
   },
})

export default SplashScreen;