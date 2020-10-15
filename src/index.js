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

    name.textContent = character.name
    image.src = character.image
    calories.textContent = character.calories
  }

  const clickHandler = () =>{
    document.addEventListener('click', e=>{
      const characterId = e.target.dataset.characterId

      if (characterId){
        fetch(url + characterId)
        .then(resp =>resp.json())
        .then(character =>{
          renderInfo(character)
        })
      }
    })
  }

  const submitHandler = () =>{
    document.addEventListener('submit',e=>{
      e.preventDefault()
      const form = e.target
      const currentCol = document.querySelector('#calories')
      console.log(form,currentCol)
    })
  }


  renderData()
  clickHandler()
  submitHandler()

})
