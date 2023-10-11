const express = require('express'); 
const app = express(); 
const PORT = 3000; 
const path = require('path'); 

app.use(express.json()); 

const wikipediaController = require('./controllers/wikipediaController'); 



//! Route Handlers
app.get('/check', (req, res) => {
    const response = { Creator: 'Tanner Lyon' }; 
    return res.status(200).json(response); 
}); 

app.post('/search', wikipediaController.getInfo, (req, res) => {
  return res.status(200).json(res.locals.details);
}); 


//!local error handler
app.use((req, res) => res.sendStatus(400));


//!global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught error',
    status: 500, 
    message: {err: 'An error has occured'}
  };
  const errObj = Object.assign({}, defaultErr, err); 
  res.status(errObj.status).json(errObj.message); 
});


//Port listener 

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
});