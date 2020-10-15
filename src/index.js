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
        charSpan.dataset.id = char.id
        charSpan.classList.add('char-btn')
        charBar.append(charSpan)
    }

    const getCharacters = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(characters => renderCharactersBar(characters))
    }


    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.char-btn')) {
                const charBtn = e.target
                const charId = charBtn.dataset.id
                console.log(charId)
            }
        })
    }




    getCharacters()
    clickHandler()
})



/*
get data from server
add span tag with name to character bar


click character to see all info in #detailed-info div

add calories button adds calories to character


*/