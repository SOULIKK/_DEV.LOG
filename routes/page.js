const express = require('express');

const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('main', {});
});

router.get('/join', isNotLoggedIn, async (req, res, next) => {
  res.render('join');
})

module.exports = router;