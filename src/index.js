document.addEventListener("DOMContentLoaded", () => {
  const baseUrl = "http://localhost:3000/characters"

  // Deliverable 1: fetch and render characters
  const getCharacters = () => {
    fetch(baseUrl)
      .then(response => response.json())
      // .then(data => console.log(data))
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
      <p>${character.name}</p>
    </span>
    `
    // append!
    characterBar.append(characterDiv)
  }

/* Deliverable 2: Select a character from characterBar and see info inside div */

  const clickHandler = () => {
    document.addEventListener("click", (e) => {
      if (e.target.matches("span")){
        console.log("this is working")
        // const characterDiv = e.target
        // set character name to a constant

        // select the detailed info div
          // name should be the character's name
          // image should be character's image
      }
    })

  }





  getCharacters();
  clickHandler();
})
