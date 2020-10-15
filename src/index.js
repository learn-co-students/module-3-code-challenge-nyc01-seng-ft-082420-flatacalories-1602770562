document.addEventListener('DOMContentLoaded', (e) => {
    const charContainer = document.querySelector("#character-bar")
    const baseURL = "http://localhost:3000/characters/"

    const renderCharacter = (character) =>{
        const charSpan = document.createElement("span")
        charSpan.textContent =`${character.name}`
        charSpan.dataset.charId = `${character.id}`
        charContainer.append(charSpan)

    }
    const renderCharacters = (characters) =>{
        for(character of characters){
            renderCharacter(character)
        }
    }

    const getCharacters = ()=>{
        fetch(baseURL)
        .then(resp =>(resp.json())
        .then(characters => renderCharacters(characters))
    )}
    const getStats = () =>{
        fetch
    }

    getCharacters()
})