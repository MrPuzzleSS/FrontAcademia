const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express();

const puerto = 8080;

//Servidor de contenido estático
app.use(express.static('public'))
app.use(express.static('public/views/partials/css'))

//
app.set('views', path.join(__dirname + '/public/views'))
app.set('view engine', 'hbs')

//Configuracion del directiorio que guardara los archivos partials hbs
hbs.registerPartials(__dirname + '/public/views/partials');

app.get('/', (req, res) => {
    //res.write('Home')
    //res.end()
    res.render('home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/cursos', (req, res) => {
    res.render('Cursos')
})

app.get('/crearCursos', (req, res) => {
    res.render('crearCursos')
})

app.get('/grupos', (req, res) => {
    res.render('grupos')
})

app.get('/crearGrupos', (req, res) => {
    res.render('crearGrupos')
})

app.get('/estudiantes', (req, res) => {
    res.render('estudiantes')
})

app.get('/crearEstudiante', (req, res) => {
    res.render('crearEstudiante')
})

app.get('/docentes', (req, res) => {
    res.render('docentes')
})

app.get('/crearDocente', (req, res) => {
    res.render('crearDocente')
})

app.listen(puerto, () => {
    console.log(`Escuchando por el puerto ${puerto}`)
})