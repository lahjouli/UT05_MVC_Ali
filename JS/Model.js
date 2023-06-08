

import {
    Person,
    Category,
    Production,
    User,
    Movie,
    Resource,
    Serie,
} from "./objetos.js";



const VideoSystem = (function () {

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
                } else {
                    category = this.#categories[position].category;

                }

                // Si la categoría ya existe, la recuperamos del array y la retornamos
                return category;
            }


            // Factoría de usuarios
            // Crea y devuelve una instancia de la clase User
            createUser(username, email, password) {
                // Comprobamos si el nombre de usuario es válido
                if (!username || username.trim() === "") {
                    throw new Error("El nombre de usuario es requerido.");
                }

                // Buscamos la posición del usuario en la lista de usuarios
                const position = this.#users.findIndex((u) => u.username === username);

                let user;

                if (position === -1) {
                    // Si el usuario no existe, creamos una nueva instancia de User
                    user = new User(username, email, password);
                    // Agregamos el usuario a la lista de usuarios
                    this.#users.push(user);
                } else {
                    // Si el usuario existe, recuperamos la instancia existente
                    user = this.#users[position];
                }

                return user;
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

                console.log(this.#users);
                // Comprueba si el username ya existe
                if (this.#users.some((u) => u.username === user.username)) {
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
                    for (let i = 1; i < categories.length; i++) { // iterar sobre las categorias
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




            /*
            // Devuelve un iterador que permite recuperar las producciones de una categoría
            *getProductionCategory(category) {
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

            */

            // Elimina una producción de una categoría
            deassignCategory(category, ...productions) {
                if (!(category instanceof Category))
                    throw new TypeError("la categoría debe ser una instancia de Category");

                if (!productions.every(production => production instanceof Production) || productions.length === 0)
                    throw new TypeError("las producciones deben ser un array de instancias de Production y no puede estar vacío");

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


            /*
            addActor(actor) {
                //El actor no puede ser null o no es un objeto Person.
                if (!(actor instanceof Person || actor)) {
                    throw new Error("Controlado: El actor debe ser una instacia de la clase Person");
                }

                // Si El actor ya existe.
                if (this.#actorPos(actor.ID) !== -1) {
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

            */

            addActor(actor) {
                // El actor no puede ser null o no es un objeto Person.
                if (!(actor instanceof Person || actor)) {
                    throw new Error("Controlado: El actor debe ser una instancia de la clase Person");
                }

                // Verificamos si el actor ya existe en función de su nombre y apellidos
                const actorExists = this.#actors.some((act) => {
                    return (
                        act.actor.name.localeCompare(actor.name, "en", { sensitivity: "base" }) === 0 &&
                        act.actor.lastName1.localeCompare(actor.lastName1, "en", { sensitivity: "base" }) === 0 &&
                        act.actor.lastName2.localeCompare(actor.lastName2, "en", { sensitivity: "base" }) === 0
                    );
                });

                if (actorExists) {
                    throw new Error("Controlado: ¡El actor ya existe!");
                }

                // Añadimos el actor al array de actores
                this.#actors.push({
                    actor: actor, // actor
                    productions: [], // producciones asociadas al actor
                });

                return this.#actors.length;
            }



            // devuelve la posicion del onjeto literal que contiene el actor 
            #actorPos(actor) {
                for (let i = 0; i < this.#actors.length; i++) {
                    let obj = this.#actors[i].actor;
                    if (
                        obj.name.localeCompare(actor.name, "en", { sensitivity: "base" }) === 0 &&
                        obj.lastName1.localeCompare(actor.lastName1, "en", { sensitivity: "base" }) === 0
                    ) {
                        return i; // devolvemos la posición del actor
                    }
                }
                return -1;
            }


            removeActor(actor) {

                //El actor no puede ser null o no es un objeto Person.
                if (!actor instanceof Person || !actor) {
                    throw new Error("Controlado: El actor debe ser una instacia de la clase Person");
                }

                let index = this.#actorPos(actor);

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
                        yield directors[i].director; // 
                    }
                }
                return generator();

            }


            /**
             * Obtiene una instancia de un actor a partir del nombre y apellidos proporcionados.
             * Si el actor no existe, se crea una nueva instancia de la clase Person.
             * @param {string} name - Nombre del actor.
             * @param {string} lastname1 - Primer apellido del actor.
             * @param {string} lastname2 - Segundo apellido del actor (opcional).
             * @param {string} born - Fecha de nacimiento del actor (opcional).
             * @param {string} picture - URL de la imagen del actor (opcional).
             * @returns {Person} - Instancia de la clase Person que representa al actor.
             * @throws {EmptyValueException} - Si el parámetro 'name' está vacío o no está definido.
             */
            getActor(name, lastName1, lastName2 = "", born, picture = "") {
                // Verificar si el nombre está vacío o no está definido
                if (!name || name.trim() === "") {
                    throw new EmptyValueException("name");
                }

                // Buscar al actor en la lista de actores
                const actor = this.#actors.find((act) => {
                    return (
                        name.localeCompare(act.actor.name, "es", { sensitivity: "base" }) === 0 &&
                        lastName1.localeCompare(act.actor.lastName1, "es", { sensitivity: "base" }) === 0
                    );
                });

                // Si se encuentra el actor, retornar la instancia existente
                if (actor) {
                    return actor.actor;
                }

                // Si el actor no existe, crear una nueva instancia de Person
                return new Person(name, lastName1, lastName2, born, picture);
            }





            addDirector(director) {
                // El director no puede ser null o no es un objeto Person.
                if (!director || !(director instanceof Person)) {
                    throw new Error("El director debe ser una instancia de la clase Person.");
                }

                // Verificamos si el director ya existe en función de su nombre y apellidos
                const directorExists = this.#directors.some((obj) => {
                    return (
                        obj.director.name.localeCompare(director.name, "en", { sensitivity: "base" }) === 0 &&
                        obj.director.lastName1.localeCompare(director.lastName1, "en", { sensitivity: "base" }) === 0 &&
                        obj.director.lastName2.localeCompare(director.lastName2, "en", { sensitivity: "base" }) === 0
                    );
                });

                if (directorExists) {
                    throw new Error(`El director ${director.name} ya existe en el sistema.`);
                }

                // Añadimos el director al array de directores
                this.#directors.push({
                    director: director,
                    productions: [],
                });

                return this.#directors.length;
            }

            /*
            addDirector(director) {
                // El director no puede ser null o no es un objeto Person.
                if (!director || !(director instanceof Person)) {
                    throw new Error('El tiene que ser un objeto Person.');
                }

                // Comprobar que el director no existe ya en el sistema
                if (this.#findDirectorPos(director.ID) !== -1) {
                    throw new Error("El director " + director.name + " ya existe en el sistema");
                }

                // Agregar el nuevo director al sistema
                this.#directors.push({
                    director: director,
                    productions: []
                });

                return this.#directors.length;
            }

            */


            removeDirector(director) {
                // El director no puede ser null o no es un objeto Person.
                if (!director || !(director instanceof Person)) {
                    throw new Error('El tiene que ser un objeto Person.');
                }


                //#findDirectorPos

                const index = this.#findDirectorPos(director);

                //  El director no existe en el sistema
                if (index === -1) {
                    throw new Error("El director " + director.name + " NO existe en el sistema");
                }

                this.#directors.splice(index, 1);

                //
                return this.#directors.length;
            }



            //Asigna uno más producciones a unacategoría
            assignCategory(category, ...productions) {
                if (!(category instanceof Category))
                    throw new TypeError("la categoría debe ser una instancia de Category");

                if (!productions.every(production => production instanceof Production) || productions.length === 0)
                    throw new TypeError("las producciones deben ser  de instancias de Production y no puede estar en vacío o null");


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
                        this.#productions.push(production);
                    }
                    // Verificamos si la producción ya existe en la categoría
                    let prodExistsInCategory = this.#categories[posCat].productions.some(prodCa => prodCa.title === production.title);
                    if (!prodExistsInCategory) {
                        this.#categories[posCat].productions.push(production);
                    }
                });


                return this.#categories[posCat].productions.length;
            }



            assignDirector(director, ...productions) {
                // Verificamos si se ha especificado un director y al menos una producción
                if (!director || !productions.length) {
                    throw new Error("Se debe especificar un director y al menos una producción");
                }

                // Verificamos que ninguna producción sea null
                if (productions.some((prod) => !prod)) {
                    throw new Error("No se permiten producciones nulas");
                }

                // Obtenemos la posición del director en el array de directores
                let posDirector = this.#directors.findIndex((obj) => {
                    return (
                        obj.director.name.localeCompare(director.name, "en", { sensitivity: "base" }) === 0 &&
                        obj.director.lastName1.localeCompare(director.lastName1, "en", { sensitivity: "base" }) === 0 &&
                        obj.director.lastName2.localeCompare(director.lastName2, "en", { sensitivity: "base" }) === 0
                    );
                });

                // Si el director no existe se crea
                if (posDirector === -1) {
                    this.addDirector(director);
                    posDirector = this.#directors.length - 1; // actualizamos la posición del director añadido
                }

                // Recorremos las producciones y se les asigna el director si no existen en el sistema
                for (let production of productions) {
                    // Verificamos si la producción ya existe en el sistema
                    const existingProd = this.#productions.findIndex((prod) => prod.title === production.title);
                    if (existingProd === -1) {
                        // Si la producción no existe aún en el sistema, se asigna el director especificado
                        const dirExistsInProduction =
                            production.director &&
                            production.director.name.localeCompare(director.name, "en", { sensitivity: "base" }) === 0 &&
                            production.director.lastName1.localeCompare(director.lastName1, "en", { sensitivity: "base" }) === 0 &&
                            production.director.lastName2.localeCompare(director.lastName2, "en", { sensitivity: "base" }) === 0;
                        if (!dirExistsInProduction) {
                            production.director = director;
                        }
                        // Se añade la producción al sistema
                        this.#productions.push(production);
                    }

                    // Verificamos si la producción ya existe en el director
                    const prodExistsInDirector = this.#directors[posDirector].productions.some(
                        (prodDir) => prodDir.title === production.title
                    );
                    if (!prodExistsInDirector) {
                        this.#directors[posDirector].productions.push(production);
                    }
                }

                return this.#directors[posDirector].productions.length;
            }

            /**
             * Obtiene una instancia de un director a partir del nombre y apellidos proporcionados.
             * Si el director no existe, se crea una nueva instancia de la clase Person.
             * @param {string} name - Nombre del director.
             * @param {string} lastName1 - Primer apellido del director.
             * @param {string} lastName2 - Segundo apellido del director (opcional).
             * @param {string} born - Fecha de nacimiento del director (opcional).
             * @param {string} picture - URL de la imagen del director (opcional).
             * @returns {Person} - Instancia de la clase Person que representa al director.
             * @throws {EmptyValueException} - Si el parámetro 'name' está vacío o no está definido.
             */
            getDirector(name, lastName1, lastName2 = "", born, picture = "") {
                // Verificar si el nombre está vacío o no está definido
                if (name === "undefined" || name === "") {
                    throw new EmptyValueException("name");
                }

                // Buscar la posición del director en la lista de directores
                let position = this.#directors.findIndex((direct) => {
                    return (
                        name.localeCompare(direct.director.name, "es", { sensitivity: "base" }) === 0 &&
                        lastName1.localeCompare(direct.director.lastName1, "es", { sensitivity: "base" }) === 0
                    );
                });

                let director;
                if (position === -1) {
                    // Si el director no existe, crear una nueva instancia de Person
                    director = new Person(name, lastName1, lastName2, born, picture);
                } else {
                    // Si el director existe, obtener la instancia existente
                    director = this.#directors[position].director;
                }

                return director;
            }





            /*
            assignDirector(director, ...productions) {

                // Verificamos si se ha especificado un director y al menos una producción
                if (!director || !productions.length) {
                    throw new Error("Se debe especificar un director y al menos una producción");
                }

                if (!director) {
                    throw new Error("Se debe especificar un director");
                }


                // Verificamos que ninguna producción sea null
                if (productions.some(prod => !prod)) {
                    throw new Error("No se permiten producciones nulas");
                }

                // Obtenemos la posición del director en el array de directores
                let posDirector = this.#directors.findIndex(obj => obj.director.ID === director.ID);

                // Si el director no existe se crea
                if (posDirector === -1) {
                    this.addDirector(director);
                    posDirector = this.#directors.findIndex(obj => obj.director.ID === director.ID); // actualizamos la posición del director añadido
                }

                // Recorremos las producciones y se les asigna el director si no existen en el sistema
                for (let production of productions) {

                    // Verificamos si la producción ya existe en el sistema
                    const existingProd = this.#productions.findIndex(prod => prod.title === production.title);
                    if (existingProd === -1) {
                        // Si la producción no existe aún en el sistema, se asigna el director especificado
                        const dirExistsInProduction = production.director && production.director.name === director.name;
                        if (!dirExistsInProduction) {
                            production.director = director;
                        }
                        // Se añade la producción al sistema
                        this.#productions.push(production);
                    }

                    // Verificamos si la producción ya existe en el director
                    const prodExistsInDirector = this.#directors[posDirector].productions.some(prodDir => prodDir.title === production.title);
                    if (!prodExistsInDirector) {
                        this.#directors[posDirector].productions.push(production);
                    }
                }

                return this.#directors[posDirector].productions.length;
            }

            */



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
                const directorIndex = this.#directors.findIndex(obj => {
                    return (
                        obj.director.name.localeCompare(director.name, "en", { sensitivity: "base" }) === 0 &&
                        obj.director.lastName1.localeCompare(director.lastName1, "en", { sensitivity: "base" }) === 0 &&
                        obj.director.lastName2.localeCompare(director.lastName2, "en", { sensitivity: "base" }) === 0
                    );
                });

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


            assignActor(actor, ...productions) {
                // Verificamos si se ha especificado un actor y al menos una producción
                if (!actor || !productions.length) {
                    throw new Error("Se deben especificar un actor y al menos una producción");
                }

                // Obtenemos la posición del actor en el array de actores
                let posActor = this.#actors.findIndex(act => {
                    return (
                        act.actor.name.localeCompare(actor.name, "en", { sensitivity: "base" }) === 0 &&
                        act.actor.lastName1.localeCompare(actor.lastName1, "en", { sensitivity: "base" }) === 0
                    );
                });

                // Si el actor no existe se crea
                if (posActor === -1) {
                    this.addActor(actor);
                    posActor = this.#actors.length - 1; // actualizamos la posición del actor añadido
                }

                // Recorremos las producciones y se les asigna el actor si no existen en el sistema
                for (let production of productions) {
                    // Verificamos si la producción ya existe en el sistema
                    const existingProd = this.#productions.findIndex(prod => prod.title === production.title);

                    if (existingProd === -1) {
                        this.#productions.push(production);
                    }

                    // Verificamos si la producción ya existe en el actor
                    const prodExistsInActor = this.#actors[posActor].productions.some(prodAc => prodAc.title === production.title);
                    if (!prodExistsInActor) {
                        this.#actors[posActor].productions.push(production);
                    }
                }

                return this.#actors[posActor].productions.length;
            }



            /*


            deassignActor(actor, ...productions) {
                if (!(actor instanceof Person)) {
                    throw new TypeError("El actor debe ser un objeto válido de la clase `Person`.");
                }

                if (!productions.every(production => production instanceof Production) || productions.length === 0) {
                    throw new TypeError("Controlado : productions debe ser un array de instancias de Production y no puede estar vacío.");
                }

                // Obtenemos la posición del actor en el array de actores
                const index = this.#actors.findIndex(obj => obj.actor.ID === actor.ID);
                if (index === -1) {
                    throw new Error("El actor no existe.");
                }

                // Filtramos las producciones que no deben ser eliminadas del actor
                const remainingProductions = this.#actors[index].productions.filter(production => !productions.includes(production));

                // Actualizamos las producciones del actor  con las producciones restantes
                this.#actors[index].productions = remainingProductions;

                // Retornamos el número total de producciones asignadas al actor
                return this.#actors[index].productions.length;

            }

            */

            /**
             * Obtiene un iterador con la relación de los actores del reparto de una producción y sus personajes.
             * @param {Production} production - La producción de la cual se desea obtener el reparto.
             * @returns {Iterator} - Un iterador que contiene los actores que han actuado en la producción.
             */
            *getCast(production) {
                // Verificamos si el parámetro recibido es null
                if (production === null) {

                    throw new Error("Se debe especificar una producción");
                }

                if (!(production instanceof Production)) {
                    throw new Error("La producción debe ser una instancia de la clase `Production`");
                }


                // Filtramos los actores que hayan participado en la producción que se está buscando
                const actorsInProduction = this.#actors.filter(actor => actor.productions.some(p => p.title === production.title));
                // Iteramos sobre cada actor que haya participado en la producción, retornando su nombre de actor
                for (const act of actorsInProduction) {
                    yield act.actor;
                }
            }

            #findDirectorPos(director) {
                for (let i = 0; i < this.#directors.length; i++) {
                    if (
                        this.#directors[i].director.name.localeCompare(director.name, "en", { sensitivity: "base" }) === 0 &&
                        this.#directors[i].director.lastName1.localeCompare(director.lastName1, "en", { sensitivity: "base" }) === 0 &&
                        this.#directors[i].director.lastName2.localeCompare(director.lastName2, "en", { sensitivity: "base" }) === 0
                    ) {
                        return i;
                    }
                }
                return -1;
            }



            /**
             * Obtiene un iterador con las producciones de un director.
             * @param {Person} director - El director cuyas producciones se van a obtener.
             * @returns {Iterator} - Un iterador que genera las producciones del director.
             */
            *getProductionsDirector(director) {
                // Verificamos que el parámetro director sea una instancia de la clase Person.
                if (!(director instanceof Person)) {
                    throw new Error("El parámetro director debe ser una instancia de Person.");
                }

                // Obtenemos el índice del director en el array de directores.
                const dirIndex = this.#directors.findIndex((dir) => {
                    return (
                        dir.director.name.localeCompare(director.name, "en", { sensitivity: "base" }) === 0 &&
                        dir.director.lastName1.localeCompare(director.lastName1, "en", { sensitivity: "base" }) === 0 &&
                        dir.director.lastName2.localeCompare(director.lastName2, "en", { sensitivity: "base" }) === 0
                    );
                });

                console.log(this.#directors[dirIndex].productions);

                // Recorremos las producciones del director y las vamos generando con yield.
                for (const production of this.#directors[dirIndex].productions) {
                    yield production;
                }
            }

            #findActorPos(actor) {
                for (let i = 0; i < this.#actors.length; i++) {
                    if (
                        this.#actors[i].actor.name.localeCompare(actor.name, "en", { sensitivity: "base" }) === 0 &&
                        this.#actors[i].actor.lastName1.localeCompare(actor.lastName1, "en", { sensitivity: "base" }) === 0
                    ) {
                        return i;
                    }
                }
                return -1;
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
                const actorIndex = this.#findActorPos(actor);

                // Se recorre el array de producciones del actor y se retorna un generador con ellas
                for (let production of this.#actors[actorIndex].productions) {
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
                let productionsArray = this.#categories[this.#FinCategoryPos(category.name)].productions;

                // Si la categoría no existe, lanzamos una excepción
                if (!productionsArray) {
                    throw new Error(`Categoría '${category.name}' no encontrada.`);
                }
                // Retornamos un generador que produce las producciones de la categoría
                for (let production of productionsArray) {
                    yield production;
                }
            }


            getSerie(
                title,
                nationality = "",
                publication,
                synopsis = "",
                image = "",
                resource = [],
                locations = [],
                seasons
            ) {
                // Comprobamos si el título está vacío o es indefinido
                if (!title || title === "") {
                    throw new EmptyValueException("name");
                }

                // Buscamos la posición de la serie en el array de producciones
                const position = this.#productions.findIndex((production) =>
                    title.localeCompare(production.title, "en", { sensitivity: "base" }) == 0
                );

                let production;
                if (position === -1) {
                    // Si la serie no existe, creamos una nueva instancia
                    // Creamos copias de los arrays pasados por el usuario para evitar mantener su referencia
                    const copiedLocations = [...locations];
                    const copiedResource = [...resource];

                    production = new Serie(
                        title,
                        nationality,
                        publication,
                        synopsis,
                        image,
                        copiedResource,
                        copiedLocations,
                        seasons
                    );

                    // Agregamos la nueva serie a la lista de producciones
                    this.#productions.push(production);
                } else {
                    // Si la serie ya existe, la recuperamos de la lista de producciones
                    production = this.#productions[position];
                }

                return production;
            }



            /**
             * Obtiene la posición de una categoría en el array
             */
            #FinCategoryPos(categoryName) {
                for (let i = 0; i < this.#categories.length; i++) {
                    if (this.#categories[i].category.name === categoryName) {
                        return i;
                    }
                }

                // Si la categoría no existe en el array, retornamos -1
                return -1;
            }

            // Devuelve un objeto iterador que permite recorrer los actores registrados en el sistema
            get actors() {

                // fuera de la funcion por el (this)
                let objs = this.#actors;

                // Definimos una función generadora que itera sobre el array de actores
                function* actorGenerator() {
                    for (const obj of objs) {
                        yield obj.actor;
                    }
                }
                // Devolvemos el objeto iterador generado por la función
                return actorGenerator();
            }

            // ...



            // ...
            // Método para obtener producciones aleatorias
            *randomProductions() {
                const array = [];
                const length = this.#productions.length;

                // Generar 3 producciones aleatorias
                for (let i = 0; i < 3; i++) {
                    let newPosition;
                    let production;

                    // Obtener una posición aleatoria en el array de producciones
                    do {
                        newPosition = Math.floor(Math.random() * length);
                        production = this.#productions[newPosition];
                    } while (array.includes(production)); // Verificar que la producción no esté en el array de producciones ya obtenidas

                    array.push(production);
                    yield production;
                }
            }


            getMovie(title, nationality = "", publication, synopsis = "", image = "", resource = new Resource(22, "www.default.com"), locations = []) {
                // Verificar si el título está indefinido o vacío
                if (typeof title === "undefined" || title === "")
                    throw new Error("Title must be provided");

                // Buscar la posición de la producción en la lista
                const position = this.#productions.findIndex((production) => {
                    return title.localeCompare(production.title, "en", { sensitivity: "base" }) == 0;
                });

                let production;
                if (position === -1) {
                    // Crear una copia del array de ubicaciones pasado por el usuario para evitar mantener su referencia
                    locations = [...locations];
                    // Si la producción no existe, crear una nueva instancia de Movie
                    production = new Movie(
                        title,
                        nationality,
                        publication,
                        synopsis,
                        image,
                        resource,
                        locations
                    );
                } else {
                    // Si la producción existe, recuperarla de la lista
                    production = this.#productions[position];
                }

                return production;
            }



            *getCategoryProduction(production) {
                if (!(production instanceof Production)) {
                    throw new Error("Valor inválido para 'production'. Se espera una instancia de Production.");
                }

                let categories = this.#categories;
                for (const category of categories) {
                    if (category.productions.includes(production)) {
                        yield category.category;
                    }
                }
            }


            *getCastDirector(production) {
                if (!(production instanceof Production)) {
                    throw new Error("Valor inválido para 'production'. Se espera una instancia de Production.");
                }

                // Obtenemos los directores que han dirigido la película
                for (let director of this.#directors.filter(function (prod) {
                    return prod.productions.some(p => p.title == production.title);
                })) {
                    yield director.director;
                }
            }






            // Comprueba si existe un actor
            // Comprueba si existe un actor
            checkActor(name, lastName1) {
                return this.#actors.some((actor) => {
                    return actor.actor.name === name && actor.actor.lastName1 === lastName1;
                });
            }

            // Comprueba si existe un director
            checkDirector(name, lastName1) {
                return this.#directors.some((director) => {
                    return director.director.name === name && director.director.lastName1 === lastName1;
                });
            }





            // Determina si una persona es actor o director
            getPersonRole(name, lastName1) {
                if (this.checkActor(name, lastName1)) {
                    return "Actor";
                } else if (this.checkDirector(name, lastName1)) {
                    return "Director";
                } else {
                    return -1;
                }
            }






        }

        const name = "VideoSystem"; // Nombre del sistema
        return Object.freeze(new VideoSystem(name)); // Retorna una instancia del objeto VideoSystem y la congela para que no se pueda modificar
    };

    return {
        getInstance() { // Retorna la única instancia del objeto VideoSystem
            if (!instance) { // Si no hay una instancia previamente creada, se crea una
                instance = initializeVideoSystem();
            }
            return instance; // Retorna la instancia creada
        }
    }
})();


export default VideoSystem;