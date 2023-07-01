//https://pokeapi.co/

function getPokemonName() {
    var pokemonName = document.getElementById("input-pokemon").value
    console.log(pokemonName)
    return pokemonName
}

//func consultar api
function searchPokemonInfos() {
    let pokemonName = getPokemonName()
    var url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            //console.log(data)
            document.getElementById("div-img-pokemon").innerHTML = `<img src="${data.sprites.front_default}">`
            document.getElementById("div-infos-pokemon").innerHTML =
                `
                <p> 
                Name: ${data.name} <br>
                Type: ${data.types[0].type.name}
                </p>
                `
            defineBackground(data.types[0].type.name, verifySecondType(data.types[1].type.name))
        })
}

function defineBackground(pokemonType, pokemonType2) {
    var divImgPokemon = document.getElementById("div-img-pokemon");
    if (pokemonType2 != "fodase") {
        divImgPokemon.style.backgroundImage = `url(img/${pokemonType2}.jpg)`;
    } else {
        divImgPokemon.style.backgroundImage = `url(img/${pokemonType}.jpg)`;
    }
    console.log(pokemonType, pokemonType2)
}

function verifySecondType(pokemonType2) {
    if (pokemonType2 != null) {
        return pokemonType2
    } else {
        return "fodase"
    }
}