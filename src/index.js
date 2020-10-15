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
    document.addEventListener("click", e => {
      if (e.target.matches("span")){
        const characterSpan = e.target

        const name = characterSpan.textContent
        let characterName = document.querySelector("#name")
        characterName.textContent = name

        /* image should be character's image */
        /* image is hidden - need a function to keep it hidden until called on */
        let characterImage = document.querySelector("#image")
        // characterImage.src = image
        
        /* calories should be character's calories*/
        /* calories also hidden - need a function to display hidden until called on */
        let characterCalories = document.querySelector("#calories")
        // characterCalories.textContent = calories

      }
    })

  }

/* Deliverable 3: Clicking on add calories will add calories, will persist*/

  const addCalories = () => {
    const form = document.querySelector("#form")
    form.addEventListener("submit", e => {
      e.preventDefault();

      const form = e.target
      // select button, where button dataset id should be character's
      const formId = document.form.button.dataset.id = characterDiv.dataset.id



      form.calories.value = calories

      const newCalories = {calories: calories}

      const options= {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({newCalories})
      } 

      // get request back to the character

      fetch(baseUrl // + characterId, options)
        // getCharacters()
    })
  }





  getCharacters();
  clickHandler();
})
