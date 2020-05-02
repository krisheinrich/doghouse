const express = require('express');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');
const app = express();
const port = 3000;

const url = 'https://www.akc.org/dog-breeds/samoyed/';

app.get('/', async (req, res) => {

  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    console.log('Got HTML!');
    const $ = cheerio.load(html);
    const $training = $('.bar-graph__text', '#panel-TRAINING');
    const data = {
      breed: 'samoyed',
      trainability: $training.first().text(),
      temperament: $training.last().text()
    };
    res.json(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => console.log(`DogHouselistening at http://localhost:${port}`));
