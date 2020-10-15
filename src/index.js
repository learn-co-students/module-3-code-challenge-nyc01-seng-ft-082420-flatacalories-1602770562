document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000/characters"

  // Deliverable 1: fetch and render characters
  const getCharacters = () => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(characters => renderCharacters(characters))
  }

  const renderCharacters = characters => {
    characters.forEach(character =>{
      renderCharacter(character)
    })
  }

  const renderCharacter = character => {
    const characterBar = document.querySelector("#character-bar")
    const characterDiv = document.createElement("div")
    characterDiv.dataset.id = character.id
    characterDiv.innerHTML = `
    <span>
      ${character.name}
    </span>
    `
    characterBar.append(characterDiv)
  }

/* Deliverable 2: Select a character from characterBar and see info inside div */

  const clickHandler = () => {
    const characterSpan = document.querySelector("span")
    document.addEventListener("click", e => {
      if (e.target.matches("span")){
        const characterSpan = e.target

        const name = characterSpan.textContent
        let characterName = document.querySelector("#name")
        characterName.textContent = name

        // image should be character's image
        let characterImage = document.querySelector("#image")
        // image is hidden - need a function to keep it hidden until called on
        
        // calories should be character's calories
        let characterCalories = document.querySelector("#calories")
        // calories also hidden - need a function to keep hidden until called on

      }
    })

  }

/* Deliverable 3: Clicking on add calories will add calories, will persist*/

  const addCalories = () => {
    
  }





  getCharacters();
  clickHandler();
})
