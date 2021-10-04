const { Router } = require('express')
const router = Router()
const fileMiddleware = require('../middleware/file')
const Home = require('../models/Home')

router.get('/home', async(req, res) => {
    const homes = await Home.find()
    res.render('admin/home', {
        title: 'Homes',
        layout: 'admin',
        homes
    })
})

router.get('/home/add', (req, res) => {
    res.render('admin/addHome', {
        title: 'Create home',
        layout: 'admin'
    })
})

router.post('/home/add', fileMiddleware.single('img'), async (req, res) => {
    const { name } = req.body
    if (req.file) {
        img = req.file.filename
    } else {
        img = ''
    }
    const homeCategory = new Home({
        name,
        img
    })
    await homeCategory.save()
    res.redirect('/admin/home')
})


module.exports = router