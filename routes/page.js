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
        attributes: ['id', 'nickname']
      },
      order: [
        ['createdAt', 'DESC']
      ],
    });
    res.render('main', {
      titile: '_DEV.LOG',
      articles: articles
    })
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/join', isLoggedIn, async (req, res, next) => {
  res.render('join');
})

