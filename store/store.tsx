import React from 'react'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider, TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import userReducer  from './user/reducer'
import myProjectsReducer from './myProjects/reducer'
import notificationReducer from './notifications/reducer'
import invitationReducer from './invitations/reducer'
import ReduxThunk from 'redux-thunk'

type Props = {
   children: React.ReactNode
}

const rootReducer = combineReducers({
   user: userReducer,
   myProjects: myProjectsReducer,
   notifications: notificationReducer,
   invitations: invitationReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default (props : Props) =>  {
   return (
      <Provider store={store}>
         {props.children}
      </Provider>
   )
}

export type RootState = ReturnType<typeof store.getState>
// type AppDispatch = typeof store.dispatch


// export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


