const { Router } = require('express')
const router = Router()
const Category = require('../models/Category')
const fileMiddleware = require('../middleware/file')
const toDelete = require('../middleware/toDelete')

router.get('/categories', async (req, res) => {
    const categories = await Category.find()
    res.render('admin/categories', {
        layout: 'admin',
        categories
    })
})

router.get('/categories/add', (req, res) => {
    res.render('admin/addCategory', {
        layout: 'admin',
        title: 'Create category'
    })
})

router.post('/categories/add', fileMiddleware.single('img'), async (req, res) => {
    const { name } = req.body
    req.file ? img = req.file.filename : img = ''

    const category = new Category({
        name,
        img
    })

    await category.save()
    res.redirect('/admin/categories')
})

router.get('/category/edit/:id', fileMiddleware.single('img'), async (req, res) => {
    const category = await Category.findById(req.params.id)
    res.render('admin/editCategory', {
        title: 'Edit Category',
        layout: 'admin',
        category
    })
})

router.post('/category/edit/:id', fileMiddleware.single('img'), async (req, res) => {
    const { img } = await Category.findById(req.params.id)
    toDelete(img)
    const admin = req.body
    admin.img = req.file.filename
    console.log(admin);
    await Category.findByIdAndUpdate(req.params.id, admin, (err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/admin/categories')
        }
    })
})

module.exports = router