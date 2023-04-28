
"use strict";

import * as Objetos from "./objetos.js";


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
            #productionsByCategory = []; // Atributo privado para las producciones por categoría del sistema
            #productionsByDirector = []; // Atributo privado para las producciones por director del sistema
            #productionsByActor = []; // Atributo privado para las producciones por actor del sistema

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
                const categoryPosition = this.#getCategoryPosition(category.name);
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
                const productions = this.#productions; // obtener las producciones
                function* generator() { // crear un generador
                    for (let i = 0; i < productions.length; i++) { // iterar sobre las producciones
                        yield productions[i]; // devolver la producción actual
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


            /**
             * Elimina una producción del sistema.
             * Objeto Production
             * Number con el nº de elementos
             * - La producción no puede ser null o no es un objeto Production.
             * - La producción no está registrada
             * @param {Production} production - La producción a eliminar
             * @returns {number} El número actual de producciones en el sistema después de la eliminación.
             */
            removeProduction(production) {
                // Comprobar que la producción es un objeto Production y no es null
                if (!(production instanceof Production) || !production) {
                    throw new Error('La producción no es un objeto Production o es null');
                }

                // Buscar la producción en el sistema
                const index = this.#productions.findIndex((p) => p.equals(production));
                if (index === -1) {
                    throw new Error('La producción no está registrada en el sistema');
                }

                // Eliminar la producción del sistema
                this.#productions.splice(index, 1);

                // Devolver el número actual de producciones en el sistema
                return this.#productions.length;
            }

            // ...rest 
            assignCategory(category, ...producciones) {
                // Se verifica si se ha especificado una categoría y al menos una producción, de lo contrario se lanza un error
                if (!category || !producciones.length) {
                    throw new Error("Se deben especificar una categoría y al menos una producción");
                }
            
                // Se obtiene la posición de la categoría en el array de categorías
                let posCat = this.#categories.findIndex(cat => {
                    return category.name == cat.name;
                });
            
                // Si la categoría no existe en el sistema, se crea una nueva categoría con el nombre indicado y se añade al array de categorías.
                if (posCat == -1) {
                    this.addCategory(category);
                }
            
                // Se obtiene de nuevo la posición de la categoría en el array de categorías
                let postCatAs = this.getCategoryPosition(category.name);
            
                // Función que verifica si la producción ya existe en el array de producciones
                let verificar = function (prod) {
                    return !this.#productions.some(prodSistema => {
                        return prodSistema.title === prod.title;
                    });
                }
            
                // Se filtran las producciones que no existen en el sistema
                let produccionesFiltradas = producciones.filter(verificar);
            
                // Se agregan las producciones al sistema
                produccionesFiltradas.forEach(produccion => {
                    this.#productions.push(produccion);
                });
            


                // Si se especificó una categoría, se asignan las producciones a la categoría si no estaban previamente asignadas
                if (postCatAs != -1) {

                    // utilizamos un  forEach para recorrer las producciones y verificar si ya están asignadas a la categoría
                    // antes de agregarals a la categoría
                    produccionesFiltradas.forEach(produccion => {
                        // Se verifica si la producción ya está asignada a la categoría
                        let produccionEnCategoria = this.#categories[postCatAs].productions.some(produccionCat => {
                            return produccionCat.title === produccion.title;
                        });
                        // Si no está asignada, se agrega a la categoría
                        if (!produccionEnCategoria) {
                            this.#categories[postCatAs].productions.push(produccion);
                        }
                    });
                }

                return this.#categories[postCatAs].productions.length;
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
