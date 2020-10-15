    const baseUrl = 'http://localhost:3000/characters'
    const characterBar = document.querySelector('#character-bar')
    const characterInfo = document.querySelector('#detailed-info')

    console.log(characterInfo)

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
                getCharacterSpan(characterId)
            }
        })
    }


    const getCharacterSpan = (characterId) => {
        fetch(baseUrl + characterId)
        .then(response => response.json())
        .then(character => renderCharacterInfo(character))
    }


    const renderCharacterInfo = (character) => {
        characterInfo.innerHTML = `
         <p id="name">${character.name}</p>
        <img id="image" src="${character.image}">
        <h4>Total Calories: <span id="calories">${character.calories}</span> </h4>
                
        
        <form id="calories-form">
            <input type="hidden" value="${character.id}" id="characterId"/> 
            <input type="hidden" value="${character.name}" id="characterId"/> 
            <input type="text" placeholder="0" id="calories"/>
            <input type="submit" value="Add Calories"/>
        </form>

        <button id="reset-btn">Reset Calories</button>
        `
    }





    clickHander()
    getCharacters()

