const { Router } = require('express')
const Cross = require('../models/cross')
const router = Router()

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add page',
        isAdd: true
    })
})

router.post('/', async (req, res) => {
    // const cross = new Cross(req.body.model, req.body.price, req.body.img)
       const cross = new Cross({
        model: req.body.model,
        price: req.body.price,
        img: req.body.img
        
    })
    try {
        await cross.save()
        res.redirect('/crosses')
    } catch (e) {
        console.log(e);
    }


})

module.exports = router