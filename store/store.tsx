import React from 'react'
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux'
import userReducer  from './user/reducer'

type Props = {
   children: React.ReactNode
}

const rootReducer = combineReducers({
   user: userReducer,
});

const store = createStore(rootReducer);

export default (props : Props) =>  {
   return (
      <Provider store={store}>
         {props.children}
      </Provider>
   )
}

export type RootState = ReturnType<typeof store.getState>
