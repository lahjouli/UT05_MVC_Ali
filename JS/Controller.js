

import {
    Person,
    Category,
    Production,
    Coordinate,
    User,
    Movie,
    Resource,
    Serie,
} from "./objetos.js";

"use strict";

class Controller {

    #videoSystemModel; // Atributo privado para el modelo del sistema
    #View; // Atributo privado para la vista del sistema de
    #randomProductions; // Atributo privado para las producciones aleatorias

    constructor(model, view) {
        this.#videoSystemModel = model; // Asignar el modelo del sistema pasado como parámetro
        this.#View = view; // Asignar la vista del sistema pasada como parámetro

        // Cargamos todos los objetos
        this.#loadObjects();

        // Generar las producciones aleatorias y asignarlas al atributo #randomProductions
        this.#randomProductions = [...this.#videoSystemModel.randomProductions()];

        // Invocar el método onLoad para cargar los elementos del navegador
        this.onLoad();
    }

    #loadObjects() {
        // Usuarios
        const user = this.#videoSystemModel.createUser("Ali Lahjouli", "ali.lahjouli@gmail.com", "1234");

        // Categorías
        const category1 = this.#videoSystemModel.getCategory("Documentales", "Películas que presentan hechos o eventos de la realidad de manera objetiva y veraz.");
        const category2 = this.#videoSystemModel.getCategory("Comedia", "Género que busca hacer reír al espectador y proporcionar un escape de la vida cotidiana a través del humor.");
        const category3 = this.#videoSystemModel.getCategory("Aventura", "Género que involucra emocionantes experiencias y viajes, generalmente con elementos de riesgo y exploración.");
        // Agregar categorías al modelo
        this.#videoSystemModel.addCategory(category1);
        this.#videoSystemModel.addCategory(category2);
        this.#videoSystemModel.addCategory(category3);


        // Creación de los documentales de ciencias
        const documentary1 = new Movie("Apollo: Missions to the Moon", new Date(2019, 6, 7), "Este documental cuenta la historia de las misiones Apolo de la NASA, que llevaron a los astronautas a la luna. Explora los desafíos científicos y tecnológicos enfrentados durante estas históricas expediciones espaciales.", "./images/Documentales/Apollo.png", "USA", new Resource(120, "https://www.youtube.com/embed/VIDEO_ID"), [new Coordinate(30, 30)]);
        const documentary2 = new Movie("The Blue Planet", new Date(2001, 8, 12), "Esta serie documental de la BBC explora los océanos de nuestro planeta, mostrando la asombrosa diversidad de vida marina y revelando los impactos humanos en los ecosistemas marinos.", "./images/Documentales/BluePlanet.png", "UK", new Resource(180, "https://www.youtube.com/embed/VIDEO_ID"), [new Coordinate(40, 40)]);
        const documentary3 = new Movie("Cosmos: A Spacetime Odyssey", new Date(2014, 2, 9), "Presentado por el famoso astrofísico Neil deGrasse Tyson, este documental lleva a los espectadores en un viaje cósmico a través del espacio y el tiempo, explorando los misterios del universo y nuestro lugar en él.", "./images/Documentales/Cosmos.png", "USA", new Resource(240, "https://www.youtube.com/embed/VIDEO_ID"), [new Coordinate(20, 20)]);
        const documentary4 = new Movie("Life", new Date(2009, 3, 12), "Esta serie documental de la BBC muestra la increíble diversidad de la vida en la Tierra, desde las criaturas más pequeñas hasta los depredadores más feroces. Explora los diferentes ecosistemas del planeta y revela las fascinantes estrategias de supervivencia de las especies.", "./images/Documentales/Life.png", "UK", new Resource(180, "https://www.youtube.com/embed/VIDEO_ID"), [new Coordinate(10, 10)]);


