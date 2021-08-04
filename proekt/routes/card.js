const { Router } = require('express')
const Card = require('../models/card')
const Cross = require('../models/cross')
const router = Router()

router.post('/add', async (req, res) => {
    const cros = await Cross.getById(req.body.id)
    await Card.add(cros)
    res.redirect('/card')
})

router.get('/', async(req,res)=>{
    const card = await Card.fetch()
    res.render('card',{
        title: 'Basket',
        isCard: true,
        crosses: card.crosses,
        price: card.price
    })
})


module.exports = router