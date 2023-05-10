"use strict";

import {
    Person,
    Category,
    Production,
    User,
    Movie,
    Resource,
    Serie,
    Coordinate
} from "./objetos.js";

import { VideoSystem } from './VideoSystem.js';

const log = console.log;


// Creamos una instancia de la clase System


console.info("Creando instancia de VideoSystem...");
let videos = VideoSystem.getInstance("MiSistemaDeVideos");
let videos2 = VideoSystem.getInstance("OtraInstancia");
log(`Comprobando que videos y videos2 sean el mismo objeto: ${videos === videos2}`);
log(`El nombre de la aplicación es: ${videos.name}`);
log(`Cambiando el nombre de la aplicación a "MiNuevaApp"...`);
videos.name = "MiNuevaApp";
log(`Nuevo nombre de la aplicación: ${videos.name}`);

log("*******************************************************************");
console.info("INICIANDO TESTEO DE CATEGORIAS");
log("================================");

console.info("Creando 6 categorías...");
// creamos las categorias

//comedia 
let comedia = videos.getCategory("Comedia", "Películas graciosas");
log(comedia.name);
log("Número de categorías creadas y añadidas:" + videos.addCategory(comedia));
//accion
let accion = videos.getCategory("Acción");
log(accion.name);
log("Número de categorías creadas y añadidas:" + videos.addCategory(accion));
//drama
let drama = videos.getCategory("Drama", "Películas dramáticas")
log(drama.name);
log("Número de categorías creadas y añadidas: " + videos.addCategory(drama));
//terror
let terror = videos.getCategory("Terror", "Películas de miedo")
log(terror.name);
log("Número de categorías creadas y añadidas: " + videos.addCategory(terror));
//romance
let romance = videos.getCategory("Romance", "Películas románticas")
log(romance.name);
log("Número de categorías creadas y añadidas: " + videos.addCategory(romance));
//ficcion
let ficcion = videos.getCategory("Ciencia ficción", "Películas de ciencia ficción")
log(ficcion.name);
log("Número de categorías creadas y añadidas: " + videos.addCategory(ficcion));


// Eliminar 
log("Eliminando la categoría 'Romance'");
log(`Número de categorías eliminadas: ${videos.removeCategory(videos.getCategory("Romance"))}`);


log("Mostrando todas las categorías:");
for (const category of videos.categories) {
    log(`Nombre de la categoría: ${category.name}`);
}

try {
    log("Intentando eliminar la categoría por defecto...");
    videos.removeCategory(videos.getCategory("default"));
} catch (error) {
    console.error(`Error al eliminar la categoría por defecto: ${error}`);

}



try {
    log("Intentando eliminar una categoría que no existe");
    videos.removeCategory(videos.getCategory("alpha primera"));
} catch (err) {
    console.error(`Error al eliminar una  categoría que no existe: ${err}`);

}



try {
    log("Intentando añadir una categoría que ya existe...");
    log(`Número de categorías creadas: ${videos.addCategory(videos.getCategory("Comedia", "Películas chistosas"))}`);
} catch (e) {
    console.error(`Error al añadir la categoría que ya existe: ${e}`);

}

log("================================");
log("FINALIZANDO TESTEO DE CATEGORIAS");


log("================================");
log("PRUEBA DE PRODUCCIONES");

// Creamos las series
let serie1 = new Serie("Merlí", new Date(2015, 9, 14), "Un profesor de filosofía que enseña a pensar y a cuestionar.", "merli.jpg", "España", [new Resource(60, "www.netflix.com/merli1"), new Resource(60, "www.netflix.com/merli2"), new Resource(60, "www.netflix.com/merli3")], [new Coordinate(41.3851, 2.1734)], "T1, T2, T3");

let serie2 = new Serie("The Alienist", new Date(2018, 1, 22), "Un psicólogo que usa la psicología para atrapar a un asesino.", "the-alienist.jpg", "Estados Unidos", [new Resource(50, "www.netflix.com/the-alienist1"), new Resource(50, "www.netflix.com/the-alienist2")], [new Coordinate(40.7128, -74.0060)], "T1, T2");
let serie3 = new Serie("Black Mirror", new Date(2011, 12, 4), "Las consecuencias de la tecnología y la inteligencia artificial.", "black-mirror.jpg", "Reino Unido", [new Resource(60, "www.netflix.com/black-mirror1"), new Resource(60, "www.netflix.com/black-mirror2"), new Resource(60, "www.netflix.com/black-mirror3"), new Resource(60, "www.netflix.com/black-mirror4"), new Resource(60, "www.netflix.com/black-mirror5")], [], "T1, T2, T3, T4, T5");



