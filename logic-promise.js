
//   document.addEventListener('DOMContentLoaded', function() {
//     // var elems = document.querySelectorAll('.tooltipped');
//     // var instances = M.Tooltip.init(elems, options);
//     // console.log('intances: ', instances);
//     let el = document.querySelector('#tooltipped');
//     el.tooltip();
//   });

//   // Or with jQuery

//   $(document).ready(function(){
//     $('.tooltipped').tooltip();
//   });

let limit = 10;
let url_limit = `https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=${limit}`;
let _pokemonsArray = [];
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
                _pokemonsArray = pokemons
                drawPokemon(pokemons); // array de objetos, con toda la info del pokemon
            })
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
            <div class="bg-img"></div>
            <img src="${url_img}" alt="img-${poke.name}"/>
            <p>${poke.name}</p>
        </div>
        `;
    });
    container.innerHTML = namePokeNode;
    return namePokeNode
}

function selectedPoke (pokeName, contextNode) {
    // console.log('contextNode: ', contextNode);
    // console.log('_pokemonsArray: ', _pokemonsArray);
    console.log('name: ', pokeName);
    let objetoDePoke = _pokemonsArray.filter(pokemon => pokeName == pokemon.name)[0];
    let abilitiesArray = objetoDePoke.abilities.map(habilidad => habilidad.ability);
    getDataPromise(abilitiesArray)
    console.log('filter:> ', abilitiesArray);
}

function getDataPromise(array) {
    let promesas = array.map(pokeAbility => fetch(pokeAbility.url).then(respuesta => respuesta.json()));
    Promise.all(promesas).then(infoAbilityArray => {
        // let flavorText= infoAbilityArray.map(object => object['flavor_text_entries']).filter()
        let nameArray = infoAbilityArray.map(objAbility => objAbility.names.filter(obj => obj.language.name == "es"));
        let name = nameArray.map(nameArray => nameArray.filter(obj => obj.language.name == "es"));
        console.log('NAME:: ', name);
    })
}
