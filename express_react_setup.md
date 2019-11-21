# Express Back-End with React Front-End

## Install generator

`npm install -g express-generator`

## Install The Back-End

- `express --view=ejs final-project-name`
- cd final-project-name && npm install
- edit bin/www and change the port to 3001
- add console.log to onListening and add a start script
- create .gitignore
- git init
- install nodemon:

`npm install nodemon --save-dev`

- add 'dev' script to start nodemon with `npm run dev`

## Additonal useful middleware

- dotenv

## configure Knex

- npm install knex -g
- npm install knex --save
- knex init
- configure development to use postgresql
- add your credentials in .env files and configure knexfile.js

```js
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    },
```

in dotenv

```js
DB_HOST=localhost
DB_USER=labber
DB_PASS=labber
DB_NAME=final_project
DB_SSL=true if heroku
DB_PORT=5432
```

- make sure migrations and seeds are added to './db' folder in knexfile.js

```js
  migrations: {
    directory: './db/knex_migrations',
  },
  seeds: {
    directory: './db/knex_seeds',
  },
```

- add dotenv (\* add to gitignore) npm install dotenv --save
- require knex and dotenv in app.js

```js
const knexConfig = require('./knexfile');
const knex = require('knex')(knexConfig['development']);
require('dotenv').config();
```

- install pg

`npm install pg --save`

- Create the database with owner

  `createdb final_project -O labber`

- create migrations

  `knex migrate:make migration_name`

- create seeds

## Seeds

- Create seed files for populating the database
- Create seed file with `knex seed:make fileName`
- Seeds are executed in alphabetical order, so you might want to precede filenames with a letter (ex.: a_addUsers.js, b_addPolls.js)
- To restart auto increments at 1 each time the seed file runs, use Promise.all and ALTER SEQUENCE query:

```js
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return Promise.all([
    knex('users').del(),
    knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1'),
    knex('users').then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name: 'SpongeBob',
          last_name: 'Squarepants',
          email: 'bob@sq.com',
          password: 'test',
        },
      ]);
    }),
  ]);
};
```

- `npm install --save-dev faker` and require faker if fake data is needed.

## Test a Route

- Add some JSON objects in the user route for testing. Run the server and test the route.

```js
module.exports = knex => {
  router.get('/', function(req, res, next) {
    knex
      .select('*')
      .from('users')
      .then(result => {
        res.json(result);
      })
      .catch(error => {
        console.log(error);
      });
  });

  return router;
};
```

- change the route to '/api/users'

- app.use('/api/users', usersRouter)

## Install the Front-End

Make sure create-react-app is installed globally:

`npm i -g create-react-app`

At the root of the project folder, type the following:

`create-react-app client`

(make sure you have node 8.12.0 or above)

Install Axios

`npm install axios`

Create a `useEffect` hook to load the users

```js
useEffect(() => {
  axios
    .get('/api/users')
    .then(result => {
      dispatch({ type: SET_USERS, users: result.data });
    })
    .catch(error => {
      console.log(error);
    });
}, []);
```

Create a `Reducer` fct to update the state

```js
const dataReducer = (state, action) => {
  const actions = {
    SET_USERS: {
      ...state,
      users: action.users,
    },
  };

  if (!actions[action.type]) {
    throw new Error('Type of action not found');
  }
  return actions[action.type];
};
```

Display the list of users in App

```js
const App = () => {
  const { state, dispatch } = useApplicationData();
  const userList = state.users.map(user => (
    <li key={user.id}>
      {user.first_name} {user.last_name} {user.email}
    </li>
  ));
  return (
    <div className='App'>
      <h1>Users</h1>

      <ul>{userList}</ul>
    </div>
  );
};
```

To use Sass, install node-sass

`npm i node-sass`

## Ports

- React front-end is running on port 3000
- Rails back-end is running on port 3001 (or any other)

## Cors

**Cross-Origin Resource Sharing**

- A web application makes a cross-origin HTTP request when it requests a resource that has a different domain (i.e. different ports)
- Web application using APIs can only request HTTP resources from the same origin the application was loaded from, unless the response from the other origin includes the right CORS headers.

## Proxy API Calls on The Client

Add a proxy to package.json:

```js
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "proxy": "http://localhost:3001",
...
```

## References

[Create React App with an Express Backend](https://daveceddia.com/create-react-app-express-backend/)

[Access-Control-Allow-Origin: Dealing with CORS Errors in React and Express](https://daveceddia.com/access-control-allow-origin-cors-errors-in-react-express/)

[Deploy React and Express to Heroku](https://daveceddia.com/deploy-react-express-app-heroku/)
