document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/characters'
    const charDiv = document.getElementById('character-bar')

    const getCharacters = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        //.then(characters => console.log(characters));
        .then(characters => renderChars(characters));
    }

    const renderChars = (characters) => {
        for(const character of characters){
            //console.log(character)
            addCharToDom(character)
        }
    }

    const addCharToDom = (character) => {
        const charSpan = document.createElement('span')
        charSpan.dataset.id = character.id
        charSpan.innerHTML = `
        ${character.name}
        `
        charDiv.appendChild(charSpan)
    }

    const clickCharacter = () => {
    const charInfoDiv = document.getElementById('detailed-info')
    //const imageId = document.getElementById('image')
        charDiv.addEventListener('click', (e) => {
    //        document.getElementById("character-bar").click();
    //        if e.target = character.name

        })
    }


    getCharacters()
    clickCharacter()
})