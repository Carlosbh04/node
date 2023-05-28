console.log("Mensaje 1");

setTimeout(function() {
  console.log("Mensaje 2");
  console.log("Mensaje 3");
}, 3000);


const fs = require('fs');
const readline = require('readline');

// Crear una interfaz readline para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Preguntar por el name
rl.question('Ingrese el name: ', (name) => {
  // Preguntar por el surname
  rl.question('Ingrese el surname: ', (surname) => {
    // Preguntar por el age
    rl.question('Ingrese el age: ', (age) => {
      // Crear el objeto con los valores ingresados
      const objeto = {
        name: name,
        surname: surname,
        age: parseInt(age)
      };

      // Convertir el objeto a JSON
      const json = JSON.stringify(objeto);

      // Guardar el objeto en un archivo JSON
      fs.writeFile('archivo.json', json, (err) => {
        if (err) throw err;
        console.log('Archivo guardado correctamente.');

        // Leer el archivo JSON
        fs.readFile('archivo.json', 'utf8', (err, data) => {
          if (err) throw err;
          const objetoLeido = JSON.parse(data);

          // Imprimir el objeto leído
          console.log(objetoLeido);

          // Cerrar la interfaz readline
          rl.close();
        });
      });
    });
  });
});

