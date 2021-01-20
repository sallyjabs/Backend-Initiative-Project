const movieRoutes = (app, fs) => {

  // variables
  const dataPath = './data/movies.json';

  // helper methods
  const readFile = (callback, returnJson = false, filePath = dataPath, encoding = 'utf8') => {
      fs.readFile(filePath, encoding, (err, data) => {
          if (err) {
              throw err;
          }

          callback(returnJson ? JSON.parse(data) : data);
      });
  };

  const writeFile = (fileData, callback, filePath = dataPath, encoding = 'utf8') => {

      fs.writeFile(filePath, fileData, encoding, (err) => {
          if (err) {
              throw err;
          }

          callback();
      });
  };

  // READ
  app.get('/movies', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
              throw err;
          }

          res.send(JSON.parse(data));
      });
  });

  // CREATE
  app.post('/movies', (req, res) => {

      readFile(data => {
          const newMovieId = Object.keys(data).length + 1;

          // add the new movie
          data[newMovieId.toString()] = req.body;

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send('new movie added');
          });
      },
          true);
  });


  // UPDATE
  app.put('/movies/:id', (req, res) => {

      readFile(data => {

          // add the new movie
          const movieId = req.params["id"];
          data[movieId] = req.body;

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`movies id:${movieId} updated`);
          });
      },
          true);
  });


  // DELETE
  app.delete('/movies/:id', (req, res) => {

      readFile(data => {

          // add the new movie
          const movieId = req.params["id"];
          delete data[movieId];

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`movies id:${movieId} removed`);
          });
      },
          true);
  });
};

module.exports = movieRoutes;