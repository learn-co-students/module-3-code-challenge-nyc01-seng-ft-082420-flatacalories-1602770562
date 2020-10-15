document.addEventListener('DOMContentLoaded', (e) => {
  const charContainer = document.querySelector("#character-bar")
  const baseURL = "http://localhost:3000/characters/"

  const renderCharacter = (character) => {
    const charSpan = document.createElement("span")
    charSpan.textContent = `${character.name}`
    charSpan.dataset.charId = `${character.id}`
    charContainer.append(charSpan)

  }
  const renderCharacters = (characters) => {
    for (character of characters) {
      renderCharacter(character)
    }
  }

  const getCharacters = () => {
    fetch(baseURL)
      .then(resp => (resp.json())
        .then(characters => renderCharacters(characters))
      )
  }
  const clickHandler = () => {
    document.addEventListener("click", (e) => {
      e.preventDefault()
      const target = e.target
      if (target.matches("span")) {
        getStats(target.dataset.charId)
      }
    })
  }

  const submitHandler = () => {
    document.addEventListener("submit", (e) => {
      e.preventDefault()
      const target = e.target
      
    })
  }


  const getStats = (charId) => {
    const charSpan = document.queryselctor
    fetch(baseURL + charId)
      .then(resp => (resp.json())
        .then(character => renderStats(character))
      )
  }

  const renderStats = (character) => {
    const name = document.querySelector("#name")
    const image = document.querySelector("#image")
    const calories = document.querySelector("#calories")
    image.src = character.image
    name.textContent = character.name
    calories.textContent = character.calories

  }


  getCharacters()
  clickHandler()
})
