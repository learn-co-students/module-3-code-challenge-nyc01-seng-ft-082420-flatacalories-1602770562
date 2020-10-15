document.addEventListener('DOMContentLoaded', (e) => {
  const charContainer = document.querySelector("#character-bar")
  const baseURL = "http://localhost:3000/characters/"
  const form = document.querySelector("#calories-form")
 
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
     
      const target = e.target
      if (target.matches("span")) {
        getStats(target.dataset.charId)
      }
    //   if (target.textContent === "Add Calories") {
    //       console.log(target)
    //   }
    })
  }

  const submitHandler = (e) =>{
      const name = document.querySelector("#name")
      const image = document.querySelector("#image")
      const calories = document.querySelector("#calories")
      console.log(form)
      document.addEventListener("submit", (e) => {
       e.preventDefault()
       const char = {name: name.textContent, calories: parseint(calories.textContent)}
      console.log(e.target.name)
      
      updateCalories(char)

    })
}
  
    const updateCalories = (char) =>{
        
        const newCalories ={calories: form.calories+char.calories}
        console.log(baseURL + form.characterId)
        const options = {
            method: 'PATCH',
             headers: {
                'Content-Type': 'application/json',
                "accept": "application/json"
            }, 
            body: JSON.stringify(newCalories)
        }
        fetch(baseURL + form.characterId, options)
        .then(resp => (resp.json())
        .then(character => renderStats(character))
        )}

  const getStats = (charId) => {
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
  submitHandler()
})
