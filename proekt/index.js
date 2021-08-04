const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')

const app = express()

//router 
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const crossesRouter = require('./routes/crosses')
const cardRouter = require('./routes/card')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

//use
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use('/',homeRouter)
app.use('/add',addRouter)
app.use('/crosses',crossesRouter)
app.use('/card',cardRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, (req,res)=>{
    console.log(`Server working on ${PORT} port`);
})