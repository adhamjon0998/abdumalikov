const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const app = express()

//router 
const homeRouter = require('./routes/home')
const addRouter = require('./routes/add')
const crossesRouter = require('./routes/crosses')
const cardRouter = require('./routes/card')


const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

//use
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use('/', homeRouter)
app.use('/add', addRouter)
app.use('/crosses', crossesRouter)
app.use('/card', cardRouter)

const PORT = process.env.PORT || 3000

async function start() {
    try {
        const URI = 'mongodb+srv://adham:peSAmzUVgfX1Ov1r@cluster0.npirv.mongodb.net/shop'
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        
            console.log(`MongoDb working on ${PORT} port`);
    }
    catch(e){
        console.log(e);
    }
    
}

start()


app.listen(PORT, (req,res)=>{
    console.log(`Server working on ${PORT} port`);
})
