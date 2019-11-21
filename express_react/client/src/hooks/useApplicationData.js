import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import dataReducer, { SET_USERS } from '../reducers/dataReducer';


const useApplicationData = () => {

  const [state, dispatch] = useReducer(dataReducer, ({ users: [], loading: true }))

  useEffect(() => {
    axios
      .get('/api/users')
      .then(result => {

        console.log(result.data)

        dispatch({ type: SET_USERS, users: result.data });
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return {
    state,
    dispatch
  }
}

export default useApplicationData;




