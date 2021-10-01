const express = require('express');
const router  = express.Router();
const pool = require('../database');


router.get('/add', async (req, res, next) => {
    res.render('links/add');
});

router.post('/add', async (req, res, next) => {
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description,
    }
    try {
        await pool.query('INSERT INTO links SET ?', [newLink]);
    } catch (err){
        console.error(err);
    }
    res.redirect('/links')
});

router.get('/', async (req, res, next) => {
    let links = null;
    try{
        links = await pool.query('SELECT * FROM links');
        console.log(links);
    } catch (err){
        console.error(err);
    }

    res.render('links/list', {links});
    
});

router.get('/delete/:id', async(req, res, next) =>{
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    res.redirect('/links');
});

router.get('/edit/:id', async(req, res, next) =>{
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links[0]);
    res.render('links/edit', {link: links[0]});
})

router.post('/edit/:id', async(req, res, next) =>{
    const { id } = req.params;
    const { title, description, url} = req.body;
    const newLink = {
        title,
        description,
        url
    }
    await pool.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    res.redirect('/links');
})

module.exports = router;