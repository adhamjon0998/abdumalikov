const { Router } = require('express')
const Cross = require('../models/cross')
const router = Router()

router.get('/', async (req, res) => {
    const crosses = await Cross.find()
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
    
    const cros = await Cross.findById(req.params.id)

    res.render('cros-edit',{
        title: `Edit ${cros.model}`,
        cros
    })
})

router.post('/edit', async(req,res)=>{
    const {id} = req.body
    delete req.body.id
    await Cross.findByIdAndUpdate(id, req.body)
    res.redirect('/crosses')
})

router.post('/remove',async (req,res)=>{
    try{
        await Cross.deleteOne({_id: req.body.id})
            res.redirect('/crosses')
        
    }catch(e){
        console.log(e);
    }
   

})

router.get('/:id', async(req,res)=>{
    const cros = await Cross.findById(req.params.id)
    res.render('cros',{
        layout: 'empty',
        title: `Cros ${cros.model}`,
        cros
    })
})


module.exports = router