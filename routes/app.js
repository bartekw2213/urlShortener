const express = require('express');
const router = express.Router();

const ShortUrl = require('../model/ShortUrl');

router.get('/', (req, res) => res.render('index'));

router.post('/shortUrl', async (req, res) => {
  const originalUrl = req.body.url;
  let number = null;

  try {
    const urlAlreadySaved = await ShortUrl.findOne({ originalUrl });

    if (urlAlreadySaved) {
      return res.render('index', {
        shortUrl: `http:/localhost:5000/${urlAlreadySaved.number}`,
      });
    }

    const lastUrlInDb = await ShortUrl.findOne().sort({ _id: -1 });
    if (!lastUrlInDb) number = 1;
    else number = lastUrlInDb.number + 1;

    const url = new ShortUrl({
      number,
      originalUrl,
    });

    await url.save();

    res.render('index', { shortUrl: `http:/localhost:5000/${number}` });
  } catch (error) {
    console.error(error);
    res.render('index', { error: error.name });
  }
});

router.get('/:number', async (req, res) => {
  try {
    const number = req.params.number;
    const url = await ShortUrl.findOne({ number });
    if (!url) {
      res.send('Error');
    }
    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.render('index', { error: error.name });
  }
});

module.exports = router;
