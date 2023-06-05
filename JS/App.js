// Importamos las clases necesarias
import  Model  from "./Model.js";
import Controller from "./Controller.js";
import View from "./View.js";

// Creamos una instancia de la clase Controller y la vinculamos con la vista


let App;
$(function() {
  // Creamos una instancia del modelo Model
  const model =  Model.getInstance();

  // Creamos una instancia del controlador Controller, pasando el modelo y la vista como parámetros
  App = new Controller(model, new View());
});

export default App;