// Creamos las peliculas 
let movie1 = new Movie("Filósofos griegos", new Date(2022, 10, 15), "Un documental que muestra cómo las ideas de los antiguos pensadores griegos influyeron en la cultura occidental.", "filosofos-griegos.jpg", "Grecia", new Resource(90, "www.filosofosgriegos.com"), [new Coordinate(37.9838, 23.7275), new Coordinate(38.2466, 21.7344), new Coordinate(39.0742, 21.8243)]);

let movie2 = new Movie("Lacan: Reinventar el psicoanálisis", new Date(2023, 1, 20), "La vida y la obra de Jacques Lacan, uno de los psicoanalistas más importantes del siglo XX.", "lacan.jpg", "Francia", new Resource(120, "www.lacan.com"), [new Coordinate(48.8566, 2.3522), new Coordinate(43.2965, 5.3698), new Coordinate(45.7640, 4.8357)]);

let movie3 = new Movie("Humano, demasiado humano", new Date(2023, 5, 10), "Un documental que se centra en la escuela filosófica del Existencialismo y sus principales autores.", "humano.jpg", "Alemania", new Resource(150, "www.humano.com"), [new Coordinate(50.1109, 8.6821), new Coordinate(55.6761, 12.5683), new Coordinate(48.8566, 2.3522)]);


// Agregando producciones con addProduction
videos.addProduction(movie1);
console.log(`Se ha agregado la película "${movie1.title}" al catálogo de Netflix.`);

videos.addProduction(movie2);
console.log(`Se ha agregado la película "${movie2.title}" al catálogo de Netflix.`);

videos.addProduction(movie3);
console.log(`Se ha agregado la película "${movie3.title}" al catálogo de Netflix.`);

videos.addProduction(serie1);
console.log(`Se ha agregado la serie "${serie1.title}" al catálogo de Netflix.`);

videos.addProduction(serie2);
console.log(`Se ha agregado la serie "${serie2.title}" al catálogo de Netflix.`);

videos.addProduction(serie3);
console.log(`Se ha agregado la serie "${serie3.title}" al catálogo de Netflix.`);


log(" Mostramos las producciones existentes en el sistema")
// obtener el generador de producciones
const productionGenerator = videos.productions;

// recorrer todas las producciones con un bucle for...of
for (const production of productionGenerator) {
    console.log(production);
}

log("FINALIZANDO TESTEO DE PRODUCCIONES");
log("================================");

log("================================");
log("PRUEBAS DE USER");

// creamos los objetos de la clse user 
const user1 = new User("Pilar Gomez", "pilar@gmail.com", "contraseña1");
const user2 = new User("Alejandro Perez", "alejandro@gmail.com", "contraseña2");
const user3 = new User("Ali Lahjouli", "alilahjouli@example.com", "volos789");


// Añadimos los usuarios al sistema
log("Añadido el usuario: " + user1.username + " \nNúmero de usuarios del sistema actualmente: " + videos.addUser(user1));
log("Añadido el usuario: " + user2.username + " \nNúmero de usuarios del sistema actualmente: " + videos.addUser(user2));
log("Añadido el usuario: " + user3.username + " \nNúmero de usuarios del sistema actualmente: " + videos.addUser(user3));

// Creamos un nuevo usuario para borrarlo
const nuevoUsuario = new User("Juan Perez", "juanperez@gmail.com", "contraseña123");
// Agregamos el usuario al sistema
videos.addUser(nuevoUsuario);

// Eliminamos al usuario del sistema
log("Eliminamos al usuario " + nuevoUsuario.username + " del sistema")
log(videos.removeUser(nuevoUsuario));
log();

log("Recorrer y mostrar la información de todos los usuarios del sistema");
log();
// Obtenemos el generador de usuarios
let userGenerator = videos.users;

// Iteramos sobre el generador para mostrar la información de cada usuario
for (let user of userGenerator) {
    console.log(`Nombre de usuario: ${user.username}`);
    console.log(`Email: ${user.email}`);
    console.log("---------------------");
}

// Creamos una variable con un valor null
const usuarioNull = null;

// Intentamos añadir el usuario null al sistema
try {
    videos.addUser(usuarioNull); // Esto debería lanzar una excepción
} catch (error) {
    console.error(error.message); // Mostramos el mensaje de error
}



