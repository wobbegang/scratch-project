const express = require('express');
const app = express();
const path = require('path');
const apiRouter = require('./routes/api');
const PORT = 3000;

//parse body of request
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  // change to false? 

//route handler
app.use('/api', apiRouter)

app.use(express.static(path.resolve(__dirname, '../dist')));

app.use((req,res) => res.sendStatus(404));

// Global 
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app;
