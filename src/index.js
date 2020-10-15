document.addEventListener('DOMContentLoaded', e => {
    const baseUrl = "http://localhost:3000/characters/"

    const charBar = document.querySelector('#character-bar')

    const renderCharactersBar = characters => {
        for (const char of characters) {
            renderCharSpan(char)
        }
    }

    const renderCharSpan = char => {
        let charSpan = document.createElement('span')
        charSpan.innerText = `${char.name}`
        //charSpan.setAttribute('data', "id: '${char.id}'")
        charBar.append(charSpan)
    }

    const getCharacters = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(characters => renderCharactersBar(characters))
    }




    getCharacters()
})



/*
get data from server
add span tag with name to character bar


click character to see all info in #detailed-info div

add calories button adds calories to character


*/