        // Asignación de los documentales a la categoría de Documentales
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Documentales"), documentary1);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Documentales"), documentary2);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Documentales"), documentary3);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Documentales"), documentary4);


        // Creación de las películas de Comedia
        const movieComedy1 = new Movie("Ace Ventura: Pet Detective", new Date(1994, 1, 4), "Ace Ventura, un excéntrico detective de mascotas, es contratado para encontrar al delfín mascota del equipo de fútbol de Miami que ha sido secuestrado. Sus métodos poco convencionales y su sentido del humor peculiar lo llevan a una serie de divertidas situaciones.", "./images/Comedia/Ventura.png", "USA", new Resource(86, "https://www.youtube.com/embed/VIDEO_ID"), [new Coordinate(50, 50)]);
        const movieComedy2 = new Movie("Dumb and Dumber", new Date(1994, 12, 16), "Dos amigos tontos, Lloyd y Harry, se embarcan en un viaje por carretera para devolver una maleta perdida a su dueña. Sin embargo, se ven envueltos en una serie de situaciones cómicas y desastrosas en el camino.", "./images/Comedia/Dumb.jpg", "USA", new Resource(107, "./images/Comedia/Dumb.jpg"), [new Coordinate(60, 60)]);
        // Creación de las series de Comedia
        const seriesComedy1 = new Serie("Friends", new Date(1994, 9, 22), "La serie sigue las vidas de un grupo de amigos en la ciudad de Nueva York mientras enfrentan los altibajos de la vida, el amor y la amistad. Con su humor característico y personajes memorables, Friends se convirtió en un ícono de la comedia televisiva.", "./images/Comedia/Friends.png", "USA", [new Resource(236, "https://www.youtube.com/embed/VIDEO_ID")], [new Coordinate(70, 70)], 10);
        const seriesComedy2 = new Serie("The Office", new Date(2005, 3, 24), "Una mirada cómica a la vida cotidiana de los empleados de una oficina a través del formato de un falso documental. La serie muestra las interacciones, rivalidades y situaciones absurdas que ocurren en un ambiente de trabajo peculiar.", "./images/Comedia/TheOffice.png", "USA", [new Resource(201, "https://www.youtube.com/embed/VIDEO_ID")], [new Coordinate(80, 80)], 9);

        // Asignación de las películas y series a la categoría "Comedia"
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Comedia"), movieComedy1);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Comedia"), movieComedy2);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Comedia"), seriesComedy1);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Comedia"), seriesComedy2);


        // Creación de las películas de Aventura
        const movieAdventure1 = new Movie("Indiana Jones: Raiders of the Lost Ark", new Date(1981, 5, 12), "El arqueólogo y aventurero Indiana Jones es contratado por el gobierno de los Estados Unidos para encontrar el Arca de la Alianza antes de que caiga en manos de los nazis. Indy se embarca en una emocionante búsqueda llena de peligros y descubrimientos.", "./images/Aventura/IndianaJones.png", "USA", new Resource(115, "https://www.youtube.com/embed/VIDEO_ID"), [new Coordinate(90, 90)]);
        const movieAdventure2 = new Movie("The Lord of the Rings: The Fellowship of the Ring", new Date(2001, 12, 19), "En la Tierra Media, un grupo de compañeros emprende un viaje para destruir un anillo poderoso y evitar que caiga en manos del Señor Oscuro. Su aventura los lleva a enfrentarse a criaturas míticas, peligros mortales y pruebas de valentía.", "./images/Aventura/LordRings.png", "USA", new Resource(178, "https://www.youtube.com/embed/VIDEO_ID"), [new Coordinate(100, 100)]);
        // Creación de las series de Aventura
        const seriesAdventure1 = new Serie("Stranger Things", new Date(2016, 7, 15), "En la década de 1980, en un pequeño pueblo, un grupo de niños se enfrenta a sucesos paranormales y a un mundo alternativo llamado el Mundo del Revés. Juntos, deben descubrir los misterios que acechan a su comunidad y encontrar a un amigo desaparecido.", "./images/Aventura/StrangerThings.png", "USA", [new Resource(34, "https://www.youtube.com/embed/VIDEO_ID")], [new Coordinate(110, 110)], 4);
        const seriesAdventure2 = new Serie("The Mandalorian", new Date(2019, 11, 12), "En el universo de Star Wars, un cazarrecompensas solitario se embarca en misiones peligrosas en los confines de la galaxia. Su vida cambia cuando se encuentra con un misterioso niño de la misma especie que el legendario Jedi.", "./images/Aventura/Mandalorian.png", "USA", [new Resource(42, "https://www.youtube.com/embed/VIDEO_ID")], [new Coordinate(120, 120)], 2);

        // Asignación de las películas y series a la categoría "Aventura"
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Aventura"), movieAdventure1);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Aventura"), movieAdventure2);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Aventura"), seriesAdventure1);
        this.#videoSystemModel.assignCategory(this.#videoSystemModel.getCategory("Aventura"), seriesAdventure2);




        // Do

        /**Documental: Apollo: Missions to the Moon */
        /**Director: Todd Douglas Miller */
        this.#videoSystemModel.assignDirector(new Person("Todd", "Douglas", "Miller", new Date(1970, 0, 0), "img/Directors/ToddDouglasMiller.jpg"), new Movie("Apollo: Missions to the Moon", Category.Documentary));
        /**Actores: Neil Armstrong, Buzz Aldrin, Michael Collins */
        this.#videoSystemModel.assignActor(new Person("Neil", "", "Armstrong", new Date(1930, 7, 5), "img/Actors/NeilArmstrong.png"), new Movie("Apollo: Missions to the Moon", Category.Documentary));
        this.#videoSystemModel.assignActor(new Person("Buzz", "", "Aldrin", new Date(1930, 0, 20), "img/Actors/BuzzAldrin.jpg"), new Movie("Apollo: Missions to the Moon", Category.Documentary));
        this.#videoSystemModel.assignActor(new Person("Michael", "", "Collins", new Date(1930, 10, 31), "img/Actors/MichaelCollins.jpg"), new Movie("Apollo: Missions to the Moon", Category.Documentary));

        /**Documental: The Blue Planet */
        /**Director: Alastair Fothergill */
        this.#videoSystemModel.assignDirector(new Person("Alastair", "", "Fothergill", new Date(1960, 0, 0), "img/Directors/AlastairFothergill.jpg"), new Movie("The Blue Planet", Category.Documentary));
        /**Actores: David Attenborough, Pierce Brosnan, Michael Gambon */
        this.#videoSystemModel.assignActor(new Person("David", "", "Attenborough", new Date(1926, 4, 8), "img/Actors/DavidAttenborough.jpg"), new Movie("The Blue Planet", Category.Documentary));
        this.#videoSystemModel.assignActor(new Person("Pierce", "", "Brosnan", new Date(1953, 4, 16), "img/Actors/PierceBrosnan.jpg"), new Movie("The Blue Planet", Category.Documentary));
        this.#videoSystemModel.assignActor(new Person("Michael", "", "Gambon", new Date(1940, 10, 19), "img/Actors/MichaelGambon.jpg"), new Movie("The Blue Planet", Category.Documentary));

        /**Documental: Cosmos: A Spacetime Odyssey */
        /**Director: Brannon Braga */
        this.#videoSystemModel.assignDirector(new Person("Brannon", "", "Braga", new Date(1965, 0, 0), "img/Directors/BrannonBraga.jpg"), new Movie("Cosmos: A Spacetime Odyssey", Category.Documentary));
        /**Actores: Neil deGrasse Tyson, Stoney Emshwiller, Piotr Michael */
        this.#videoSystemModel.assignActor(new Person("Neil", "deGrasse", "Tyson", new Date(1958, 9, 5), "img/Actors/NeildeGrasseTyson.jpg"), new Movie("Cosmos: A Spacetime Odyssey", Category.Documentary));
        this.#videoSystemModel.assignActor(new Person("Stoney", "", "Emshwiller", new Date(1960, 0, 0), "img/Actors/StoneyEmshwiller.jpg"), new Movie("Cosmos: A Spacetime Odyssey", Category.Documentary));
        




    }

    handleLogoEvent() {

    }

    /**
    * Contenido que se carga al entrar en la web.
    * @description Este método del controlador se encarga de cargar los elementos del navegador al iniciar la web. 
    * En este caso, llama al método `onAddCategoryNav()` para agregar las categorías al menú de navegación y al método `onAddCategoryMain()` para mostrar las categorías en el contenido principal.
    * @usage Este método se invoca automáticamente al cargar la página y es parte del flujo de inicialización del sistema de video.
    */
    onLoad = () => {
        // Agregar las categorías al menú de navegación
        this.onAddCategoryNav();

        // Mostrar las categorías en el contenido principal
        this.onAddCategoryMain();

        //Mostrar las producciones aleatorias
        this.onAddRandomProductionLoad();


        this.#View.bindLogo(this.handleInitialize);
    }

    /**
 * Inicializa el sistema de video.
 * Carga la categoría en el elemento principal y vincula sus eventos,
 * añade producciones aleatorias y configura la vinculación de las producciones.
 */
    initialize() {
        // Cargar la categoría en el elemento principal y vincular sus eventos
        this.onAddCategoryMain();

        // Añadir producciones aleatorias
        this.onAddRandomProductionLoad();

        // Configurar la vinculación de las producciones
        this.videoSystemView.bindProductions(this.handleCategoryListProduction);
    }


    // Función para cargar el sistema  en el evento onload
    handleInitialize = () => {

        this.initialize();
    }






    /**
    * Muestra la lista de categorías en el navegador y vincula el evento para listar las películas de cada categoría.
    * @description Este método del controlador se encarga de llamar al método de la vista `showCategoriesInNav`
    * para mostrar la lista de categorías en el navegador, y también vincula el evento de clic en cada categoría
    * para llamar al controlador `handleProductsCategoryList`.
    */
    onAddCategoryNav = () => {
        // Obtener la lista de categorías del sistema 
        const categories = this.#videoSystemModel.categories;

        // Mostrar la lista de categorías en el navegador
        this.#View.showCategoriesInNav(categories);

        // Vincular el evento de clic en cada categoría del navegador al controlador handleProductsCategoryList
        this.#View.bindProductionsNavCategoryList(this.handleProductsCategoryList);
    }


    /**
    * Muestra la lista de categorías en el elemento <main> y vincula el evento para listar las películas de cada categoría.
    * @description Este método se encarga de mostrar la lista de categorías en el elemento <main> de la página y establece un evento de clic para cada categoría. Cuando el usuario hace clic en una categoría, se invoca el método correspondiente para listar las películas de esa categoría.
    */
    onAddCategoryMain = () => {
        // Obtener las categorías del modelo de datos
        const categories = this.#videoSystemModel.categories;

        // Llamar al método del objeto view para mostrar las categorías en el <main>
        this.#View.showCategoriesInMain(categories);

        this.#View.bindProductionsCategoryMain(this.handleProductsCategoryList);
    };







    /**
    * Método para manejar la carga de producciones aleatorias y mostrarlas en la vista.
    */
    onAddRandomProductionLoad = () => {
        // Puedes generar otras 3 producciones aleatorias o mantener las existentes

        // Obtener las producciones aleatorias del atributo privado #randomProductions
        const randomProductions = this.#randomProductions;

        // Mostrar las producciones en la vista utilizando el método showProductions de la vista
        this.#View.showRandomProductions(randomProductions);
    }


    /**
    * Maneja el evento cuando el usuario hace clic en una categoría en la lista de categorías.
    * @param {string} title - El título de la categoría seleccionada.
    * @description Este método se encarga de obtener la categoría correspondiente al título seleccionado, y luego llama al método de la vista `listProductions` para mostrar las producciones de esa categoría. Recibe el título de la categoría como parámetro.
    */
    handleProductsCategoryList = (name) => {
        const category = this.#videoSystemModel.getCategory(name);
        const productions = this.#videoSystemModel.getProductionCategory(category);
        this.#View.listProductions(productions, name);
        this.#View.bindProductions(this.handleCategoryListProduction)
    }

    handleCategoryListProduction = (title) => {
        let production = this.#videoSystemModel.getMovie(title);
        let categories = this.#videoSystemModel.getCategoryProduction(production);
        let actors = this.#videoSystemModel.getCast(production);
        let directors = this.#videoSystemModel.getCastDirector(production);
        this.#View.showProduction(production, categories, directors, actors);
    };






    get View() {
        return this.#View;
    }
}

export default Controller;
