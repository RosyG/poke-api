const limit = 10;
const url_limit = `https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=${limit}`;
// const url = 'https://pokeapi.co/api/v2/pokemon/56';
window.onload = getAllData(url_limit);

function getAllData (url, contextNode='') {
    let detail;
    fetch(url)
    .then(result => result.json())
    .then(data => {
        if (data.results) {
            detail = drawPokemon(data.results);
        } else {
            detail = getInfoPokemon(data, contextNode);
            console.log('detail tiene URL: ', detail);
        }
        // detail = (data.results) ? drawPokemon(data.results) : getInfoPokemon(data);
        return detail;
    })
}

function drawPokemon(pokemons) {
    const container = document.getElementById('containerPokemon');
    let namePokeNode = '';
    pokemons.forEach(poke => {
        // <img src="getAllData(${poke.url})"/>
        namePokeNode += `
        <div data-url="${poke.url}" onpopstate=getAllData('${poke.url}', this); class="poke-container" onclick=selectedName(this,'${poke.name}')>
            <p>${poke.name}</p>
        </div>
        `;
    });
    container.innerHTML = namePokeNode;
    // getAllData(url_poke, contextNode);
    return 
}

function getInfoPokemon(infoPokemon, contextNode) {
    // console.log('this: ', contextNode);
    let url_img = infoPokemon['sprites']['front_default'];
    let node = document.createElement("img");
    node.setAttribute("src", url_img);
    node.setAttribute("alt", 'imagen');
    contextNode.appendChild(node);
    return url_img;
}

const selectedName = (contextNode,pokeName) => {
    console.log('name: ', pokeName);
    console.log('contextNode: ', contextNode);
    let url_poke = contextNode.getAttribute('data-url');
    console.log('url_poke: ', url_poke);
    getAllData(url_poke, contextNode);
    // let detailData;
    // setTimeout(function () {detailData = getAllData(url_poke)}, 4000);
    // console.log("url-img**", detailData);
    // getAllData(url_poke);
}

