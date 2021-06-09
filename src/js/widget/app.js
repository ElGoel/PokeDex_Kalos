let inicio = 1;

import { webHelperFetch } from './poke_api.js'
document.addEventListener('DOMContentLoaded', function () {
        iniciarPoke();
});

function iniciarPoke() {

        abrirApp();

        mostrarPokemons();

        // abre el div de explorador precionando el boton del centro

        // ocultar el div al oprimir el boton de salir

}

function abrirApp() {
        const botonAbrir = document.querySelectorAll('.abrir .cerrar button');

        botonAbrir.addEventListener('click', e => {
                e.preventDefault();

                console.log(e.target.dataset.paso);
        })

}


async function mostrarPokemons() {
        try {
                const pokedex12 = await webHelperFetch('https://pokeapi.co/api/v2/pokedex/12');
                let pokemonsArray = [];

                for (let i = 0; i < pokedex12.pokemon_entries.length; i++) {
                        let pokemonData = await webHelperFetch(`https://pokeapi.co/api/v2/pokemon/${pokedex12.pokemon_entries[i].pokemon_species.url.split('pokemon-species/')[1]}`);

                        pokemonsArray.push(pokemonData);
                }

                // Generar HTML
                pokemonsArray.forEach(imgPoke => {
                        const { id, name, sprites } = imgPoke

                        // DOM Scripting
                        // Id del pokemon
                        const nombrePoke = document.createElement('P');
                        nombrePoke.textContent = id;
                        nombrePoke.classList.add('nombre-pokemon');

                        // Imagen del pokemon

                        const imagenPokemon = document.createElement('IMG')
                        imagenPokemon.src = sprites.front_default;

                        // DIV del contenedor de los pokemons
                        const pokeDIV = document.createElement('DIV');
                        pokeDIV.classList.add('explorador');
                        pokeDIV.dataset.idPokemon = id;

                        // Seleccionar los pokemones
                        pokeDIV.onclick = seleccionarPokemon;

                        // Inyectar nombre e imagen al div de explorador
                        pokeDIV.appendChild(imagenPokemon);
                        pokeDIV.appendChild(nombrePoke);

                        document.getElementById('explorer').appendChild(pokeDIV);

                })


        } catch (error) {
                console.log(error);
        }
}

function seleccionarPokemon(e) {

        let elemento;
        // Forzar que el elemento el cual le damos click sea el DIV
        if (e.target.tagName === 'P') {
                elemento = e.target.parentElement;
        } else if (e.target.tagName === 'IMG') {
                elemento = e.target.parentElement;
        } else {
                elemento = e.target;
        }

        if (elemento.classList.contains('seleccionado')) {
                elemento.classList.remove('seleccionado');
        } else {
                elemento.classList.add('seleccionado');
        }
        // console.log(elemento.dataset.idPokemon); // ejemeplo de seleccion
}
