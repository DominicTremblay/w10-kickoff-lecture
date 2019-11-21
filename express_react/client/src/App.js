import React from 'react';
import './App.css';
import useApplicationData from './hooks/useApplicationData';

function App() {
  const { state, dispatch } = useApplicationData();

  const userList = state.users.map(user => (
    <li key={user.id}>
      {user.first_name} {user.last_name} {user.email}
    </li>
  ));

  return (
    <div>
      {state.loading && <div>Loading users</div>}
      {
        !state.loading &&

        <div className='App'>
          <h1>Users</h1>

          <ul>{userList}</ul>
        </div>
      }
    </div>
  );
}

export default App;
