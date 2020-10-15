/* 
Your base URL for your API will be: http://localhost:3000

- GET `/characters`
- GET `/characters/:id`
- PATCH `/characters/:id`

√√ 1. See all characters names in a `div` with the id of `"character-bar"`. On page load, **request** data from the server to get all of the characters objects. When you have this information, you'll need to add a `span` tag with the character's name to the character bar.

2. Select a character from the character bar and see character's info inside `#detailed-info` div. 
  - click handler for span
  - get fetch for id endpoint
  - render to detailed info
    - clear deatialed prior to append

3. Clicks on "Add Calories" button to add calories to a Character. Persist calories value to the server and update the DOM.

*/

document.addEventListener("DOMContentLoaded", () => {
  baseUrl = `http://localhost:3000/characters/`
  // fetch all characters
  
  const getCharacters = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(renderCharacters)
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


  
  getCharacters()
})