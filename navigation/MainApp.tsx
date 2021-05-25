import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action';
import { checkIfUserSignIn } from '../API/authorisation';
import * as Font from 'expo-font';
import { RootState, useAppSelector } from '../store/store'
import { useAssets } from 'expo-asset';
import Navigation from './Navigator';
import { useColorScheme } from 'react-native';
import LoadingIndicator from '../components/UI/LoadingIndicator';


const fakeTimer = new Promise(resolve => {
   setTimeout(() => {
      resolve(true)
   }, 1500)
})

const MainApp = () => {
   const dispatch = useDispatch()
   const userData = useAppSelector((state) => state.user);
   const [isLoading, setIsLoading] = useState(true);
   const [assets] = useAssets([
      require('../assets/light_no_line.png'),
      require('../assets/background-black.png'),
      require('../assets/dark_reverse.png'),
      require('../assets/light_reverse.png'),
      require('../assets/headerColors1.png'),
   ]);
   let colorScheme = useColorScheme();
   const darkMode = colorScheme === "dark";
   colorScheme = colorScheme ? colorScheme : "light";
   useEffect(() => {
      async function fetchKey() {
         console.log('checking if logged in');
         const user = await checkIfUserSignIn()
         if (user) {
            dispatch(userActions.signInAction(user.uid, user.email as string))
         }
         await Font.loadAsync({
            'open-sans' : require('../assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold' : require('../assets/fonts/OpenSans-Bold.ttf'),
            'russo-one': require('../assets/fonts/RussoOne.ttf'),
            'source-sans-pro-bold' : require('../assets/fonts/SourceSansPro-Bold.ttf'),
         })
         await fakeTimer;
         setIsLoading(false)
      }
      fetchKey()
   }, [])

   let assetsNotLoaded = true;
   if(assets) assetsNotLoaded = false;

   
   return (
      <>
         <LoadingIndicator darkMode={darkMode}/>
         <Navigation theme={colorScheme} isLoggedIn={userData.isLoggedIn} appLoaded={isLoading || assetsNotLoaded}/> 
      </>
   )
}

export default MainApp