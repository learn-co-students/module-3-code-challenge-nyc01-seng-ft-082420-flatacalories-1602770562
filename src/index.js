/* 
Your base URL for your API will be: http://localhost:3000

- GET `/characters`
- GET `/characters/:id`
- PATCH `/characters/:id`

√√ 1. See all characters names in a `div` with the id of `"character-bar"`. On page load, **request** data from the server to get all of the characters objects. When you have this information, you'll need to add a `span` tag with the character's name to the character bar.

2. Select a character from the character bar and see character's info inside `#detailed-info` div. 
  √ - click handler for span
  √ - get fetch for id endpoint
  √- render to detailed info

3. Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.
  √ - watch for form submit
  - fetch post
  - update calroies on DOM
*/

document.addEventListener("DOMContentLoaded", () => {
  baseUrl = `http://localhost:3000/characters/`
  // fetch all characters
  
  const getCharacters = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(renderCharacters)
  }

  const getOneCharacter = (id) => {
    fetch(baseUrl + id)
    .then(response => response.json())
    .then(renderDetailedCharacter)
  }

  const addCalories = (id, newCalories) => {
    let options = {
      method: "PATCH",
      headers: {
        "content-type":"application/json",
        "accept":"application/json"
      },
      body: JSON.stringify({
        calories: newCalories
      })
    }

    fetch(baseUrl + id, options)
    .then(response => response.json())
    // .then(console.log)
    .then(renderDetailedCharacter)
  }

  const renderCharacters = (characters) => {
    for(const character of characters){
      renderCharacter(character)
    }
  }

  const renderCharacter = (character) => {
    let charBar = document.querySelector('#character-bar');
    let charSpan = document.createElement('span')
    charSpan.textContent = `${character.name}`
    charSpan.dataset.id = character.id
    charBar.append(charSpan)
  }

  const renderDetailedCharacter = (character) => {
    let detailedDiv = document.querySelector('#detailed-info');

    detailedDiv.querySelector('#name').textContent = character.name
    let calories = detailedDiv.querySelector('#calories').textContent = character.calories
    detailedDiv.querySelector('#image').src = character.image

    watchFormSubmit(character.id, calories)
  }
  

  const clickHandler = () => {
    let charBar = document.querySelector('#character-bar');
    charBar.addEventListener('click', e => {
      if(e.target.matches('span')){
        let id = e.target.dataset.id
        getOneCharacter(id)
      }
    })
  }

  const watchFormSubmit = (id, calories) => {
    const calorieForm = document.querySelector('#calories-form');
    calorieForm.addEventListener('submit', e => {
      e.preventDefault();
      let caloriesAdding = calorieForm.calories.value
      console.log(calories)
      newCalories = parseInt(calories)+ parseInt(caloriesAdding)
      addCalories(id, newCalories)
      calorieForm.reset()
    })
  }

  clickHandler()
  getCharacters()
})