const limitNum = 10;
const url_limitNum = `https://pokeapi.co/api/v2/pokemon?offset=${limitNum}&limit=${limitNum}`;
// const url = 'https://pokeapi.co/api/v2/pokemon/56';
let arrPokes = [];
window.onload = getAllData(url_limitNum);

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
    <div id="${pokemon.name}" class="poke-container" onclick="selectedPoke('${pokemon.name}', this)">
        <img src="${url_img}" alt="img-${pokemon.name}"/>
        <p>${pokemon.name}</p>
    </div>`;
    container.appendChild(namePokeNode);
    return
}

function selectedPoke (pokeInfo, contextNode='') {
    console.log('name: ', pokeInfo);
    console.log('contextNode: ', contextNode);
    console.log('array:  ', arrPokes);
}

