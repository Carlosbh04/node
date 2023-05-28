const fs = require('fs/promises');
const readline = require('readline');

function question(prompt) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

async function main() {
  try {
    const name = await question('Ingrese el name: ');
    const surname = await question('Ingrese el surname: ');
    const age = await question('Ingrese el age: ');
    const hobbie = await question('ingrese su hobbie: ');

    const objeto = {
      name: name,
      surname: surname,
      age: parseInt(age),
      Hobbie: hobbie,
    };

    const json = JSON.stringify(objeto);

    await fs.writeFile('archivo.json', json);
    console.log('Archivo guardado correctamente.');

    const data = await fs.readFile('archivo.json', 'utf8');
    const objetoLeido = JSON.parse(data);

    console.log(objetoLeido);
  } catch (err) {
    console.error('Ocurrió un error:', err);
  }
}

main();
