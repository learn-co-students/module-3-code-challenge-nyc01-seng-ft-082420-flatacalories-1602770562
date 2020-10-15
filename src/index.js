document.addEventListener("DOMContentLoaded" , () => {
baseUrl = "http://localhost:3000/characters/"

const getAllCharacters = () => {
    return fetch(baseUrl)
    .then(response => response.json())
}

const displayCharacters = () => {
    getAllCharacters()
    .then(data => {
        const charactersDiv = document.querySelector('#character-bar')
        console.log(charactersDiv)
        for(const character of data){

        displayOneCharacter(character, charactersDiv)
        }
    })
}
const displayOneCharacter = (character, charactersDiv) => {
    const characterSpan = document.createElement('span')
    characterSpan.innerHTML = character.name
    characterSpan.addEventListener('click', e => {
        displayCharacterInfo(character)
    })
    charactersDiv.append(characterSpan)
}
const displayCharacterInfo = (character) => {
    const infoDiv = document.querySelector('#detailed-info')
    const infoName = document.querySelector('#name')
    const infoImg = document.querySelector('#image')
    infoName.innerHTML = character.name
    infoImg.src = character.image
}
displayCharacters()

})