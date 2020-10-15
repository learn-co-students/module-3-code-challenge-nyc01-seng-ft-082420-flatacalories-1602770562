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

    const selectCharacter = () => {
        const charSpan = document.querySelector('span')
        document.addEventListener('click', e => {
        if (e.target.textContent = charID){
        populateDetailInfo
        }
        })

        const populateDetailInfo = () => {
            const charInfoDiv = document.getElementById('detailed-info')
            const imageId = document.getElementById('image')
            .characterInfo
        }
    }
        


    getCharacters()
    selectCharacter()
})