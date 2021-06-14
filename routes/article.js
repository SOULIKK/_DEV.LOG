const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const { Article } = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router();

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더 생성');
  fs.mkdirSync('uploads');
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/');
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const articles = await Article.create({
      title: req.body.title,
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
});



router.get('/:id', async (req, res, next) => {
  try {
    console.log(`글번호 :::::::::::::::::::: ${req.params.id}`);
    const article = await Article.findOne({
      where: { id: req.params.id },
    });
    if (article) {
      res.render('content', {
        article: article
      });
    } else {
      res.status(404).send('No Article');
    }
  } catch (error) {
    console.error(error);
    next(error);
  }

})

router.get('/delete/:id', isLoggedIn, async (req, res, next) => {
  try {
    console.log(`글번호 :::::::::::::::::: ${req.params.id}`);
    const article = await Article.destroy({
      where: { id: req.params.id }
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;