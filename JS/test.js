

// Creamos una instancia de la clase System
const mySystem = VideoSystem.getInstance("Netflix");

// Creamos una instancia de la clase Category
const myCategory = new Category('Mi Categoría');

// Añadimos la categoría al sistema
mySystem.addCategory(myCategory);

// Creamos una instancia de la clase User
const myUser = new User('Juan', 'juan123', 'juan@mail.com');

// Añadimos el usuario al sistema
mySystem.addUser(myUser);

// Intentamos agregar otra categoría con el mismo nombre (debe lanzar una excepción)
try {
  mySystem.addCategory(myCategory);
} catch (error) {
  console.error(error.message);
}

// Intentamos eliminar la categoría por defecto (debe lanzar una excepción)
try {
  mySystem.removeCategory(mySystem.defaultCategory);
} catch (error) {
  console.error(error.message);
}

// Creamos una producción y la añadimos a la categoría
const myProduction = new Production('Mi Producción', myUser);
mySystem.addProduction(myProduction, myCategory);

// Creamos otra categoría y añadimos una producción a la misma
const myOtherCategory = new Category('Mi Otra Categoría');
mySystem.addCategory(myOtherCategory);
const myOtherProduction = new Production('Mi Otra Producción', myUser);
mySystem.addProduction(myOtherProduction, myOtherCategory);

// Creamos una instancia de la clase User
const myOtherUser = new User('Pedro', 'pedro123', 'pedro@mail.com');

// Intentamos eliminar un usuario que no existe (debe lanzar una excepción)
try {
  mySystem.removeUser(myOtherUser);
} catch (error) {
  console.error(error.message);
}

// Eliminamos el usuario que creamos anteriormente
mySystem.removeUser(myUser);

// Iteramos por los usuarios del sistema
for (const user of mySystem.users) {
  console.log(user.name);
}
