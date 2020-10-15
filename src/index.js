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

    const renderCharPage = char => {
        const charPage = document.querySelector('#detailed-info')
        const nameP = charPage.querySelector('#name')
        const img = charPage.querySelector('#image')
        const caloriesSpan = charPage.querySelector('#calories')
        nameP.innerText = `${char.name}`
        img.src = `${char.image}`
        caloriesSpan.innerText = `${char.calories}`
    }

    const getCharacters = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(characters => renderCharactersBar(characters))
    }

    const getSingleCharacter = charId => {
        fetch(baseUrl + charId)
        .then(response => response.json())
        .then(char => renderCharPage(char))
    }


    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.char-btn')) {
                const charBtn = e.target
                const charId = charBtn.dataset.id
                getSingleCharacter(charId)
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