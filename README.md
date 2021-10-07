# NotificationExample
An example of how you can do a persistent notifications app. 

# To test:
You will need a postgres instance running. You can use the default postgres db as included, or you can setup a different db using backend/src/db.js, and adjust the Client structure. 

Make sure to npm install for both the front-end and backend directories. 

In frontend-app, use 'npm run build'. Then, in /Backend. use 'node src/index.js' to start running the express server. By default, the endpoint and site will be served from localhost:3001. 