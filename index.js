const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')

const app = express()

//routes
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const phonesRouter = require('./routes/phones')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended: true}))
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/phones', phonesRouter)


const PORT = process.env.PORT || 3000

app.listen(PORT, (req,res)=>{
    console.log(`Server workink on ${PORT} port`);
})