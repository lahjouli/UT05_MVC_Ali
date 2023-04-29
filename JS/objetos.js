"use strict";

export class Person {
    #name;
    #lastName1;
    #lastName2;
    #born;
    #picture;
    #ID; // ID añadido para identdicar a los actores


    constructor(name, lastName1, born, lastName2, picture, ID) {
        this.#name = name;
        this.#lastName1 = lastName1;
        this.#lastName2 = lastName2;
        this.#born = born;
        this.#picture = picture;
        this.#ID = ID;
    }

    // getters
    get name() {
        return this.#name;
    }

    get lastName1() {
        return this.#lastName1;
    }

    get lastName2() {
        return this.#lastName2;
    }

    get born() {
        return this.#born;
    }

    get picture() {
        return this.#picture;
    }

    // setters
    set name(name) {
        this.#name = name;
    }

    set lastName1(lastName1) {
        this.#lastName1 = lastName1;
    }

    set lastName2(lastName2) {
        this.#lastName2 = lastName2;
    }

    set born(born) {
        this.#born = born;
    }

    set picture(picture) {
        this.#picture = picture;
    }

    get ID(){
        return this.#ID;
    }

    // toString method
    toString() {
        return `${this.#name} ${this.#lastName1} ${this.#lastName2} (${this.#born})`;
    }
}



export class Category {
    #name;
    #description;

    constructor(name, description="") {
        this.#name = name;

        // Si el parámetro "description" es falsy (undefined, null, 0, false, ''), 
        // asigna una cadena vacía como valor por defecto. De lo contrario, 
        // asigna el valor del parámetro a la propiedad privada "#description".
        this.#description = description || "";
    }

    // getters
    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    // setters
    set name(name) {
        this.#name = name;
    }

    set description(description) {
        this.#description = description || "";
    }

    // toString method
    toString() {
        return `${this.#name} - ${this.#description}`;
    }
}


export class Resource {
    #duration;
    #link;

    constructor(duration, link) {
        if (!duration || !link) {
            throw new ResourceError("Se requieren ambos parámetros 'duration' y 'link'");
        }
        this.#duration = duration;
        this.#link = link;
    }


}


export class Production {


    #title;
    #publication;
    #synopsis;
    #image;
    #nacionality;


    constructor(title, publication, synopsis, image, nacionality) {
        // Evita que se pueda instanciar directamente la clase abstracta Production
        if (new.target === Production) {
            throw new TypeError("No se pueda instanciar directamente la clase abstracta Production");
        }
        this.#title = title;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;
        this.#nacionality = nacionality;
    }

    get title(){
        return this.#title;
    }

}


export class Movie extends Production {
    #resource;
    #locations;

    /**
     * Constructor de la clase Movie
     * @param {String} title Título de la película
     * @param {Date} publication Fecha de publicación de la película
     * @param {Resource} resource Recurso con el contenido de la película
     * @param {[Coordinate]} locations Array con diferentes ubicaciones donde transcurre la película
     * @param {String} nationality Nacionalidad de la película
     * @param {String} synopsis Resumen del contenido de la película
     * @param {String} image Ruta donde está ubicada la imagen
     */
    constructor(title, publication, resource = new Resource(1, "www.example1.com"), locations = new Resource(1, "www.example1.com")
    , nationality, synopsis, image) {
        super(title, publication, nationality, synopsis, image);
        this.#resource = resource;
        this.#locations = locations;
    }

    /**
     * Getter de la propiedad resource
     * @returns {Resource} Recurso con el contenido de la película
     */
    get resource() {
        return this.#resource;
    }

    /**
     * Setter de la propiedad resource
     * @param {Resource} resource Recurso con el contenido de la película
     */
    set resource(resource) {
        this.#resource = resource;
    }

    /**
     * Getter de la propiedad locations
     * @returns {[Coordinate]} Array con diferentes ubicaciones donde transcurre la película
     */
    get locations() {
        return this.#locations;
    }

    /**
     * Setter de la propiedad locations
     * @param {[Coordinate]} locations Array con diferentes ubicaciones donde transcurre la película
     */
    set locations(locations) {
        this.#locations = locations;
    }

    /**
     * Método toString de la clase Movie
     * @returns {String} Representación en formato String de la instancia de la clase Movie
     */
    toString() {
        return `${super.toString()} Resource: ${this.#resource}, Locations: ${this.#locations}`;
    }
}



export class Serie extends Production {
    #resources;
    #locations;
    #seasons;

    constructor(title, nationality, publication, synopsis, image, resources, locations, seasons) {
        super(title, nationality, publication, synopsis, image);
        this.#resources = resources;
        this.#locations = locations;
        this.#seasons = seasons;
    }

    // Getters
    getResources() {
        return this.#resources;
    }

    getLocations() {
        return this.#locations;
    }

    getSeasons() {
        return this.#seasons;
    }

    // Setters
    setResources(resources) {
        this.#resources = resources;
    }

    setLocations(locations) {
        this.#locations = locations;
    }

    setSeasons(seasons) {
        this.#seasons = seasons;
    }
}



export class User {
    #username;
    #email;
    #password;

    constructor(username, email, password) {
        this.#username = username;
        this.#email = email;
        this.#password = password;
    }

    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    set username(value) {
        this.#username = value;
    }

    set email(value) {
        this.#email = value;
    }

    set password(value) {
        this.#password = value;
    }
}




export class Coordinate {

    #latitude//Latitud de la ubicación
    #longitude   //Longitud de la ubicación.

    constructor(latitude, longitude) {
        this.#latitude = latitude;
        this.#longitude = longitude;

    }

    get longitude() {
        return this.#longitude;
    }


    get latitude() {
        return this.#latitude;
    }

}