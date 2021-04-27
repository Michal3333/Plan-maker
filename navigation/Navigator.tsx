import React, { useState, useEffect } from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions, StackNavigationProp, } from '@react-navigation/stack';
import { createBottomTabNavigator, BottomTabBarOptions, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerNavigationOptions, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { AppDrawerParamList, InvitationsStackParamList, LoginStackParamList, MessagesStackParamList, MyProjectsStackParamList, NotificationTabNavigationParamList, OtherProjectsStackParamList, SummaryStackParamList, TabNavigationParamList } from './navigationTypes';
import LoginScreen from '../screens/LoginScreen';
import SummaryScreen from '../screens/SummaryScreen';
import MyProjectsScreen from '../screens/MyProjectsScreen';
import OtherProjectsScreen from '../screens/OtherProjectsScreen';
import ProjectDetailsScreen from '../screens/ProjectDetailsScreen';
import SignInScreen from '../screens/SignUpScreen';
import { RootState, useAppSelector } from '../store/store'
import { useDispatch } from 'react-redux';
import { DrawerActions } from '@react-navigation/native';


import SplashScreen from '../screens/SpalshScreen';
import * as SecureStore from 'expo-secure-store';
import * as userActions from '../store/user/action'
import { checkIfUserSignIn } from '../API/authorisation';
import MessagesScreen from '../screens/MessagesScreen';
import InvitationsScreen from '../screens/InvitationsScreen';
// import CustomDrawerContent from './CustomDrawer';


const AppDrawerNavigator = createDrawerNavigator<AppDrawerParamList>();
const LoginStack = createStackNavigator<LoginStackParamList>();
const AppTab = createBottomTabNavigator<TabNavigationParamList>();
const SummaryStack = createStackNavigator<SummaryStackParamList>();
const MyProjectsStack = createStackNavigator<MyProjectsStackParamList>();
const OtherProjecstStack = createStackNavigator<OtherProjectsStackParamList>();
const NotificationsTab = createBottomTabNavigator<NotificationTabNavigationParamList>();
const MessagesStack = createStackNavigator<MessagesStackParamList>();
const InvitationsStack = createStackNavigator<InvitationsStackParamList>();



const Navigation = () => {
   const userData = useAppSelector((state) => state.user);
   const [isLoading, setIsLoading] = useState(true);
   const dispatch = useDispatch()

   useEffect(() => {
      async function fetchKey() {
         console.log('checking if logged in');
         const user = await checkIfUserSignIn()
         if (user) {
            dispatch(userActions.signInAction(user.uid, user.email as string))
         }
         setIsLoading(false)
      }
      fetchKey()
   }, [])

   const logOut = () => {
      dispatch(userActions.asyncSignOut())
   }

   if (isLoading) {
      return <SplashScreen />
   }

   return (
      <NavigationContainer >
         {!userData.isLoggedIn ?
            <Login />
            :
            <AppDrawer logOut={logOut} />
         }
      </NavigationContainer>
   )
}

const AppDrawer = (props: any) => (
   <AppDrawerNavigator.Navigator drawerContent={(drawerProps) => <CustomDrawerContent {...drawerProps} logOut={props.logOut} />}>
      <AppDrawerNavigator.Screen name="AppTabs" component={AppTabs} />
      <AppDrawerNavigator.Screen name="NotificationsTab" component={NotificationsTabs} />
   </AppDrawerNavigator.Navigator>
)


const Login = () => {
   return (
      <LoginStack.Navigator>
         <LoginStack.Screen name="Login" component={LoginScreen} />
         <LoginStack.Screen name="SignIn" component={SignInScreen} />
      </LoginStack.Navigator>
   );
}

const AppTabs = () => {
   return (
      <AppTab.Navigator>
         <AppTab.Screen name="Summary" component={Summary} />
         <AppTab.Screen name="MyProjetcs" component={MyProjects} />
         <AppTab.Screen name="OtherProjects" component={OtherProjecsts} />
      </AppTab.Navigator>
   )

}

const Summary = () => {
   return (
      <SummaryStack.Navigator>
         <SummaryStack.Screen name="Summary" component={SummaryScreen} />
      </SummaryStack.Navigator>
   )

}

const MyProjects = () => {
   return (
      <MyProjectsStack.Navigator>
         <MyProjectsStack.Screen name="MyProjects" component={MyProjectsScreen} />
         <MyProjectsStack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      </MyProjectsStack.Navigator>
   )
}

const OtherProjecsts = () => {
   return (
      <OtherProjecstStack.Navigator>
         <OtherProjecstStack.Screen name="OtherProjects" component={OtherProjectsScreen} />
         <OtherProjecstStack.Screen name="ProjectDetails" component={ProjectDetailsScreen} />
      </OtherProjecstStack.Navigator>
   )
}

const  Messages = () => {
   return (
      <MessagesStack.Navigator>
         <MessagesStack.Screen name='Messages' component={MessagesScreen}/>
      </MessagesStack.Navigator>
   )
}

const  Invitations = () => {
   return (
      <InvitationsStack.Navigator>
         <InvitationsStack.Screen name='Invitations' component={InvitationsScreen}/>
      </InvitationsStack.Navigator>
   )
}

const NotificationsTabs = () => {
   return (
      <NotificationsTab.Navigator>
         <NotificationsTab.Screen name="Messages" component={Messages}/>
         <NotificationsTab.Screen name="Invitations" component={Invitations}/>
      </NotificationsTab.Navigator>
   )
}

function CustomDrawerContent(props: any) {
   return (
      <DrawerContentScrollView {...props}>
         <DrawerItemList {...props} />
         <DrawerItem
            label="Log out"
            onPress={() => {
               props.navigation.dispatch(DrawerActions.toggleDrawer())
               props.logOut()
            }}
         />
      </DrawerContentScrollView>
   );
}






export default Navigation;
