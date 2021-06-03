import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from '@react-navigation/native';

export type MainStackParamList = {
   Auth: LoginStackParamList,
   App: AppStackParamList
}
export type AppStackParamList = {
   Notifications: NotificationTabNavigationParamList,
   Tab: TabNavigationParamList,
   Settings: SetttingStackParamList
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
   Summary: undefined,
}

export type MessagesStackParamList = {
   Messages: undefined
}
export type InvitationsStackParamList = {
   Invitations: undefined
}
export type SetttingStackParamList = {
   Settings: undefined
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
export type OtherProjectsNavigationProp = StackNavigationProp<OtherProjectsStackParamList, 'OtherProjects'>
export type OtherProjectDetailsNavigationProp = StackNavigationProp<OtherProjectsStackParamList, 'ProjectDetails'>
export type OtherProjectDetailsRouteProp = RouteProp<OtherProjectsStackParamList, 'ProjectDetails'>

export type MyProjectDetailsNavigationProp = StackNavigationProp<MyProjectsStackParamList, 'ProjectDetails'>

export type MyProjectDetailsRouteProp = RouteProp<MyProjectsStackParamList, 'ProjectDetails'>
export type SummaryNavigationProp = StackNavigationProp<SummaryStackParamList, 'Summary'>



