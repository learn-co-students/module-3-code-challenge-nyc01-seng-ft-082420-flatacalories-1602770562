document.addEventListener('DOMContentLoaded', function() {

const url = "http://localhost:3000/characters/"

const renderCharacters = charactersOBj =>{
    for(const character of charactersOBj){
        renderCharacter(character)

    }
}



renderCharacter = characterObj =>{
const characterBar = document.getElementById('character-bar')
const characterSpan = document.createElement('span')

characterSpan.textContent = characterObj.name
characterSpan.dataset.characterId = characterObj.id

characterBar.append(characterSpan)
}

const renderCharacterDetail = charId =>{
    const charcterInfo = document.getElementById("detail-info")
    const p = document.getElementById("name")
    const image = document.getElementById("image")
    const calories = document.getElementById('calories')
    calories.dataset.id = charId
    
    

    fetch(url)
    .then(res=> res.json())
    .then(characters => {
        for(const character of characters){
            if(character.id == charId){
                p.innerHTML = `${character.name}`
                image.src = `${character.image}`
                calories.textContent= `${character.calories}`
                
            }
        }
    })

}

function clickHandler(){
    const span = document.querySelector('#character-bar')
    
    span.addEventListener('click', e=> {
        const characterId = e.target.dataset.characterId
        console.log(characterId)
        renderCharacterDetail(characterId)

    })
}

clickHandler()

const getCharacters = () =>{
    fetch(url)
    .then(res=> res.json())
    .then(characters => renderCharacters(characters))
}

getCharacters()
})