// Creamos un usuario con un username repetido
const usuarioRepetido = new User("Pilar Gomez", "pilargomez@gmail.com", "contraseña4");

log("Creamos un usuario con un username repetido")

// Intentamos añadir el usuario repetido al sistema
try {
    videos.addUser(usuarioRepetido);
} catch (error) { // Si el username ya existe
    console.error(error.message); // Mostramos el mensaje de error
}

log("FINALIZANDO LAS PRUEBAS DE USER");
log("================================");


log("================================");
log("PRUEBAS DE ACTOR  (PERSON)");


// creamos los objetos actores de clase Person
const actor1 = new Person("Lucía", "González", new Date(1985, 7, 25), "López", "lucia_gonzalez.jpg", "A001");
const actor2 = new Person("Carlos", "Méndez", new Date(1990, 3, 12), "Gómez", "carlos_mendez.jpg", "A002");
const actor3 = new Person("Ana", "Rodríguez", new Date(1982, 11, 3), "Vega", "ana_rodriguez.jpg", "A003");


// Añadimos los actores al sistema y mostramos el número total después de cada adición
log("Número de actores existentes en el sistema: " + videos.addActor(actor1));
log("Número de actores existentes en el sistema: " + videos.addActor(actor2));
log("Número de actores existentes en el sistema: " + videos.addActor(actor3));

// Eliminamos un actor del sistema
videos.removeActor(actor2);
log("Eliminamos el actor con ID (" + actor2.ID + ") del sistema");

// Mostramos la información de los actores restantes en el sistema
log("Actores restantes en el sistema:");
const actorGenerator = videos.actors; // Obtenemos el generador de actores

// Iteramos sobre el generador y mostramos la información de cada actor
for (const actor of actorGenerator) {
    log(`ID: ${actor.ID}, Nombre: ${actor.name}, Apellidos: ${actor.LastName}, Fecha de nacimiento: ${actor.born}, Foto: ${actor.Picture}`);
}

// el actor no puede ser null o no es un objeto Person.
log("caso: el actor no puede ser null o no es un objeto Person.")
try {
    videos.addActor(null);
} catch (error) {
    console.error(error.message);
}

// el actor ya existe.
videos.addActor(actor2);
log(" caso: el actor ya existe.")
try {
    videos.addActor(actor2);
} catch (error) {
    console.error(error.message);
}



log("FINALIZANDO LAS PRUEBAS DE ACTOR (PERSON)");
log("================================");



console.log("================================");
console.log("PRUEBAS DE DIRECTOR");

// Creamos los objetos de clase Director
const director1 = new Person("Juan", "Gómez", new Date(1975, 2, 17), "López", "juan_gomez.jpg", "D001");
const director2 = new Person("María", "Pérez", new Date(1980, 8, 5), "García", "maria_perez.jpg", "D002");
const director3 = new Person("Pedro", "Fernández", new Date(1970, 4, 30), "Martínez", "pedro_fernandez.jpg", "D003");

// Añadimos los directores al sistema y mostramos el número total después de cada adición
console.log("Número de directores existentes en el sistema: " + videos.addDirector(director1));
console.log("Número de directores existentes en el sistema: " + videos.addDirector(director2));
console.log("Número de directores existentes en el sistema: " + videos.addDirector(director3));

// Eliminamos un director del sistema
videos.removeDirector(director2);
console.log("Eliminamos el director con ID (" + director2.ID + ") del sistema");

// Mostramos la información de los directores restantes en el sistema
console.log("Directores restantes en el sistema:");
const directorGenerator = videos.directors; // Obtenemos el generador de directores

// Iteramos sobre el generador y mostramos la información de cada director
for (const director of directorGenerator) {
    console.log(`ID: ${director.ID}, Nombre: ${director.name}, Apellidos: ${director.LastName}, Fecha de nacimiento: ${director.born}, Foto: ${director.picture}`);


}

// Caso: el director no puede ser null o no es un objeto Person.
console.log("Caso: el director no puede ser null o no es un objeto Person.");
try {
    videos.addDirector(null);
} catch (error) {
    console.error(error.message);
}

// Caso: el director ya existe.
videos.addDirector(director2);
console.log("Caso: el director ya existe.");
try {
    videos.addDirector(director2);
} catch (error) {
    console.error(error.message);
}

// remove
log("Pruebas del metodo remove ");

// Caso: el director no puede ser null o no es un objeto Person.
console.log("Caso: el director no puede ser null o no es un objeto Person.");
try {
    videos.removeDirector(null);
} catch (error) {
    console.error(error.message);
}

