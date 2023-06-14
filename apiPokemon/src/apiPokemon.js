document.getElementById('pokemonForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var pokemonName = document.getElementById('pokemonName').value;
    getPokemonInfo(pokemonName);
});

function getPokemonInfo(pokemonName) {
    var apiUrl = 'https://pokeapi.co/api/v2/pokemon/' + pokemonName.toLowerCase();
    
    fetch(apiUrl)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then(function(data) {
            displayPokemonInfo(data);
        })
        .catch(function(error) {
            console.log('Error:', error);
        });
}

function displayPokemonInfo(data) {
    var pokemonInfo = document.getElementById('pokemonInfo');
    pokemonInfo.innerHTML = '';

    var card = document.createElement('div');
    card.classList.add('card');

    var image = document.createElement('img');
    image.src = data.sprites.front_default;
    card.appendChild(image);

    var name = document.createElement('h2');
    name.textContent = data.name;
    card.appendChild(name);

    var abilities = document.createElement('h3');
    abilities.textContent = 'Habilidades:';
    card.appendChild(abilities);

    var abilitiesList = document.createElement('ul');
    data.abilities.forEach(function(ability) {
        var listItem = document.createElement('li');
        listItem.textContent = ability.ability.name;
        abilitiesList.appendChild(listItem);
    });
    card.appendChild(abilitiesList);

    pokemonInfo.appendChild(card);
}

const searchButton = document.getElementById('searchButton');
const pokeballContainer = document.getElementById('pokeballContainer');
const cardContainer = document.getElementById('cardContainer');

searchButton.addEventListener('click', () => {
  pokeballContainer.style.display = 'block';
  cardContainer.style.display = 'none';

  setTimeout(() => {
    pokeballContainer.style.display = 'none';
    cardContainer.style.display = 'block';
  }, 2000); // Ajusta el tiempo de espera según tu preferencia
});
