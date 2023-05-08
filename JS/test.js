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
console.info("FINALIZANDO TESTEO DE CATEGORIAS");


log("================================");
log("PRUEBA DE PRODUCCIONES");

// Creamos las series
let serie1 = new Serie("Merlí", new Date(2015, 9, 14), "Un profesor de filosofía que enseña a pensar y a cuestionar.", "merli.jpg", "España", [new Resource(60, "www.netflix.com/merli1"), new Resource(60, "www.netflix.com/merli2"), new Resource(60, "www.netflix.com/merli3")], [new Coordinate(41.3851, 2.1734)], "T1, T2, T3");

let serie2 = new Serie("The Alienist", new Date(2018, 1, 22), "Un psicólogo que usa la psicología para atrapar a un asesino.", "the-alienist.jpg", "Estados Unidos", [new Resource(50, "www.netflix.com/the-alienist1"), new Resource(50, "www.netflix.com/the-alienist2")], [new Coordinate(40.7128, -74.0060)], "T1, T2"); 
let serie3 = new Serie("Black Mirror", new Date(2011, 12, 4), "Las consecuencias de la tecnología y la inteligencia artificial.", "black-mirror.jpg", "Reino Unido", [new Resource(60, "www.netflix.com/black-mirror1"), new Resource(60, "www.netflix.com/black-mirror2"), new Resource(60, "www.netflix.com/black-mirror3"), new Resource(60, "www.netflix.com/black-mirror4"), new Resource(60, "www.netflix.com/black-mirror5")], [], "T1, T2, T3, T4, T5");



// Creamos las peliculas 
let movie1 = new Movie("Filósofos griegos", new Date(2022, 10, 15), "Un documental que muestra cómo las ideas de los antiguos pensadores griegos influyeron en la cultura occidental.", "filosofos-griegos.jpg", "Grecia", new Resource(90, "www.filosofosgriegos.com"), [new Coordinate(37.9838, 23.7275), new Coordinate(38.2466, 21.7344), new Coordinate(39.0742, 21.8243)]);
 
let movie2 =new Movie("Lacan: Reinventar el psicoanálisis", new Date(2023, 1, 20), "La vida y la obra de Jacques Lacan, uno de los psicoanalistas más importantes del siglo XX.", "lacan.jpg", "Francia", new Resource(120, "www.lacan.com"), [new Coordinate(48.8566, 2.3522), new Coordinate(43.2965, 5.3698), new Coordinate(45.7640, 4.8357)]);
 
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
