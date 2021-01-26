//const appRouter = (app, fs) => {};

// load up our shiny new route for users
//import other routes
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const rentalRoutes = require('./rentals');


const appRouter = (app, fs) => {
  // we've added in a default route here that handles empty routes
  // at the base API url
  app.get('/', (req, res) => {
    res.send('welcome to the development api-server');
  });

  // run our user route module here to complete the wire up
  // other routes
  userRoutes(app, fs);
  movieRoutes(app, fs);
  rentalRoutes(app, fs);
 
};


module.exports = appRouter;