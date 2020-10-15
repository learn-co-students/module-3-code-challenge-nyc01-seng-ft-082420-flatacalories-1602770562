/*

As user, see all characters names on div with id character-bar".
  On page load, GET fetch all characters. Create span tag and appened to character bar

Click a character to see character info, inside of #detailed-info div.

clicks on "Add Calories" button to add calories to a chracter. Persist cals to DB and update DOM


*/


document.addEventListener("DOMContentLoaded", () =>{

  const baseUrl = "http://localhost:3000/characters/"
  const charBar = document.querySelector('#character-bar')
  const charDetailsDiv = document.querySelector('#detailed-info')

  const getChars = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(characters => {
      renderChars(characters)
    })

  }

  const renderChars = characters => {
    for (const character of characters) {
      renderChar(character)
    }
  }

  const renderChar = character => {
    const charSpan = document.createElement('span')
    charSpan.textContent = character.name
    charSpan.dataset.charId = character.id 
    charBar.append(charSpan)

    charDetailsDiv.innerHTML = `
    <p id="${character.name}">${character.name}</p>
    <img id="${character.image}" src="assets/dummy.gif">
    <h4>Total Calories: <span id="${character.calories}">${character.calories}</span> </h4>
    `


  }




  getChars()
})