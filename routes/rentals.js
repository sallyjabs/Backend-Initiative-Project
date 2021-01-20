const rentalRoutes = (app, fs) => {

  // variables
  const dataPath = './data/rentals.json';

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
  app.get('/rentals', (req, res) => {
      fs.readFile(dataPath, 'utf8', (err, data) => {
          if (err) {
              throw err;
          }

          res.send(JSON.parse(data));
      });
  });

  // CREATE
  app.post('/rentals', (req, res) => {

      readFile(data => {
          const newRentalId = Object.keys(data).length + 1;

          // add new rented movie
          data[newRentalId.toString()] = req.body;

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send('new rented movie added');
          });
      },
          true);
  });


  // UPDATE
  app.put('/rentals/:id', (req, res) => {

      readFile(data => {

          // update rented movie
          const rentalId = req.params["id"];
          data[rentalId] = req.body;

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`rentals id:${rentalId} updated`);
          });
      },
          true);
  });


  // DELETE
  app.delete('/rentals/:id', (req, res) => {

      readFile(data => {

          // remove rented movies
          const rentalId = req.params["id"];
          delete data[rentalId];

          writeFile(JSON.stringify(data, null, 2), () => {
              res.status(200).send(`rentals id:${rentalId} removed`);
          });
      },
          true);
  });
};

module.exports = rentalRoutes;