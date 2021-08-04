const { Router } = require('express')
const Cross = require('../models/cross')
const router = Router()

router.get('/', async (req, res) => {
    const crosses = await Cross.getAll()
    res.render('crosses', {
        title: 'Cros page',
        isCrosses: true,
        crosses
    })
})

router.get('/:id/edit', async (req,res)=>{
    if(!req.query.allow){
        return res.redirect('/')
    }
    
    const cros = await Cross.getById(req.params.id)

    res.render('cros-edit',{
        title: `Edit ${cros.model}`,
        cros
    })
})

router.post('/edit', async(req,res)=>{
    await Cross.update(req.body)
    res.redirect('/crosses')
})

router.get('/:id', async(req,res)=>{
    const cros = await Cross.getById(req.params.id)
    res.render('cros',{
        layout: 'empty',
        title: `Cros ${cros.model}`,
        cros
    })
})


module.exports = router