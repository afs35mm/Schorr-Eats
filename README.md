# Schorr Eats

Web app to keep a running tally of resturants around NYC. NodeJs on the back and Angular on the front.

### Highlights Include:
- Node
- Angular
- Express
- Mongo
- Gulp
- Browserify
- Passport

### Instructions
- Install Gulp, NPM, and Mongo
- `git clone https://github.com/afs35mm/Schorr-Eats/`
- Cd into that directory
- `npm install`
- Run `gulp watch` which should start the server
- Navigate to `http://localhost:8080`


#### Currently migrating to Digital Ocean since Modulus is too damn, expensive.

Hosted at [MongoDB Cloud Atlas](https://www.mongodb.com/cloud/atlas) for DB, and Google App engine for Node hosting.

To deploy run `gcloud app deploy`.

To mimic the modulus prod environment run `node app/server.js`.