// Caso: el director no existe en el sistema.
console.log("Caso: el director no existe en el sistema.");
const director4 = new Person("Luisa", "Sánchez", new Date(1978, 1, 18), "García", "luisa_sanchez.jpg", "D008");
videos.addActor(director4);
videos.removeActor(director4);
try {
    videos.removeDirector(director4);
} catch (error) {
    console.error(error.message);
}


console.log("FINALIZANDO LAS PRUEBAS DE DIRECTOR");
console.log("================================");





console.log("================================");
console.log("PRUEBAS DE ASIGNACIÓN DE CATEGORÍAS");

// categria de miedo 
let categoriaMiedo = videos.getCategory("Miedo", "Películas y series de terror y suspenso.");

// Crear algunas producciones de miedo
let theRing = new Movie("The Ring", new Date(2002, 9, 18), "Una cinta de vídeo que mata a quien la ve en siete días.", "the-ring.jpg", "Estados Unidos", new Resource(115, "www.netflix.com/the-ring"), [new Coordinate(34.0522, -118.2437)]);
let theExorcist = new Movie("The Exorcist", new Date(1973, 12, 26), "Una niña es poseída por un demonio y dos sacerdotes intentan expulsarlo.", "the-exorcist.jpg", "Estados Unidos", new Resource(122, "www.netflix.com/the-exorcist"), [new Coordinate(38.9072, -77.0369)]);
let theShining = new Movie("The Shining", new Date(1980, 5, 23), "Una familia se hospeda en un hotel aislado durante el invierno y comienzan a suceder cosas extrañas.", "the-shining.jpg", "Estados Unidos", new Resource(144, "www.netflix.com/the-shining"), [new Coordinate(39.7392, -104.9903)]);
let theHauntingOfHillHouse = new Serie("The Haunting of Hill House", new Date(2018, 10, 12), "Una familia se muda a una casa encantada y comienzan a suceder cosas extrañas.", "the-haunting-of-hill-house.jpg", "Estados Unidos", [new Resource(60, "www.netflix.com/the-haunting-of-hill-house1"), new Resource(60, "www.netflix.com/the-haunting-of-hill-house2"), new Resource(60, "www.netflix.com/the-haunting-of-hill-house3")], [new Coordinate(34.0522, -118.2437)], "T1");
let americanHorrorStory = new Serie("American Horror Story", new Date(2011, 10, 5), "Cada temporada cuenta una historia diferente de horror, desde un asilo embrujado hasta un circo de fenómenos.", "american-horror-story.jpg", "Estados Unidos", [new Resource(60, "www.netflix.com/american-horror-story1"), new Resource(60, "www.netflix.com/american-horror-story2"), new Resource(60, "www.netflix.com/american-horror-story3")], [new Coordinate(34.0522, -118.2437)], "T1, T2, T3");

// Crea la categoría "Miedo" si no existe y asigna las producciones a la categoría
try {
    let numProduccionesAsignadas = videos.assignCategory(categoriaMiedo, theRing, theExorcist, theShining, theHauntingOfHillHouse, americanHorrorStory);
    console.log(`Se han asignado ${numProduccionesAsignadas} producciones a la categoría ${categoriaMiedo.name}:`);
} catch (error) {
    console.log(error);
}



// Category es null
log("caso: Category es null");
try {
    videos.assignCategory(null, new Movie("The Ring II", new Date(2002, 9, 18), "Una cinta de vídeo que mata a quien la ve en siete días.", "the-ring.jpg", "Estados Unidos", new Resource(115, "www.netflix.com/the-ring"), [new Coordinate(34.0522, -118.2437)]));
} catch (error) {
    console.error(error.message);
}

//  Production es null
log("Caso: Production es null");
try {
    videos.assignCategory(videos.getCategory("Miedo"), null, []);
} catch (error) {
    console.error(error.message);
}

// ver si se han añadido correctamente las producciones nuevas 
log("Verificamos si se han añadido correctamente las producciones nuevas. \nproducciones:");
for (let produccion of videos.productions) {
    console.log("Title: " + produccion.title);
}


// Eliminamos las producciones  "theRing" y theShining de la categoría "Miedo".
log('Eliminamos la producción "theRing" de la categoría "Miedo"');
let numProduccionesAsignadas = videos.deassignCategory(categoriaMiedo, theRing, theShining);
log(`Se han eliminado las producciones "${theRing.title}" y "${theShining.title}"  de la categoría ${categoriaMiedo.name}, quedan ${numProduccionesAsignadas} producciones asignadas.`);


