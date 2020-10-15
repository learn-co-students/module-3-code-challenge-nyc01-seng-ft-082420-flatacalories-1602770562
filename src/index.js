const url = "http://localhost:3000/characters/"

document.addEventListener('DOMContentLoaded', () => {
  const renderCharacter = (character) => {
    const characterBar = document.querySelector('#character-bar')
    const characterSpan = document.createElement('span')
    characterSpan.setAttribute('data-character-id', `${character.id}`)
    characterSpan.innerHTML = `${character.name}`
    characterBar.append(characterSpan)
  }

  const renderCharacters = (characters) => {
    for (const character of characters) {
      renderCharacter(character)
    }
  }

  const renderData = () => {
    fetch(url)
      .then(resp => resp.json())
      .then(renderCharacters)
  }

  const renderInfo = (character) =>{
    const name = document.querySelector('#name')
    const image = document.querySelector('#image')
    const calories = document.querySelector('#calories')
    const form = document.querySelector('#calories-form')
    const resetButton = document.querySelector('#reset-btn')
    resetButton.setAttribute("data-character-id",`${character.id}`)
    form.setAttribute("data-character-id",`${character.id}`)
    const cells = form.children
    const enterCol = cells[1]
    enterCol.setAttribute('name','calories')
    enterCol.setAttribute('value',"0")
    enterCol.id = character.id

    name.textContent = character.name
    image.src = character.image
    calories.textContent = character.calories
  }

  const clickHandler = () =>{
    document.addEventListener('click', e=>{
      const button = e.target
      const characterId = button.dataset.characterId
      if (characterId){
        fetch(url + characterId)
        .then(resp =>resp.json())
        .then(character =>{
          renderInfo(character)
        })
      }

      if(button.textContent == "Reset Calories"){
        const characterId = button.dataset.characterId
        const options = {
          method: "PATCH",
          headers:{
            "content-type": "application/json",
            "accept": "application/json"
          },
          body: JSON.stringify({calories: 0})
        }
        fetch(url + characterId, options)
        .then(resp => resp.json())
        .then(renderInfo)
      }
    })
  }

  const submitHandler = () =>{
    document.addEventListener('submit',e=>{
      e.preventDefault()
      const input = e.target
      const form = document.querySelector('#calories-form')
      characterId = form.dataset.characterId
      const currentCol = parseInt(document.querySelector('#calories').textContent)
      const inputCol = parseInt(form.calories.value)
      const newCol = currentCol + inputCol
      const options = {
        method: "PATCH",
        headers:{
          "content-type": "application/json",
          "accept": "application/json"
        },
        body: JSON.stringify({calories: newCol})
      }
      fetch(url + characterId,options)
      .then(resp => resp.json())
      .then(renderInfo)
      form.reset()
    })
  }

/* -------------- */

  renderData()
  clickHandler()
  submitHandler()
})
