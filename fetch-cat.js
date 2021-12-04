const urlCat = 'https://api.thecatapi.com/v1/images/search';
window.onload = getCat(urlCat);

function getCat(url=urlCat) {
    fetch(url)
    .then(res=> res.json())
    .then(data=> drawCat(data))
}

function drawCat(info) {
    console.log('info: ', info);
    let obj = info[0];
    let content = document.getElementById('containerCat');
    content.innerHTML = `<img src="${obj.url}" alt="${obj.id}"/>`;
}