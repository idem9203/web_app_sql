const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');

//Inicializaaciones
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views')); //le dice a node donde esta la carpeta views dentro de src

//configuracion de plantilla
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs'); // utilizar plantilla o motor

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //para recibir solo nombres
app.use(express.json()); // para recibir JSON
app.use((req, res, next) => {

    next();
});

//Variables globales

//Rutas
app.use(require('./routes'));  //node busca el archivo index.js
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));

//Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});