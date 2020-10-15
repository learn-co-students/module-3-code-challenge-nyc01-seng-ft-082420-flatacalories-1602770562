document.addEventListener('DOMContentLoaded', e => {
    const baseUrl ="http://localhost:3000/characters/"
    const characterBar = document.querySelector('#characterBar')
    const getCharacter = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(characters => renderCharacters(characters))
    }
    const renderCharacters = characters => {
        const characterBar = document.querySelector('#characterBar')
        characters.forEach(character => renderCharacter(character))
    }

    const renderCharacter = character => {
        const characterSpan = document.createElement('span')
        characterSpan.classList.add('charSpan')
        characterSpan.innerHTML = `${character.name}`
        characterBar.append(characterSpan)
        }
    const clickHandler = () => {
        const info = documment.querySelector('#detailed-info')
        document.addEventListener('click', e => {
            if(e.target.className === 'charSpan'){
                fetch(baseUrl, {
                    method:'POST',
                    headers: {
                        'content-type':'application/json',
                        'accept':'application/json'
                    },
                }
)
            }
        })
    }
getCharacter()
renderCharacter()
})