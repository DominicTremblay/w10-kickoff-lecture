import React, { useReducer } from 'react';

export const SET_USERS = 'SET_USERS';

const dataReducer = (state, action) => {

  const actions = {
    SET_USERS: {
      ...state,
      users: [...state.users, ...action.users],
      loading: false
    }
  }

  if (!actions[action.type]) {
    throw new Error('Reducer Type Does Not Exist');
  }

  return actions[action.type]

}

export default dataReducer;