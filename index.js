//https://pokeapi.co/

//function para pegar o nome do pokemon digitado no input
function getPokemonName() {

    let pokemonName = document.getElementById("input-pokemon").value.trim() //pega o nome do pokemon do input
    var validCharacters = /^[a-zA-Z0-9\-]+$/ //verifica se contém apenas letras, números e hífen

    if ((pokemonName != "" && validCharacters.test(pokemonName))) { //verifica se o campo não está vazio
        return pokemonName
    } else {
        console.error("O nome do Pokémon contém caracteres inválidos ou está vazio")
        return ""
    }
}

//func consultar api
function searchPokemonInfos() {
    let pokemonName = getPokemonName()
    
    if (pokemonName !== "") {
        var url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
        fetch(url)
            .then(res => {
                if (res.status === 404) {
                    throw new Error("Pokemon não encontrado")
                } else {
                    return res.json()
                }
            })
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
                defineBackground(data.types[0].type.name)

                if (data.types[1] != undefined) {
                    defineBackground(data.types[1].type.name)
                }

            })
            .catch(error => {
                console.error("Erro na chamada da API: ", error)
                document.getElementById("div-img-pokemon").innerHTML = `<img src= "img/ashmorto.jpg">`
                document.getElementById("div-infos-pokemon").innerHTML =
                    `
                        <p> 
                            ERRO!<br>
                            Verifique se o nome do pokemon inserido está escrito corretamente e tente novamente!
                        </p>
                        `

            })
    }
}

// function para definir o background da div, baseado no tipo do pokemon
function defineBackground(pokemonType) {
    var divImgPokemon = document.getElementById("div-img-pokemon")
    divImgPokemon.style.backgroundImage = `url(img/${pokemonType}.jpg)`
    console.log(pokemonType)
}