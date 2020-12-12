# Node.JS Express server for my-meals application (using MongoDBAtlas and Heroku in production)

[https://my-meals-server.herokuapp.com](https://my-meals-server.herokuapp.com)

<br />

#### Before starting development server

- Make sure you have set up mongoDB service and running
- Create .env file and set DATABASE_URL, SESSION_SECRET and JWT_SECRET environment variables

<br />

#### Start development server:express

```
yarn start:dev
```

<br />

#### Start production server:express

```
yarn start
```

<br />

#### Start development server:react

```
cd react-app
yarn start
```

<br />

#### Start production server:react

```
cd react-app
yarn build
serve -s build
```
