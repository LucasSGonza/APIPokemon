//https://pokeapi.co/

//function para pegar o nome do pokemon digitado no input
function getPokemonName() {
    let pokemonName = document.getElementById("input-pokemon").value.trim().toLowerCase() //pega o nome do pokemon do input
    var validCharacters = /^[a-zA-Z0-9\-]+$/ //verifica se contém apenas letras, números e hífen

    if ((pokemonName != "" && validCharacters.test(pokemonName))) { //verifica se o campo não está vazio
        return pokemonName
    } else {
        console.error("O nome do Pokémon contém caracteres inválidos ou está vazio")
        alert("O nome do Pokémon contém caracteres inválidos ou está vazio")
        return ""
    }
}

//func consultar api
function searchPokemonInfos(event) {
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
                
                let src = 
                data.sprites.versions['generation-v']['black-white'].animated.front_default != null ? 
                `${data.sprites.versions['generation-v']['black-white'].animated.front_default}` : `${data.sprites.front_default}`
                /*criei essa variavel pois não são todos os pokemons que possuem esse atributo do pixel animado*/

                document.getElementById("div-img-pokemon").innerHTML =
                    `
                <img 
                src="${src}"
                class= "img-pokemon"
                >`

                //img pokemon pixel => data.sprites.front_default
                //gif pokemon pixel => data.sprites.versions['generation-v']['black-white'].animated.front_default

                /*
                o uso dos [] é necessário porque as propriedades "generation-v" e "black-white" contêm caracteres especiais (hífen). Ao usar as chaves, você está indicando 
                que essas propriedades devem ser tratadas como uma string literal, permitindo que você acesse corretamente os valores dessas propriedades.Sem as chaves, o JavaScript
                interpretaria o hífen como um operador de subtração e geraria um erro. Portanto, ao usar as chaves, você está garantindo que as propriedades sejam tratadas como strings 
                literais e possam ser acessadas corretamente.
                */
                
                defineBackground(data.types[0].type.name)

                if (data.types[1] != undefined && data.types[0].type.name == "normal") {
                    defineBackground(data.types[1].type.name)
                }
                

                document.getElementById("div-infos-pokemon").innerHTML =
                    `
                    <p> 
                    Name: ${data.name} <br>
                    Type: ${data.types[0].type.name}
                    </p>
                    `
            })
            .catch(error => {
                console.error("Erro na chamada da API: ", error)
                document.getElementById("div-img-pokemon").style.backgroundImage = ""
                document.getElementById("div-img-pokemon").innerHTML = `<img src= "img/ashmorto.jpg" class= "img-erro">`
                document.getElementById("div-infos-pokemon").innerHTML =
                    `
                        <p> 
                            ERRO!<br>
                            Verifique se o nome do pokemon inserido está escrito corretamente e tente novamente!
                        </p>
                        `
            })
    }
    event.preventDefault()
}

// function para definir o background da div, baseado no tipo do pokemon
function defineBackground(pokemonType) {
    var divImgPokemon = document.getElementById("div-img-pokemon")
    divImgPokemon.style.backgroundImage = `url(img/${pokemonType}.jpg)`
    console.log(pokemonType)
}