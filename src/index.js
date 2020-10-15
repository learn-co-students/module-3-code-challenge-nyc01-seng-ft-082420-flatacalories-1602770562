document.addEventListener('DOMContentLoaded', () => {
  const baseUrl = 'http://localhost:3000/characters/'

  const getCharacters = () => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(characters => {
        for(const char of characters) {
          renderCharacterBar(char)
        }
      })
  }

  const renderCharacterBar = characterObj => {
    const characterBar = document.querySelector('#character-bar')
    const characterSpan = document.createElement('span')

    characterSpan.dataset.characterId = characterObj.id
    characterSpan.textContent = characterObj.name
    characterBar.append(characterSpan)
  }

  const clickHandler = () => {
    const characterBar = document.querySelector('#character-bar')
    characterBar.addEventListener('click', e => {
      if(e.target.matches('span')) {
        const characterSpan = e.target
        const characterId = characterSpan.dataset.characterId
        getCharacterDetail(characterId)
      } else if(e.target.id === 'reset-btn') {
        console.log('reset those calories')
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
    const caloriesForm = document.querySelector('#calories-form')
    caloriesForm.addEventListener('submit', e => {
      e.preventDefault()
      const caloriesForm = e.target
      const characterId = caloriesForm.closest('div').dataset.characterId

      const currentCalories = parseInt(document.querySelector('#calories').textContent)
      const caloriesToAdd = parseInt(caloriesForm.querySelector('#calories').value)
      const updatedCalories = currentCalories + caloriesToAdd
      
      caloriesForm.reset()
      
      const options = {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({calories: updatedCalories})
      }

      fetch(baseUrl + characterId, options)
        .then(response => response.json())
        .then(renderCharacterDetail)
      
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