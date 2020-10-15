document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/characters/'
  const characterBar = document.querySelector('#character-bar')

  const getCharacters = () => {
    characterBar.innerHTML = ''

    fetch(baseUrl)
      .then(response => response.json())
      .then(characters => {
        for(const char of characters) {
          renderCharacterBar(char)
        }
      })
  }

  const renderCharacterBar = characterObj => {
    
    const characterSpan = document.createElement('span')

    characterSpan.dataset.characterId = characterObj.id
    characterSpan.textContent = characterObj.name
    characterBar.append(characterSpan)
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if(e.target.matches('span[data-character-id]')) {
        const characterSpan = e.target
        const characterId = characterSpan.dataset.characterId
        getCharacterDetail(characterId)
      } 
      else if(e.target.id === 'reset-btn') {
        const resetBtn = e.target
        const characterId = resetBtn.closest('div').dataset.characterId
        updateCharacter(characterId, {calories: 0})
      } 
      else if(e.target.id === 'edit-btn') {
        const newForm = document.querySelector('#new-form')
        newForm.id = 'edit-form'
        newForm.submit.value = 'Edit Character'
        const characterDiv = newForm.nextElementSibling

        newForm.style.display = 'block'
        newForm.name.value = characterDiv.querySelector('p').textContent
        newForm.image.value = characterDiv.querySelector('img').src

      } 
      else if(e.target.id === 'new-btn') {
        const newForm = document.querySelector('#new-form')
        newForm.style.display = 'block'
      }
    })
  }

  const getCharacterDetail = characterId => {
    fetch(baseUrl + characterId)
      .then(response => response.json())
      .then(renderCharacterDetail)
  }

  const renderCharacterDetail = characterObj => {
    const charDiv = document.querySelector('#detailed-info')
    const charName = document.querySelector('#name')
    const charImg = document.querySelector('#image')
    const charCal = document.querySelector('#calories')

    charDiv.dataset.characterId = characterObj.id
    charName.textContent = characterObj.name
    charImg.src = characterObj.image
    charCal.textContent = characterObj.calories

  }

  const submitHandler = () => {

    document.addEventListener('submit', e => {
      if(e.target.id ==='calories-form') {
        e.preventDefault()
        const caloriesForm = e.target
        const characterId = caloriesForm.closest('div').dataset.characterId
  
        const currentCalories = parseInt(document.querySelector('#calories').textContent)
        const caloriesToAdd = parseInt(caloriesForm.querySelector('#calories').value)
        const updatedCalories = currentCalories + caloriesToAdd
        
        caloriesForm.reset()
        
        updateCharacter(characterId,{calories: updatedCalories})
      } 
      else if(e.target.id ==='new-form') {
        e.preventDefault()
        const newForm = document.querySelector('#new-form')
        const newCharacter = {
          name: newForm.name.value,
          image: newForm.image.value,
          calories: 0
        }

        newForm.reset()
        createCharacter(newCharacter)
      }
      else if(e.target.id === 'edit-form') {
        e.preventDefault()
        const editForm = document.querySelector('#edit-form')
        const charId = editForm.nextElementSibling.dataset.characterId

        const updatedInfo = {
          name: editForm.name.value,
          image: editForm.image.value
        }
        editForm.reset()
        updateCharacter(charId, updatedInfo)
      }

      })

  }

  const updateCharacter = (characterId, updatedChar) => {
    if (characterId === undefined) return

    const options = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(updatedChar)
    }

    fetch(baseUrl + characterId, options)
      .then(response => response.json())
      .then(renderCharacterDetail)

  }

  const createCharacter = characterObj => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(characterObj)
    }
    
    fetch(baseUrl, options)
      .then(response => response.json())
      .then(_char =>{
        const newForm = document.querySelector('#new-form')
        newForm.style.display = 'none'
        getCharacters()
      })
  }

  submitHandler()
  clickHandler()
  getCharacters()
})



// 1. See all characters names in a `div` with the id of `"character-bar"`. On page load, **request** data from the server to get all of the characters objects. When you have this information, you'll need to add a `span` tag with the character's name to the character bar.

// ✅- GET to characters
// ✅-- Render characters in the character bar on page load

// 2. Select a character from the character bar and see character's info inside `#detailed-info` div. 
// ✅ - click listener on the span
// ✅ - on click GET to the characters show route
// ✅ - render detailed info into the div

// 3. Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.

// ✅ - PATCH to the character path with the calories from form
//✅  - Update the DOM