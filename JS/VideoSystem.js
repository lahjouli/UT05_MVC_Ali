
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
            #productionsByCategory = [];   // Atributo privado para las producciones por categoría del sistema
            #productionsByDirector = [];  // Atributo privado para las producciones por director del sistema
            #productionsByActor = [];    // Atributo privado para las producciones por actor del sistema
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

            getCategory(name, description = "") {
                // Validamos que el parámetro name no sea undefined o una cadena vacía
                if (name === undefined || name === "") {
                    throw new Error("The parameter 'name' is required and cannot be empty.");
                }

                // Obtenemos la posición de la categoría en el array de categorías
                let position = this.getCategoryPosition(name);
                let category;


                // Si la categoría no existe, la creamos y la agregamos al array
                if (position === -1) {
                    category = new Category(name, description);
                    return category;
                }else {
                    category = this.#categories[position].category;

                }

                // Si la categoría ya existe, la recuperamos del array y la retornamos
                return category;
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
                const index = this.#users.findIndex(u => u.username === user.username);

                // Si el usuario no existe en el sistema, lanzar una excepción
                if (index === -1) {
                    throw new Error("El usuario no existe en el sistema.");
                }

                // Eliminar el usuario del array de usuarios
                this.#users.splice(index, 1);

                return this.#users;
            }

            addUser(user) {
                // Comprueba si el usuario es nulo o no es un objeto User
                if (!user || !(user instanceof User)) {
                    throw new Error("El usuario no es válido");
                }

                // Comprueba si el username ya existe
                if (this.#users.some(u => u.username === user.username)) {
                    console.log(this.#users);
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
                const categories = this.#categories; // obtener las categorias
                function* generator() { // crear un generador
                    for (let i = 0; i < categories.length; i++) { // iterar sobre las categorias
                        yield categories[i].category; // devolver la catgoria actual
                    }
                }
                return generator(); // retornamos el generador
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
                if (!(actor instanceof Person || actor)) {
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
                    if (obj.ID === actorID) {
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

                //
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



            //Asigna uno más producciones a unacategoría
            assignCategory(category, ...productions) {
                // Se verifica si se ha especificado una categoría y al menos una producción
                if (!category || !productions.length) {
                    throw new Error("Se deben especificar una categoría y al menos una producción");
                }

                // Se obtiene la posición de la categoría en el array de categorías
                let posCat = this.#categories.findIndex(cat => cat.category.name === category.name);

               


                // Si la categoría no existe se crea
                if (posCat === -1) {
                    this.addCategory(category);
                    posCat = this.#categories.length - 1; // actualizamos la posición de la categoría  añadida
                }


                // Se recorren las producciones y se les asigna la categoría si no existen en el sistema
                productions.forEach(production => {
                    const existingProd = this.#productions.find(prod => prod.title === production.title);
                    if (!existingProd) {
                        // Verificamos si la producción ya existe en la categoría
                        const prodExistsInCategory = this.#categories[posCat].productions.some(prodCa => prodCa.title === production.title);
                        if (!prodExistsInCategory) {
                            this.#categories[posCat].productions.push(production);
                        }
                        this.#productions.push(production);
                    }
                });


                return this.#categories[posCat].productions.length;
            }
            // Función que asigna una o varias producciones a un director.
            // Si el director o la producción no existen, se añaden al sistema.
            // Parámetros:
            // - director: objeto de tipo Person que representa al director a asignar.
            // - productions: uno o varios objetos de tipo Production que se asignarán al director.
            // Devuelve:
            // - El número total de producciones asignadas al director.
            assignDirector(director, ...productions) {

                // Se verifica si se ha especificado un director y al menos una producción
                if (!director || !productions.length) {
                    throw new Error("Se debe especificar un director y al menos una producción");
                }

                // Se obtiene la posición del director en el array de directores
                let posDirector = this.#directors.findIndex(dir => dir.name === director.name);

                // Si el director no existe se crea
                if (posDirector === -1) {
                    this.addDirector(director);
                    posDirector = this.#directors.length - 1; // actualizamos la posición del director añadido
                }


                // Se recorren las producciones y se les asigna el director si no existen aún en el sistema
                productions.forEach(production => {
                    const existingProd = this.#productions.find(prod => prod.title === production.title);
                    if (!existingProd) {
                        // Si la producción no existe aún en el sistema, se asigna el director especificado
                        const dirExistsInProduction = production.director && production.director.name === director.name;
                        if (!dirExistsInProduction) {
                            production.director = director;
                        }
                        // Se añade la producción al sistema
                        this.#productions.push(production);
                        // Se agrega la producción al array de producciones a añadir al director
                        prodToAdd.push(production);
                    }
                });



                // Se devuelve el número total de producciones asignadas al director
                return this.#directors[posDirector].productions.length;
            }
            /**
             * Desasigna una o más producciones de un actor.
             * @param {Person} person - El objeto de la clase `Person` que representa al actor.
             * @param  {...Production} productions - Un número variable de objetos de la clase `Production` que se desean desasignar.
             * @returns {Number} - El número total de producciones que quedan asignadas al actor.
             * @throws {Error} - Si `person` no es una instancia de la clase `Person` o es `null`.
             * @throws {Error} - Si `person` no existe en el sistema.
             * @throws {Error} - Si algún objeto de la clase `Production` pasado como argumento no es una instancia válida o es `null`.
             * @throws {Error} - Si alguna producción pasada como argumento no existe en el sistema.
             */
            deassignDirector(director, ...productions) {
                if (!(director instanceof Person)) {
                    throw new TypeError("El director debe ser un objeto válido de la clase `Person`.");
                }

                if (!productions.every(production => production instanceof Production) || productions.length === 0) {
                    throw new TypeError("Controlado : productions debe ser un array de instancias de Production y no puede estar vacío.");
                }

                // Obtenemos la posición del director en el array de directores
                const directorIndex = this.#directors.findIndex(dir => dir.name === director.name);
                if (directorIndex === -1) {
                    throw new Error("El director no existe.");
                }

                // Filtramos las producciones que no deben ser eliminadas del director
                const remainingProductions = this.#directors[directorIndex].productions.filter(production => !productions.includes(production));

                // Actualizamos las producciones del director con las producciones restantes
                this.#directors[directorIndex].productions = remainingProductions;

                // Retornamos el número total de producciones asignadas al director
                return this.#directors[directorIndex].productions.length;
            }















            // Asigna uno o más producciones a un actor
            assignActor(actor, ...productions) {
                // Verificamos si se ha especificado un actor y al menos una producción
                if (!actor || !productions.length) {
                    throw new Error("Se deben especificar un actor y al menos una producción");
                }

                // Obtenemos la posición del actor en el array de actores
                let posActor = this.#actors.findIndex(act => act.name === actor.name);

                // Si el actor no existe se crea
                if (posActor === -1) {
                    this.addActor(actor);
                    posActor = this.#actors.length - 1; // actualizamos la posición del actor añadido
                }

                // Recorremos las producciones y se les asigna el actor si no existen en el sistema
                productions.forEach(production => {
                    const existingProd = this.#productions.find(prod => prod.title === production.title);
                    if (!existingProd) {
                        // Verificamos si la producción ya existe en el actor
                        const prodExistsInActor = this.#actors[posActor].productions.some(prodAc => prodAc.title === production.title);
                        if (!prodExistsInActor) {
                            this.#actors[posActor].productions.push(production);
                        }
                        this.#productions.push(production);
                    }
                });

                return this.#categories[posActor].productions.length;
            }

            deassignActor(actor, productions) {
                if (!(actor instanceof Person)) {
                    throw new TypeError("El actor debe ser un objeto válido de la clase `Person`.");
                }

                if (!productions.every(production => production instanceof Production) || productions.length === 0) {
                    throw new TypeError("Controlado : productions debe ser un array de instancias de Production y no puede estar vacío.");
                }

                // Obtenemos la posición del actor en el array de actores
                const index = this.#actors.findIndex(act => act.name === actor.name);
                if (index === -1) {
                    throw new Error("El actor no existe.");
                }

                // Filtramos las producciones que no deben ser eliminadas del actor
                const remainingProductions = this.#actors[index].productions.filter(production => !productions.includes(production));

                // Actualizamos las producciones del director con las producciones restantes
                this.#actors[index].productions = remainingProductions;

                // Retornamos el número total de producciones asignadas al actor
                return this.#actors[index].productions.length;

            }

            /**
             * Obtiene un iterador con la relación de los actores del reparto de una producción y sus personajes.
             * @param {Production} production - La producción de la cual se desea obtener el reparto.
             * @returns {Iterator} - Un iterador que contiene los actores que han actuado en la producción.
             */
            *getCast(production) {
                // Verificamos que el parámetro recibido sea una instancia de la clase Production
                if (!(production instanceof Production))
                    throw new Error("Se debe especificar una producción");

                // Filtramos los actores que hayan participado en la producción que se está buscando
                const actorsInProduction = this.#actors.filter(actor => actor.productions.some(p => p.title === production.title));

                // Iteramos sobre cada actor que haya participado en la producción, retornando su nombre de actor
                for (const actor of actorsInProduction) {
                    yield actor.actor;
                }
            }

            *getProductionsDirector(director) {
                if (!(director instanceof Director))
                    throw new Error("Se debe especificar un");

                // Filtramos las producciones por el nombre del director
                let productions = this.#productions.filter(
                    (production) => production.director.name === director.name
                );

                // Devolvemos las producciones encontradas como iterador
                for (let production of productions) {
                    yield production;
                }
            }

            /**
             * Obtiene un iterador con las producciones de un director.
             * @param {Person} director - El director cuyas producciones se van a obtener.
             * @returns {Iterator} - Un iterador que genera las producciones del director.
             */
            *getProductionDirector(director) {
                // Verificamos que el parámetro director sea una instancia de la clase Person.
                if (!(director instanceof Person)) {
                    throw new InvalidValueException("director", "Person");
                }

                // Obtenemos el índice del director en el array de directores.
                const dirIndex = this.#findDirectorPos(director.ID);

                // Recorremos las producciones del director y las vamos generando con yield.
                for (const production of this.#directors[dirIndex].productions) {
                    yield production;
                }
            }

            /**
 * Obtiene un iterador con las producciones de un actor.
 * @param {Person} actor - Actor cuyas producciones se desean obtener.
 * @returns {Generator} Generador con las producciones del actor.
 * @throws {TypeError} Si el parámetro actor no es una instancia de Person.
 */
            *getProductionsActor(actor) {
                // Se valida que el parámetro actor sea una instancia de Person
                if (!(actor instanceof Person)) {
                    throw new TypeError("El parámetro actor debe ser una instancia de Person.");
                }

                // Se obtiene el índice del actor en el array de actores
                const actorIndex = this.#actors.findIndex(act => act.ID === actor.ID);

                // Se recorre el array de producciones del actor y se retorna un generador con ellas
                for (const production of this.#actors[actorIndex].productions) {
                    yield production;
                }
            }

            /** array
             * Obtiene todas las producciones de una categoría.
             *
             * @param {Category} category - Categoría de la que se quieren obtener las producciones.
             * @returns {Generator} - Generador que produce las producciones de la categoría.
             * @throws {InvalidValueException} - Si la categoría proporcionada no es una instancia de Category.
             * @throws {NotFoundException} - Si la categoría no existe en el sistema.
             */
            *getProductionCategory(category) {
                // Verificamos que la categoría sea válida
                if (!(category instanceof Category) || (!category))
                    throw new Error("La categoría proporcionada no es válida");

                // Obtenemos el array de producciones de la categoría
                let productionsArray = this.#categories[this.#FinCategoryPos(category.name)]?.productions;

                // Si la categoría no existe, lanzamos una excepción
                if (!productionsArray)
                    throw new NotFoundException(`Categoría '${category.name}' no encontrada.`);

                // Retornamos un generador que produce las producciones de la categoría
                for (let production of productionsArray) {
                    yield production;
                }
            }

            /**
             * Obtiene la posición de una categoría en el array
             */
            #FinCategoryPos(categoryName) {
                for (let i = 0; i < this.#categories.length; i++) {
                    if (this.#categories[i].name === categoryName) {
                        return i;
                    }
                }

                // Si la categoría no existe en el array, retornamos -1
                return -1;
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
    }
})();
