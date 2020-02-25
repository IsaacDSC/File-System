const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const multer = require('multer')
const path = require('path')

//caregando routes
const index = require('./routes/index')

/*
//configurando session
app.use(session({
    recret: 'md5(!@#)123',
    resave: true,
    saveUninitialized: true
}))

//confiugurando flash
app.use(flash())

//configurando midleware para exibir msg de respostas
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('succes_msg')
    res.locals.error_msg = req.flash('error_msg')
    next()
})*/

//configurando handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//consfigurando bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//carregando arquivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//criate function of name files 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'files/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname + Date.now() + path.extname(file.originalname))
    }
})

//adiconando midleware multer 
const upload = multer({ storage })

//adionando rota principal
app.use('/', index)
    //adionando rota para receber uploads
app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/')
})


const Port = 3000
app.listen(Port, () => {
    console.log(`http://localhost:${Port}`)
    console.log('BREAK SERVER CTRL + C')
})