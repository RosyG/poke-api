let limit = 10;
let url_limit = `https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=${limit}`;
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
            <img src="${url_img}" alt="img-${poke.name}"/>
            <p>${poke.name}</p>
        </div>
        `;
    });
    container.innerHTML = namePokeNode;
    return namePokeNode
}

function selectedPoke (pokeName, contextNode) {
    
    console.log('name: ', pokeName);
    console.log('contextNode: ', contextNode);
}

