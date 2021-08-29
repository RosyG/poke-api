let limit = 10;
let url_limit = `https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=${limit}`;
let _pokemons = [];
let _pokemonsDescription = {};
// const url = 'https://pokeapi.co/api/v2/pokemon/56';
window.onload = getAllData(url_limit);

function getAllData (url, contextNode='') {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.results) {
            /* feches es un arreglo de peticiones (no de info), se formo con la url de cada pokemon
            * después de tener el arreglo se usa Promise para que traiga la información en un arreglo llamado pokemons
            */
            let feches = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            Promise.all(feches).then(pokemons => {
                _pokemons = pokemons;
                console.log('_pokemons: ', _pokemons);
                drawPokemon(pokemons); // array de objetos, con toda la info del pokemon
            })
        }
    })
    .catch(err => console.log('err', err))
}

function getAnyPromise(arrUrl, property='') {
    console.log('arrUrl--', arrUrl);
    let feches = arrUrl.map(element => fetch(element.url).then(res => res.json()));
    Promise.all(feches).then(valueArray => {
        if (property = 'abilities') {
            let objAbility = getAbilitiesPromise(valueArray, 'flavor_text_entries');
            _pokemonsDescription['ability'] = objAbility;
            console.log('obj***', _pokemonsDescription);
        }
    })
    .catch(err => console.log('err', err))
}

function drawPokemon(pokemons) {
    const container = document.getElementById('containerPokemon');
    let namePokeNode = '';
    pokemons.forEach(poke => {
        let url_img = poke['sprites']['front_default']
        namePokeNode += `
        <div data-id="${poke.id}" class="poke-container" onclick="selectedPoke('${poke.name}', this)">
            <img src="${url_img}" alt="img-${poke.name}"/>
            <p>${poke.name}</p>
        </div>
        `;
    });
    container.innerHTML = namePokeNode;
    return namePokeNode
}

function selectedPoke (pokeName, contextNode) {
    let infoPoke = _pokemons.filter(info => info.name == pokeName)[0];
    let abilitiesUrlArray = infoPoke.abilities.map(ab => ({ name:ab.ability.name, url:ab.ability.url}))
    getAnyPromise(abilitiesUrlArray, 'abilities');
    // console.log('name: ', pokeName);
    // console.log('contextNode: ', contextNode);
}

function getAbilitiesPromise(valueArray, key='') {
    return valueArray.map(abilityValue => {
        let _text = abilityValue[key].filter(text => text.language.name == 'es');
        let _name= abilityValue.names.filter(name => name.language.name == 'es');
        return {text: _text, name: _name[0]}
    })
}

/**
 * Info a detalle de cada pokemon
 [*] Habilidades (abilities: array of objs -> obj.name | obj.url -> obj.flavor_text_entries:array -> filtrar el.language.name = "es", devolver el.flavor_text)
 [] Tipos de daño (types:array -> name, url) para español entrar a url
 [] Especie (species.name | species.url) entrar a url
 [] Imagen de estados (sprites:obj -> back_default, back_shiny, front_default) [algunas key no aparecen]
 [] Movimientos 
 [] Generación (ability->url en esa url el obj.generation.name)
 */