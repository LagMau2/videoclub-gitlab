const Sequelize = require('sequelize');

const userModel = require('./models/user');
const directorModel = require('./models/director');
const genreModel = require('./models/genre');
const movieModel = require('./models/movie');
const actorModel = require('./models/actor');
const memberModel = require('./models/member');
const movieActorModel = require('./models/movieActor');
const copyModel = require('./models/copy');
const bookingModel = require('./models/booking');

/*
Para conectar con la base de datos se necesita:
1- Nombre de la base de datos
2- Usuario
3- Contraseña
4- Objeto de configuracion ORM a
*/

const sequelize = new Sequelize('video-club','root','abcd1234',{
    host: 'localhost',
    dialect: 'mysql'
});

const User = userModel(sequelize, Sequelize);
const Director = directorModel(sequelize, Sequelize);
const Genre = genreModel(sequelize, Sequelize);
const Movie = movieModel(sequelize, Sequelize);
const Actor = actorModel(sequelize, Sequelize);
const Member = memberModel(sequelize, Sequelize);
const MovieActor = movieActorModel(sequelize, Sequelize);
const Copy = copyModel(sequelize, Sequelize);
const Booking = bookingModel(sequelize, Sequelize);

//Relaciones de movie
//Un genero puede tener muchas peliculas
Genre.hasMany(Movie, {as:'movies'});
//Una pelicula pude tener solo 1 genero
Movie.belongsTo(Genre, {as:'genre'});
//Un director puede tener muchas peliculas
Director.hasMany(Movie, {as:'movies'});
//Una pelicula tiene 1 solo director
Movie.belongsTo(Director, {as:'director'});
//Un actor participa en muchas peliculas
MovieActor.belongsTo(Movie, {foreingKey:'movieId'});
//En una pelicula participan muchos actores
MovieActor.belongsTo(Actor, {foreingKey:'actorId'});
//Una pelicula puede tener muchas copias
Movie.hasMany(Copy, {as:'copies'});
//Una copia puede tener solo 1 pelicula
Copy.belongsTo(Movie, {as:'movie'});
//Una copia se puede pedir mucho
Copy.hasMany(Booking, {as:'bookings'});
//Un booking solo tiene 1 copia
Booking.belongsTo(Copy, {as:'copy'});
//Un miembro puede hacer muchos bookings
Member.hasMany(Booking, {as:'bookings'});
//Un booking solo tiene un miembro
Booking.belongsTo(Member, {as:'member'});

Movie.belongsToMany(Actor, {
    foreingKey: 'actorId',
    as:'actors',
    through:'movies_actors'
});

Actor.belongsToMany(Movie, {
    foreingKey:'movieId',
    as:'movies',
    through:'movies_actors'
});

sequelize.sync({
    force:true
}).then(()=>{
    console.log('base de datos actualizada');
});

module.exports = {Director, Genre, Movie, Actor, Member, MovieActor, Copy, Booking};