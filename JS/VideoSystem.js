
"use strict";

import {
    Person,
    Category,
    Production,
    User,
    Movie,
    Resource,
    Serie,
} from "./objetos.js";


export const VideoSystem = (function () {

    let instance = null; // Variable que almacena la única instancia del objeto VideoSystem

    function initializeVideoSystem() { // Función que inicializa la clase VideoSystem

        class VideoSystem { // Definición de la clase VideoSystem

            #name; // Atributo privado para el nombre del sistema
            #categories = []; // Atributo privado para las categorías del sistema
            #users = []; // Atributo privado para los usuarios del sistema
            #productions = []; // Atributo privado para las producciones del sistema
            #actors = []; // Atributo privado para los actores del sistema
            #directors = []; // Atributo privado para los directores del sistema


            /*
            #productionsByCategory = []; // Atributo privado para las producciones por categoría del sistema
            #productionsByDirector = []; // Atributo privado para las producciones por director del sistema
            #productionsByActor = []; // Atributo privado para las producciones por actor del sistema
            */

            #defaultCategory = new Category("default", "Default category"); // Nueva propiedad para la categoría por defecto

            constructor(name) { // Constructor de la clase VideoSystem que recibe el nombre del sistema como parámetro
                this.#name = name;
                this.addCategory(this.#defaultCategory); // Agregar la categoría por defecto al array de categorías

            }

            //MÉTODOS de la clase


            // Getter para el atributo name
            get name() {
                return this.#name;
            }

            // Setter para el atributo name
            set name(newName) {
                if (newName === '') {
                    throw new Error('El nombre no puede ser vacío');
                }
                this.#name = newName;
            }


            /**
             * Devuelve la posición de una categoría en el array de categorías
             * @param {string} categoryName - El nombre de la categoría a buscar
             * @returns {number} La posición de la categoría en el array, -1 si no se encuentra
             */
            getCategoryPosition(categoryName) {
                // Convertimos el nombre de la categoría buscada a minúsculas
                const categoryToFind = categoryName.toLowerCase();

                // Iteramos por todas las categorías del sistema
                for (let i = 0; i < this.#categories.length; i++) {
                    // Convertimos el nombre de la categoría actual a minúsculas y lo comparamos con el nombre de la categoría buscada
                    if (this.#categories[i].category.name.toLowerCase() === categoryToFind) {
                        // Si encontramos la categoría, devolvemos su posición en el array
                        return i;
                    }
                }
                // Si no se encuentra la categoría, devolvemos -1
                return -1;
            }

            /**
             * Añade una nueva categoría al sistema
             * @param {Category} category - Objeto Category a añadir
             * @throws {TypeError} Si category no es una instancia de Category
             * @throws {Error} Si la categoría ya existe en el sistema
             * @returns {number} Número de categorías en el sistema tras la operación
             */
            addCategory(category) {
                // Verificar que el parámetro category es una instancia de Category
                if (!(category instanceof Category)) {
                    throw new TypeError("El parámetro category debe ser una instancia de Category");
                }

                // Verificar que la categoría no existe en el sistema
                const categoryPosition = this.getCategoryPosition(category.name);
                if (categoryPosition !== -1) {
                    throw new Error(`La categoría ${category.name} ya existe en el sistema`);
                }

                // Crear un nuevo objeto que contenga la categoría y un array vacío de producciones
                const newCategory = {
                    category: category,
                    productions: []
                };

                // Agregar el nuevo objeto al array de categorías
                this.#categories.push(newCategory);

                // Retornar la longitud actual del array de categorías
                return this.#categories.length;
            }


            removeCategory(category) {
                // Verificar que la categoría es una instancia de Category
                if (!(category instanceof Category)) {
                    throw new TypeError('La categoría no es una instancia de Category');
                }

                // Verificar que no se está intentando eliminar la categoría por defecto
                if (category.name === this.#categories[0].category.name) {
                    throw new Error('No se puede eliminar la categoría por defecto');
                }

                // Encontrar la posición de la categoría en el array de categorías
                const categoryIndex = this.#categories.findIndex((cat) => cat.category.name === category.name);

                // Si no se encontró la categoría, lanzar una excepción
                if (categoryIndex === -1) {
                    throw new Error('La categoría no se encuentra en la lista');
                }

                // Filtrar las producciones de la categoría que no están en la categoría por defecto
                // Se busca filtrar las producciones de la categoría que no están en la categoría por defecto, 
                // para poder agregarlas a esta última, ya que no pueden ser eliminadas.
                const filteredProductions = this.#categories[categoryIndex].productions.filter(
                    (prod) => !this.#categories[0].productions.some((defaultProd) => defaultProd.name === prod.name)
                );

                // Agregar las producciones filtradas a la categoría por defecto
                // Se agregan las producciones filtradas de la categoría eliminada a la categoría por defecto.
                this.#categories[0].productions.push(...filteredProductions);

                // Eliminar la categoría del array de categorías
                this.#categories.splice(categoryIndex, 1);

                // Retornar la longitud actual del array de categorías
                return this.#categories.length;
            }



            /**
             * Asigna una categoría a una o varias producciones.
             *
             * @param {object} category - Objeto de la categoría a asignar.
             * @param {array} productions - Array de objetos de las producciones a asignar.
             * @throws {Error} - Si no se especifica una categoría o al menos una producción.
             */
            assignCategory(category, ...productions) {
                // Se verifica si se ha especificado una categoría y al menos una producción, de lo contrario se lanza un error
                if (!category || !productions.length) {
                    throw new Error("Se deben especificar una categoría y al menos una producción");
                }

                // Se obtiene la posición de la categoría en el array de categorías
                let posCat = this.#categories.findIndex(cat => cat.category.name === category.name);

                // Si la categoría no existe en el sistema, se crea una nueva categoría con el nombre indicado y se añade al array de categorías
                if (posCat === -1) {
                    this.addCategory(category);
                    posCat = this.#categories.length - 1; // actualizamos la posición de la categoría recién añadida
                }

                // Se recorren las producciones y se les asigna la categoría
                productions.forEach(production => {
                    // Se verifica si la producción ya existe en el sistema, en cuyo caso se actualiza su categoría
                    const existingProd = this.#productions.find(prod => prod.title === production.title);
                    if (existingProd) {
                        existingProd.category = category;
                    } else {
                        // Si la producción no existe, se agrega al sistema y se le asigna la categoría
                        this.#productions.push(production);
                        production.category = category;
                    }
                });

                // Se agrega la categoría a la lista de categorías asociadas a las producciones
                this.#categories[posCat].productions.push(...productions);

                return this.#categories[posCat].productions.length;
            }




            // Método getter que devuelve un generador para iterar por los usuarios del sistema
            get users() {
                let index = 0; // Variable que almacena el índice actual del usuario en el array
                let users = this.#users; // Array de usuarios del sistema

                // Generador que se encarga de iterar por el array de usuarios
                function* userGenerator() {
                    while (index < users.length) { // Mientras no se llegue al final del array
                        yield users[index++]; // Devuelve el usuario actual y avanza al siguiente índice
                    }
                }

                // Devuelve el generador
                return userGenerator();
            }

            removeUser(user) {
                // Verificar que el parámetro sea un objeto User válido
                if (!(user instanceof User)) {
                    throw new Error("El usuario no es válido.");
                }

                // Buscar el índice del usuario en el array de usuarios
                const index = this.#users.findIndex(u => u.number === user.number);

                // Si el usuario no existe en el sistema, lanzar una excepción
                if (index === -1) {
                    throw new Error("El usuario no existe en el sistema.");
                }

                // Eliminar el usuario del array de usuarios
                this.#users.splice(index, 1);

                return this;
            }

            addUser(user) {
                // Comprueba si el usuario es nulo o no es un objeto User
                if (!user || !(user instanceof User)) {
                    throw new Error("El usuario no es válido");
                }

                // Comprueba si el username ya existe
                if (this.#users.some(u => u.username === user.username)) {
                    throw new Error("El username ya existe");
                }

                // Comprueba si el email ya existe
                if (this.#users.some(u => u.email === user.email)) {
                    throw new Error("El email ya existe");
                }

                // Añade el usuario al sistema
                this.#users.push(user);

                // Devuelve el número de elementos del sistema (incluyendo el nuevo usuario)
                return this.#users.length;
            }


            get productions() {
                const productions = this.#productions; // 
                function* generator() { // crear un generador
                    for (let i = 0; i < productions.length; i++) { // iterar
                        yield productions[i]; // devolver la produccion actual
                    }
                }
                return generator(); // retornarmos el generador
            }



            get categories() {
                const categories = this.#categories; // obtener las producciones
                function* generator() { // crear un generador
                    for (let i = 0; i < categories.length; i++) { // iterar sobre las producciones
                        yield categories[i]; // devolver la producción actual
                    }
                }
                return generator(); // retornar el generador
            }

            /**
             * Añade una nueva producción al sistema.
             * @param {Production} production - Objeto Production a añadir.
             * @returns {Number} - Número de elementos del sistema después de la adición.
             * @throws {Error} - Si la producción es null o no es un objeto Production, o si la producción ya existe.
             */
            addProduction(production) {
                // Comprobar que la producción no es null y es un objeto Production
                if (!production || !(production instanceof Production)) {
                    throw new Error('La producción no es un objeto Production o es null');
                }

                // Comprobar que la producción no existe ya en el sistema
                if (this.#productions.find((p) => p.title === production.title)) {
                    throw new Error('La producción ya existe en el sistema');
                }

                // Añadir la producción al sistema
                this.#productions.push(production);

                // Devolver el número de elementos del sistema después de la adición
                return this.#productions.length;
            }




            // Devuelve un iterador que permite recuperar las producciones de una categoría
            *getProductionsCategory(category) {
                // Comprobamos que la categoría es una instancia de Category
                if (!(category instanceof Category) || category == null) {
                    throw new Error("Invalid category object.");
                }

                // Buscamos la posición de la categoría
                const categoryPosition = this.getCategoryPosition(category.name);

                // Si la categoría no existe se lanza una excepción
                if (categoryPosition === -1) {
                    throw new Error("Category not found.");
                }

                // Iteramos sobre las producciones de la categoría y las devolvemos usando yield
                for (const production of this.#categories[categoryPosition].productions) {
                    yield production;
                }
            }

            // Elimina una producción de una categoría
            deassignCategory(category, ...productions) {
                if (!(category instanceof Category))
                    throw new TypeError("category must be an instance of Category");
                if (!productions.every(production => production instanceof Production) || productions.length == 0)
                    throw new TypeError("productions must be an array of Production instances and cannot be empty");

                // Obtenemos la posición de la categoría en array de  categorías
                let posCategory = this.getCategoryPosition(category.name);

                // Si la categoría existe en el sistema
                if (posCategory !== -1) {
                    // Removemos las producciones de la categoría
                    this.removeProductions(this.#categories[posCategory].productions, productions);

                    // Retornamos el número de producciones que quedan en la categoría
                    return this.#categories[posCategory].productions.length;
                }

                // Si la categoría no existe, retornamos -1
                return -1;
            };



            // Método para remover producciones 
            removeProductions(productionsArray, productionsToRemove) {

                for (let production of productionsToRemove) {
                    let index = productionsArray.indexOf(production);

                    // Si la producción existe en el array, la removemos
                    if (index !== -1) {
                        productionsArray.splice(index, 1);
                    }
                }
            };



            // Actor 

            addActor(actor) {
                //El actor no puede ser null o no es un objeto Person.
                if (actor instanceof Person || !actor) {
                    throw new Error("Controlado: El actor debe ser una instacia de la clase Person");
                }

                // Si El actor ya existe.
                if (this.#actorPos(actor.ID) != -1) {
                    throw new Error("Controlado: ¡El actor ya existe!");
                }

                // Añadirmos el actor al array de actores 
                this.#actors.push(
                    {
                        actor: actor, // actor 
                        productions: [], // producciones asocciadas al actor
                    }
                );

                return this.#actors.length;
            };



            // devuelve la posicion del onjeto literal que contiene el actor 
            #actorPos(actorID) {
                for (let i = 0; i < this.#actors.length; i++) {
                    let obj = this.#actors[i].actor;
                    if (obj.actor.ID === actorID) {
                        return i; // devolvemos la posicion del actor 
                    }
                }
                return -1;
            }

            removeActor(actor) {

                //El actor no puede ser null o no es un objeto Person.
                if (actor instanceof Person || !actor) {
                    throw new Error("Controlado: El actor debe ser una instacia de la clase Person");
                }

                let index = this.#actorPos(actor.ID);

                // Si El actor NO existe.
                if (index == -1) {
                    throw new Error("Controlado: ¡El actor NO existe!");
                }

                // borramos el actor
                this.#actors.splice(index, 1);

                return this.#actors.length;
            }

            get directors() {
                const directors = this.#directors;
                function* generator() {
                    for (let i = 0; i < directors.length; i++) {
                        yield directors[i]; // 
                    }
                }
                return generator();

            }



            // metodo privado
            #findDirectorPos(directorID) {
                let pos = -1;
                for (let i = 0; i < this.#directors.length; i++) {
                    if (obj.director.ID === directorID) {
                        pos = i;
                    }
                }
                return pos;
            }

            addDirector(director) {
                // El director no puede ser null o no es un objeto Person.
                if (!director || !(director instanceof Person)) {
                    throw new Error('El tiene que ser un objeto Person.');
                }

                // Comprobar que el director no existe ya en el sistema
                if (this.#directors.find((d) => d.title === director.title)) {
                    throw new Error("El director " + director.name + " ya existe en el sistema");
                }

                this.#directors.push(
                    {
                        director: director,
                        productions: [],

                    }
                );

                return this.#directors.length;
            }

            removeDirector(director) {
                // El director no puede ser null o no es un objeto Person.
                if (!director || !(director instanceof Person)) {
                    throw new Error('El tiene que ser un objeto Person.');
                }

                const index = this.#findDirectorPos(director.ID);

                //  El director no existe en el sistema
                if (index === -1) {
                    throw new Error("El director " + director.name + " ya existe en el sistema");
                }

                this.#directors.splice(index, 1);

                //
                return this.#directors.length;
            }


            // Asignar una o más producciones a un director
            //Si el director o el objeto Production no existen se añaden al sistem
            assignDirector(director, ...producciones) {

                // Si el director  es null 
                if (!director) {
                    throw new Error('El director tiene que ser un objeto Person.');
                }


                // Si las algun objeto de  "Productions" es null
                if (producciones.forEach(prod => { prod instanceof Production })) {

                }

                if (this.#directorPos == -1) {
                    this.addDirector(actor);
                }

                //

                return this.#directors.length;
            }













            // Devuelve un objeto iterador que permite recorrer los actores registrados en el sistema
            get actors() {
                // Definimos una función generadora que itera sobre el array de actores
                function* actorGenerator() {
                    for (const actor of this.#actors) {
                        yield actor;
                    }
                }
                // Devolvemos el objeto iterador generado por la función
                return actorGenerator();
            }
        }

        const name = "VideoSystem"; // Nombre del sistema
        return Object.freeze(new VideoSystem(name)); // Retorna una instancia del objeto VideoSystem y la congela para que no se pueda modificar
    }

    return {
        getInstance() { // Retorna la única instancia del objeto VideoSystem
            if (!instance) { // Si no hay una instancia previamente creada, se crea una
                instance = initializeVideoSystem();
            }
            return instance; // Retorna la instancia creada
        }
    };
})();
