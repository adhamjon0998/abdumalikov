const { Router } = require('express')
const router = Router()
const Adham = require('../models/Adham')
const fileMiddleware = require('../middleware/file')


router.get('/adham', async (req, res) => {
    const adham = await Adham.find()
    res.render('admin/adham', {
        layout: 'admin',
        adham
    })
})

router.get('/adham/add', (req, res) => {
    res.render('admin/addAdham', {
        layout: 'admin',
        title: 'Create category'
    })
})

router.post('/adham/add', fileMiddleware.single('img'), async (req, res) => {
    const { name } = req.body
    req.file ? img = req.file.filename : img = ''

    const adham = new Adham({
        name,
        img
    })

    await adham.save()
    res.redirect('/admin/adham')
})

module.exports = router