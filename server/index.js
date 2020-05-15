const express = require('express');
const app = express();
const port = 3000;

const scrape = require('./scape'); 

const url = 'https://www.akc.org/dog-breeds/samoyed/';

app.get('/', async (req, res) => {

  try {
    const data = scrape.getData(url);
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`DogHouselistening at http://localhost:${port}`));
