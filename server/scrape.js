const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const getText = node => node.text().trim();

async function getData(url) {
  let browser;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const html = await page.content();
    console.log('Got HTML!');
    const $ = cheerio.load(html);

    const $overview = $('.attribute-list', '#panel-overview.is-active');
    const $training = $('.bar-graph__text', '#panel-TRAINING');
    console.log('$overview.length', $overview.length);
    return {
      name: getText( $('h1.page-header__title').first() ),
      description: getText( $('.breed-hero__footer').first() ),
      height: getText( $overview.find('li.attribute-list__row').eq(2).find('.attribute-list__text').last() ),
      weight: getText( $overview.find('li.attribute-list__row').eq(3).find('.attribute-list__text').last() ),
      temperament: getText( $overview.find('li.attribute-list__row').first().find('.attribute-list__text').last() ),
      trainability: getText( $training.first() ),
    };
  } catch (error) {
    console.error(error);
  } finally {
    browser.close()
  }
}

module.exports = {
  getData
};