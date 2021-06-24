const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Article, User } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  next();
})


router.get('/', async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      include: {
        model: User,
        attributes: ['id', 'nickName']
      },
      order: [
        ['createdAt', 'DESC']
      ],
    });
    res.render('main', {
      title: 'KMS_DEV_LOG',
      articles: articles
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
});


router.get('/write', async (req, res, next) => {
  res.render('write', {});
})

router.get('/join', isNotLoggedIn, async (req, res, next) => {
  res.render('join');
})
module.exports = router;