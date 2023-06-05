class View {
    constructor() {
        // Seleccionar los elementos del DOM necesarios
        this.categories = $('.nav-item.dropdown'); // Seleccionar el elemento <li> con la clase "nav-item dropdown"
        this.main = $('main'); // Elemento principal donde se mostrará el contenido principal de la aplicación
    }




    /**
   * Muestra las categorías en el menú de navegación.
   * @param {Array} categories - Array de categorías.
   * @description Este método del view se encarga de mostrar las categorías en el menú de navegación. Recibe un array de categorías como parámetro y genera dinámicamente los elementos HTML necesarios para mostrar las categorías en forma de lista desplegable. Además, establece un evento de clic para cada categoría que se comunica con el controlador para obtener las películas correspondientes a la categoría seleccionada por el usuario.
   * @usage El método se invoca desde el controlador después de obtener las categorías del modelo. El controlador pasa el array de categorías al método `showCategoriesInNav`, y el view se encarga de generar los elementos HTML y establecer el evento de clic. Cuando el usuario hace clic en una categoría, el evento de clic se dispara y se llama al método del controlador correspondiente para obtener las películas de esa categoría.
   */
    showCategoriesInNav(categories) {
        let li = $('.nav-item.dropdown'); // Seleccionar el elemento <li> con la clase "nav-item dropdown"
        let ul = $('<ul class="dropdown-menu"></ul>'); // Crear el elemento <ul> con la clase "dropdown-menu"

        for (let category of categories) {
            if (category.name !== "default") {
                ul.append(`<li><a data-category="${category.name}" class="dropdown-item">${category.name}</a></li>`); // Generar dinámicamente los elementos <li> y <a> con los datos de las categorías
            }
        }

        li.append(ul); // Agregar el elemento <ul> como hijo del elemento <li>
    }

    /* Muestra las categorías en el elemento <main>.
    * @param {Array} categories - Las categorías a mostrar.
    * @description Este método se encarga de generar y mostrar dinámicamente las categorías en el elemento <main> de la página.
    * Cada categoría se muestra en una tarjeta con su respectiva imagen, título y descripción.
    */
    showCategoriesInMain(categories) {
        // Vaciar el contenido actual del elemento <main>
        this.main.empty();

        // Crear un contenedor para las categorías
        const container = $('<div class="container"></div>');

        // Crear una fila para las tarjetas de categoría
        const row = $('<div class="row"></div>');

        // Recorrer las categorías y crear una tarjeta para cada una
        for (let category of categories) {
            // Crear una columna para la tarjeta de categoría (col-md-4 para dispositivos de tamaño mediano)
            const col = $(`
           <div class="col-md-4">
             <div class="card card-fixed-height" class="carCat"  data-category="${category.name}">
               <img src="images/${category.name}.png" class="card-img-top" alt="Imagen de la categoría ${category.name}">
               <div class="card-body">
                 <h5 class="card-title">${category.name}</h5>
                 <p class="card-text">${category.description}</p>
                 <a href="${category.pageUrl}" class="btn btn-primary btn-card" data-category="${category.name}">Ver más</a>
               </div>
             </div>
           </div>
         `);

            // Agregar la columna al row
            row.append(col);
        }

        // Agregar el row al contenedor
        container.append(row);

        // Agregar el contenedor al elemento <main>
        this.main.append(container);
    }



    /**
* Vincula un controlador de clics a cada uno de los elementos desplegables de categoría en el navegador.
* @param {Function} handler - La función que será llamada al hacer clic, pasando como argumento la categoría.
* @description Este método de la vista se encarga de vincular un controlador de eventos de clic a cada elemento
* de categoría en el navegador. Cuando se hace clic en un elemento de categoría, se llamará a la función `handler`
* pasando como argumento la categoría correspondiente.
*/
    bindProductionsNavCategoryList(handler) {
        $('.dropdown-item').click(function () {
            handler(this.dataset.category);
        });
    }



    /**
  * Vincula un evento de clic a las tarjetas de categoría y al botón "Ver más" en el elemento principal.
  * @param {Function} handler - La función a ejecutar cuando se hace clic en una tarjeta de categoría o en el botón "Ver más".
  * @description Este método vincula un evento de clic a las tarjetas de categoría y al botón "Ver más".
  * Evita la acción predeterminada del enlace y soluciona el problema de desaparición de contenido al hacer clic en el botón.
  */
    bindProductionsCategoryMain(handler) {
        this.main.on('click', '.card, .btn-primary', function (event) {
            event.preventDefault();
            const category = $(this).closest('.card').find('.card-title').text();
            handler(category);
        });
    }










    /**
     * Muestra las producciones en el elemento <main>.
     * @param {Array} productions - Las producciones a mostrar.
     */
    showRandomProductions(productions) {
        // Crear un contenedor para las producciones
        const container = $('<div class="container"></div>');

        // Crear una fila para las tarjetas de producción
        const row = $('<div class="row"></div>');

        // Recorrer las producciones y crear una tarjeta para cada una
        for (let production of productions) {
            // Crear una columna para la tarjeta de producción (col-md-4 para dispositivos de tamaño mediano)
            const col = $(`
            <div class="col-md-4">
                <div class="card card-fixed-height">
                    <img src="${production.image}" class="card-img-top img-fluid" alt="Imagen de la producción ${production.title}" style="max-height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${production.title}</h5>
                        <a href="${production.pageUrl}" class="btn btn-primary">Ver más</a>
                    </div>
                </div>
            </div>
        `);

            // Agregar la columna al row
            row.append(col);
        }

        // Agregar el row al contenedor
        container.append(row);

        // Agregar el contenedor al elemento <main>
        this.main.append(container);
    }



    /**
     * Muestra la lista de producciones de una categoría en la vista.
     * @param {Array} productions - Las producciones a listar.
     * @param {string} name - El nombre de la categoría.
     * @description Este método se encarga de mostrar la lista de producciones de una categoría en la vista.
     * Primero, vacía el contenido principal de la vista.
     */
    listProductions(productions, name) {
        this.main.empty();

        // Crear un contenedor principal
        let container = $('<div class="container mt-4"></div>');

        // Agregar un encabezado con el nombre de la categoría
        let heading = $(`<h2>${name}</h2>`);
        container.append(heading);

        // Crear una fila para las tarjetas de las producciones
        let row = $('<div class="row"></div>');

        // Iterar sobre cada producción y crear una tarjeta para cada una
        for (let production of productions) {
            let col = $('<div class="col-md-6 col-lg-3 mb-4"></div>'); // Crear una columna para la tarjeta
            let card = $('<div class="card"></div>'); // Crear una tarjeta
            let img = $(`<img src="${production.image}" class="card-img-top" alt="${production.title}"  data-category="${production.title}">`); // Agregar la imagen de la producción a la tarjeta
            let cardBody = $('<div class="card-body"></div>'); // Crear el cuerpo de la tarjeta
            let cardTitle = $(`<h5 class="card-title">${production.title}</h5>`); // Agregar el título de la producción a la tarjeta

            cardBody.append(cardTitle); // Agregar el título al cuerpo de la tarjeta
            card.append(img); // Agregar la imagen a la tarjeta
            card.append(cardBody); // Agregar el cuerpo de la tarjeta a la tarjeta
            col.append(card); // Agregar la tarjeta a la columna
            row.append(col); // Agregar la columna a la fila
        }

        container.append(row); // Agregar la fila al contenedor
        this.main.append(container); // Agregar el contenedor al contenido principal de la vista
    }



    /**
     * Asocia el controlador de eventos al hacer clic en el logotipo de la aplicación.
     * @param {function} handler - El controlador de eventos.
     * @description Este método se encarga de asociar el controlador de eventos al hacer clic en el logotipo de la aplicación.
     */
    bindLogo(handler) {
        $(".navbar-brand").click(evt => {
            handler();
        })
    }

    /**
     * Asocia el controlador de eventos a las imágenes de las producciones.
     * @param {function} handler - El controlador de eventos.
     * @description Este método se encarga de asociar el controlador de eventos a las imágenes de las producciones.
     * Al hacer clic en una imagen, se obtiene el título de la producción y se llama al controlador de eventos con ese título.
     */
    bindProductions(handler) {
        // Obtener todas las imágenes de tarjeta
        const imageElements = $('.card-img-top');

        // Asociar el controlador de eventos al hacer clic en una imagen
        imageElements.click((event) => {
            const title = $(event.currentTarget).attr('data-category');
            console.log(title);
            // Llamar al controlador de eventos con el título de la producción
            handler(title);
        });
    }






    showProduction(production, categories, directors, actors) {
        this.main.empty();

        let container = $(`
            <main>
                <div class="container">
                    <div class="card">
                        <img src="${production.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${production.title}</h5>
                            <p class="card-text">${production.synopsis}</p>
                            <p class="card-text"><small class="text-muted">Last updated ${production.publication.toLocaleTimeString()}</small></p>
                        </div>
                    </div>
    
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Directores</h3>
                            <div class="row">
                                <!-- Iterar sobre los directores y crear una columna para cada uno -->
                                ${this.#generateDirectorCards(directors)}
                            </div>
                        </div>
                    </div>
    
                    <div class="row">
                        <div class="col-md-12">
                            <h3>Actores</h3>
                            <div class="row">
                                <!-- Iterar sobre los actores y crear una columna para cada uno -->
                                ${this.#generateActorCards(actors)}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        `);

        this.main.append(container);
    }

    #generateDirectorCards(directors) {
        let cards = '';
        for (const director of directors) {
            cards += `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${director.image}" class="card-img-top" alt="Imagen del director">
                        <div class="card-body">
                            <h5 class="card-title">${director.name}</h5>
                        </div>
                    </div>
                </div>
            `;
        }
        return cards;
    }

    #generateActorCards(actors) {
        let cards = '';
        for (const actor of actors) {
            cards += `
                <div class="col-md-4">
                    <div class="card">
                        <img src="${actor.image}" class="card-img-top" alt="Imagen del actor">
                        <div class="card-body">
                            <h5 class="card-title">${actor.name}</h5>
                        </div>
                    </div>
                </div>
            `;
        }
        return cards;
    }














}






















export default View;