// Mostrar las producciones de la categoría "Miedo" antes de ser eliminada
console.log("\nProducciones de la categoría 'Miedo' antes de ser eliminada:");
for (let production of videos.getProductionCategory(categoriaMiedo)) {
    console.log(production.title);
}


// Eliminamos la categoría "categoriaMiedo"
log('Eliminamos la categoría "categoriaMiedo"')
log("Quedan " + videos.removeCategory(categoriaMiedo) + " categorias");

// Comprobamos que las producciones de la categoría eliminada se hayan asignado a la categoría por defecto
log("Comprobamos que las producciones de la categoría eliminada se hayan asignado a la categoría por defecto\nProducciones en la categoría por defecto:");
let defecto = videos.getCategory("default");
for (let production of videos.getProductionCategory(defecto)) {
    console.log("Title: "+production.title);
}






console.log("FINALIZANDO LAS PRUEBAS DE ASIGNACIÓN DE CATEGORÍAS");
console.log("================================\n");

console.log("================================");
console.log("PRUEBAS DE ASIGNACIÓN DE PRODUCCIONES A ACTORES");

// actores
const actorJuan = new Person("Juan", "Martínez", new Date(1980, 5, 15), "García", "img/juanmartinez.jpg", "alpha1");
const actrizMaria = new Person("María", "Sánchez", new Date(1985, 7, 3), "Pérez", "img/mariasanchez.jpg", "beta2");
const actorCarlos = new Person("Carlos", "Fernández", new Date(1970, 9, 11), "González", "img/carlosfernandez.jpg", "gamma3");

// añdimos los actores 
videos.addActor(actorJuan);
videos.addActor(actrizMaria);
videos.addActor(actorCarlos);

// mostrar los actores existentes en el sistema
console.log("ACTORES EXISTENTES EN EL SISTEMA:");
for (let actor of videos.actors) {
    console.log(`${actor.name} ${actor.lastName1} ${actor.lastName2}`);
}

// Asignamos producciones al actor Juan
log("Asignamos las  producciones 'theRing' y theHauntingOfHillHouse' al actor Juan");
log(videos.assignActor(actorJuan, theRing, theHauntingOfHillHouse));


log(`Producciones asignadas al actor Juan:`);
let prodsJ = videos.getProductionsActor(actorJuan);
for (let produccion of prodsJ) {
    log("title: " + produccion.title);
}


let laCasaDePapel = new Serie("La Casa de Papel", new Date(2017, 11, 20), "Un grupo de ladrones planea el mayor atraco de la historia en la Fábrica Nacional de Moneda y Timbre.", "la-casa-de-papel.jpg", "España", [new Resource(50, "www.netflix.com/la-casa-de-papel1"), new Resource(50, "www.netflix.com/la-casa-de-papel2")], [new Coordinate(40.4168, -3.7038)], "T1, T2, T3, T4");

let narcos = new Serie("Narcos", new Date(2015, 8, 28), "La historia de los carteles colombianos y su relación con los Estados Unidos y la DEA.", "narcos.jpg", "Estados Unidos", [new Resource(50, "www.netflix.com/narcos1"), new Resource(50, "www.netflix.com/narcos2")], [new Coordinate(6.2442, -75.5812)], "T1, T2, T3");


// Prueba cuando el objeto Person es null
log("Caso: el objeto Person es null")
try {
    videos.assignActor(null, laCasaDePapel, narcos);
} catch (error) {
    console.error(error.message);
}

// Prueba cuando el objeto Production es null
log("Caso: el objeto Production es null")
try {
    videos.assignActor(juan, null);
} catch (error) {
    console.error(error.message);
}


// Desasignamos una o dos producciones del actor Juan
log("Desasignamos la producción 'theRing' del actor Juan");
log(videos.deassignActor(actorJuan, theRing));

// Mostramos las producciones que quedan asignadas al actor Juan
log(`Mostramos las producciones que quedan asignadas al actor Juan:`);
prodsJ = videos.getProductionsActor(actorJuan);
if (prodsJ.length === 0) {
    log("El actor Juan no tiene ninguna producción asignada.");
} else {
    for (let produccion of prodsJ) {
        log("title: " + produccion.title);
    }
}





// Obtener el reparto de una producción
log("Obtener el reparto de una producción")

console.log(`Reparto de actores en la producción '${movie1.title}':`);
videos.assignActor(actor1, movie1);
videos.assignActor(actor2, movie1);
const cast = videos.getCast(movie1);

