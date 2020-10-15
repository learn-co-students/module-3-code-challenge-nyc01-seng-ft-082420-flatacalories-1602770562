//step 1:
// 1. render all characters by names in a div
// 2. add span tag into "character-bar"
document.addEventListener("DOMContentLoaded", () => {

    const fetchUrl = " http://localhost:3000/characters/"
    const barDiv = document.querySelector("div#character-bar")

    const getCharacters = () => {
        fetch(fetchUrl)
        .then(response => response.json())
        .then(characters => renderCharacters(characters))
    }

    const renderCharacters = (characters) => {
        // console.log(characters)
        characters.forEach(character => renderCharacter(character))
    }

    const renderCharacter = (character) => {
        // console.log(character)
        const characterSpan = document.createElement("span")
        characterSpan.innerHTML = ` ${character.name} `
        // console.log(characterSpan)
        barDiv.append(characterSpan)
    }
//Step 1 was a success! Don't come back for now!
//--------------------------------------------------//

//step 2:
//1. clickEvent one character from the "character-bar" and see the info inside #detailed-info div
    const clickHandler = () => {
        document.addEventListener('click', (e) => {
            const 

        })
    }
    
    
//step 3:
// 1. click event on "add calories"
// 2. Update the DOM (maybe PACTH?)

getCharacters()
clickHandler()
})




