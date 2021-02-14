const express = require ('express');
const app = express();
const movies = require ('./modules/movies')
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
const port = 3000;
const firebase = require ('firebase/app');
const cookieParser = require ('cookie-parser');
app.use(cookieParser());
require ('firebase/auth');
require ('firebase/firestore');

app.use (express.static('public')); // Hacemos public que se pueda ver

// Para Poder leer el process.env

 // console.log(process.env.APIKEY) Para acceder a la apiKey hay que poner process.env.NOMBREVARIABLE

let bodyParser = require('body-parser'); // Para poder acceder a lo de .body
let urlencodedParser = bodyParser.urlencoded({ extended: false })

app.set('view engine', 'pug'); // Para poder usar pug
app.set('views','./views_pug'); // Para poder usar pug

app.post('/', urlencodedParser, movies.autenticarjwt);
app.get('/', movies.getLogin);
app.get('/search', movies.rutasProtegidas, movies.getSearch);
app.get('/dashboard', movies.rutasProtegidas, movies.getDashboard);
app.post('/search', urlencodedParser, movies.getFilm);
app.get('/searchdetails/:imbd', movies.rutasProtegidas, movies.getDetails);
app.get('/movies', movies.rutasProtegidas, movies.getMovies);
app.get('/editmovie/:id', movies.rutasProtegidas, movies.editMovie);
app.put('/editmovie/:id', urlencodedParser, movies.updateMovie);
app.get('/createmovie', movies.rutasProtegidas, movies.formcreateMovie);
app.post('/createmovie', urlencodedParser, movies.createMovie);
app.post('/logout', movies.logOutuser)
app.post('/favoritos/:id', movies.postFavoritos)
app.delete('/removeMovie/:id', urlencodedParser, movies.deleteMovie)
app.delete('/delete_favorito/:id', movies.rutasProtegidas, movies.deleteFavoritos)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })