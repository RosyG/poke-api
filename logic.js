const limit = 10;
const url_limit = `https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=${limit}`;
// const url = 'https://pokeapi.co/api/v2/pokemon/56';
let arrPokes = [];
window.onload = getAllData(url_limit);

function getAllData (url, contextNode='') {
    fetch(url)
    .then(result => result.json())
    .then(data => {
        if (data.results) {
            data.results.forEach(poke => {
                getAllData(poke.url)
            });
        } else {
            drawPokemon(data); // obj de info por cada pokemon
            arrPokes.push(data); 
        }
    })
}

function drawPokemon(pokemon) {
    const container = document.getElementById('containerPokemon');
    let namePokeNode = document.createElement("div");
    let url_img = pokemon['sprites']['front_default'];
    namePokeNode.innerHTML =`
    <div id="${pokemon.name}" class="poke-container" onclick="selectedName('${pokemon.name}', this)">
        <img src="${url_img}" alt="img-${pokemon.name}"/>
        <p>${pokemon.name}</p>
    </div>`;
    container.appendChild(namePokeNode);
    return
}

const selectedName = (pokeInfo, contextNode='') => {
    console.log('name: ', pokeInfo);
    console.log('contextNode: ', contextNode);
    console.log('array:  ', arrPokes);
}

