const express = require('express');
const router  = express.Router();


router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/notes', (req, res, next) => {
    res.render('notes');
});

router.get('/add-note', (req, res, next) => {
    res.render('add-note');
})

router.get('/register', (req, res, next) => {
    res.render('register');
})

module.exports = router;