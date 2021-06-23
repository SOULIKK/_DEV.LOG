const express = require('express');
const { isLoggedIn } = require('./middlewares');
const User = require('../models/user');

const router = express.Router();

router.post('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { id: req.user.id } });
    if (user) {
      res.send('success');
    } else {
      res.status(404).send('존재하지 않는 유저');
    }
  } catch (err) {
    console.error(err)
    next(err);
  }
});

module.exports = router;