for (const actor of cast) {
    log(`- ${actor.name}`);
}


// Caso donde la producción es null
log("Caso: la producción es null")
try {
    const cast3 = videos.getCast(null);
    videos.assignActor(actorJuan, movie3);
    videos.assignActor(actorCarlos, movie3);
    for (const actor of cast3) {
        log(`- ${actor.name}`);
    }

} catch (e) {
    console.error(e.message);
}

console.log("================================");
console.log("FINALIZANDO LAS PRUEBAS DE ASIGNACIÓN DE PRODUCCIONES A ACTORES");

console.log("================================");
console.log("PRUEBAS DE ASIGNACIÓN DE PRODUCCIONES A DIRECTORES");

// directores
const directorPedro = new Person("Pedro", "Almodóvar", new Date(1949, 8, 25), "Caballero", "img/pedroalmodovar.jpg", "delta4");
const directoraSofia = new Person("Sofía", "Coppola", new Date(1971, 4, 14), "Coppola", "img/sofiacoppola.jpg", "epsilon5");
const directorDavid = new Person("David", "Fincher", new Date(1962, 8, 28), "Fincher", "img/davidfincher.jpg", "zeta6");

// añadimos los directores
videos.addDirector(directorPedro);
videos.addDirector(directoraSofia);
videos.addDirector(directorDavid);

// mostrar los directores existentes en el sistema
console.log("DIRECTORES EXISTENTES EN EL SISTEMA:");
for (let director of videos.directors) {
    console.log(`${director.name} ${director.lastName1} ${director.lastName2}`);
}

// Asignamos producciones al director Pedro Almodóvar
log("Asignamos las producciones 'Todo sobre mi madre' y 'Hable con ella' al director Pedro Almodóvar");
log(videos.assignDirector(directorPedro, movie1, movie2));


log(`Producciones asignadas al director Pedro Almodóvar:`);
let prodsP = videos.getProductionsDirector(directorPedro);
for (let produccion of prodsP) {
    log("title: " + produccion.title);
}



// Prueba cuando el objeto Person es null
log("Caso: el objeto Person es null")
try {
    videos.assignDirector(null, laCasaDePapel, narcos);
} catch (error) {
    console.error(error.message);
}

// Prueba cuando el objeto Production es null
log("Caso: el objeto Production es null")
try {
    videos.assignDirector(directorPedro, null);
} catch (error) {
    console.error(error.message);
}

// Desasignamos una o dos producciones del director Pedro Almodóvar
let todoSobreMiMadre = new Movie("Todo sobre mi madre", new Date(1999, 8, 16), "Una madre busca al padre de su hijo transexual después de que éste muera en un accidente.", "todo-sobre-mi-madre.jpg", "España", [new Resource(50, "www.netflix.com/todo-sobre-mi-madre1"), new Resource(50, "www.netflix.com/todo-sobre-mi-madre2")], [new Coordinate(40.4168, -3.7038)], 100);
let volver = new Movie("Volver", new Date(2006, 9, 26), "Tras la muerte de su tía, Raimunda encuentra un misterioso fantasma que la ayudará a resolver algunos problemas familiares.", "volver.jpg", "España", [new Resource(50, "www.netflix.com/volver1"), new Resource(50, "www.netflix.com/volver2")], [new Coordinate(40.4168, -3.7038)], 120);
let hableConElla = new Movie("Hable con ella", new Date(2002, 3, 14), "Dos hombres entablan una inusual amistad mientras cuidan a dos mujeres en coma.", "hable-con-ella.jpg", "España", [new Resource(50, "www.netflix.com/hable-con-ella1"), new Resource(50, "www.netflix.com/hable-con-ella2")], [new Coordinate(40.4168, -3.7038)], 112);

log(videos.assignDirector(directorPedro, todoSobreMiMadre, volver, hableConElla));




log("Desasignamos las producciones 'Hable con ella' y 'Volver' del director Pedro Almodóvar");
log(videos.deassignDirector(directorPedro, hableConElla, volver));

// Mostramos las producciones que quedan asignadas al director Pedro Almodóvar
log(`Mostramos las producciones que quedan asignadas al director ${directorPedro.name} ${directorPedro.lastName1}:`);
let prodsPedro = videos.getProductionsDirector(directorPedro);

for (let produccion of prodsPedro) {
    log("title: " + produccion.title);
}

console.log("================================");
console.log("FINALIZANDO LAS PRUEBAS DE ASIGNACIÓN DE PRODUCCIONES A DIRECTORES");
