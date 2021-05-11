import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as userActions from '../store/user/action';
import { checkIfUserSignIn } from '../API/authorisation';
import * as Font from 'expo-font';
import { RootState, useAppSelector } from '../store/store'
import { useAssets } from 'expo-asset';
import Navigation from './Navigator';


const fakeTimer = new Promise(resolve => {
   setTimeout(() => {
      resolve(true)
   }, 5000)
})

const MainApp = () => {
   const dispatch = useDispatch()
   const userData = useAppSelector((state) => state.user);
   const [isLoading, setIsLoading] = useState(true);
   const [assets] = useAssets([require('../assets/background1_more_colors.png'),
      require('../assets/background1.png'),
      require('../assets/background1_half.png'),
      require('../assets/background_big.png'),
      require('../assets/background1_half_no_white.png'),
      require('../assets/background1_spread.png')
   ]);
   useEffect(() => {
      async function fetchKey() {
         console.log('checking if logged in');
         const user = await checkIfUserSignIn()
         if (user) {
            dispatch(userActions.signInAction(user.uid, user.email as string))
         }
         await Font.loadAsync({
            'open-sans' : require('../assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold' : require('../assets/fonts/OpenSans-Bold.ttf')
         })
         await fakeTimer;
         setIsLoading(false)
      }
      fetchKey()
   }, [])

   let assetsNotLoaded = true;
   if(assets) assetsNotLoaded = false;

   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }
   return <Navigation logOut={logOut} isLoggedIn={userData.isLoggedIn} appLoaded={isLoading || assetsNotLoaded}/>
}

export default MainApp