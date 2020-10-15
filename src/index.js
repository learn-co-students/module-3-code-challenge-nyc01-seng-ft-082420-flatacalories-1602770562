    const baseUrl = 'http://localhost:3000/characters'
    const characterBar = document.querySelector('#character-bar')

    const getCharacters = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(character => renderCharacters(character))
    }

    const renderCharacters = (character) => {
        for (const characterObj of character) {
            renderCharacter(characterObj)
        }
    }

    const renderCharacter = (character) => {
        const characterSpan = document.createElement('span')
        
        characterSpan.dataset.id = character.id
        characterSpan.innerHTML = `${character.name}`
        
        characterBar.append(characterSpan)
    }

    const clickHander = () => {
        characterBar.addEventListener('click', function (e){
            if (e.target.matches('span')) {
                let span = e.target
              let characterId = span.dataset.id
            }
        })
    }






    clickHander()
    getCharacters()

