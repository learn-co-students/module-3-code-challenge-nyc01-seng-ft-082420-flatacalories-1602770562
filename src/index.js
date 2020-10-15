    const baseUrl = 'http://localhost:3000/characters/'
    const characterBar = document.querySelector('#character-bar')
    const characterInfo = document.querySelector('#detailed-info')


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
                
        
        <form id="calories-form" data-id="${character.id}">
            <input type="hidden" value="${character.id}" id="characterId"/> 
            <input type="hidden" value="${character.name}" id="characterId"/> 
            <input type="text" placeholder="0" id="calories"/>
            <input type="submit" value="Add Calories"/>
        </form>

        <button id="reset-btn">Reset Calories</button>
        `

        document.querySelector('.characterInfo').append(characterInfo)
    }

    const submitHandler = () => {
        
        document.addEventListener('submit' , e => {
            e.preventDefault()

            if (e.target.matches('#calories-form')) {
                const form = e.target
                addCalories(form)
            }
        })

    }


    const addCalories = (form) => {
       const currentCalories = parseInt(document.querySelector('#calories').textContent)

       console.log(currentCalories)

       const addCalories = parseInt(form[0].value)
       const characterId = form.dataset.id

       const caloriesText = document.getElementById('calories')

       const options = {
           method: 'PATCH',
           headers: {
               'Content-Type': 'application/json',
               'Accept': 'application/json'
           },
           body: JSON.stringify({  calories: currentCalories + addCalories })
       }

       fetch(baseUrl + characterId, options)
       .then(response => response.json())
       .then(character => {
           caloriesText.textContent = character.calories
           form.reset()
       })
    }




    submitHandler()
    clickHander()
    getCharacters()

