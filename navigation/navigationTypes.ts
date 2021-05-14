import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from '@react-navigation/native';

export type AppStackParamList = {
   Auth: LoginStackParamList,
   App: AppDrawerParamList
}

export type AppDrawerParamList = {
   AppTabs: TabNavigationParamList,
   NotificationsTab : NotificationTabNavigationParamList
}

export type LoginStackParamList = {
   Login: undefined,
   SignIn: undefined
}

export type TabNavigationParamList = {
   Summary: SummaryStackParamList,
   MyProjetcs : MyProjectsStackParamList,
   OtherProjects: OtherProjectsStackParamList
}

export type SummaryStackParamList = {
   Summary: undefined
}

export type MessagesStackParamList = {
   Messages: undefined
}
export type InvitationsStackParamList = {
   Invitations: undefined
}
export type NotificationTabNavigationParamList = {
   Messages: MessagesStackParamList,
   Invitations : InvitationsStackParamList
}

export type MyProjectsStackParamList = {
   MyProjects: undefined,
   ProjectDetails : {
      id: string
   }
}

export type OtherProjectsStackParamList = {
   OtherProjects: undefined,
   ProjectDetails : {
      id: string
   }
}

export type LoginScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'Login'>
export type SignInScreenNavigationProp = StackNavigationProp<LoginStackParamList, 'SignIn'>
export type MyProjectsNavigationProp = StackNavigationProp<MyProjectsStackParamList, 'MyProjects'>

export type MyProjectDetailsNavigationProp = StackNavigationProp<MyProjectsStackParamList, 'ProjectDetails'>

export type MyProjectDetailsRouteProp = RouteProp<MyProjectsStackParamList, 'ProjectDetails'>
export type SummaryNavigationProp = StackNavigationProp<SummaryStackParamList, 'Summary'>



