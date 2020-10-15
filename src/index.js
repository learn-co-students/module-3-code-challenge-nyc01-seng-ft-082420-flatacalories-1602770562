document.addEventListener('DOMContentLoaded', e => {
  const baseUrl = 'http://localhost:3000/characters/'

  const getCharacters = () => {
    fetch(baseUrl)
    .then(response => response.json())
    .then(characterData => {
      console.log(characterData)
      cBar = document.getElementById('character-bar')
      console.log(cBar)
      for (character of characterData) {
        const cSpan = document.createElement('span')
        cSpan.textContent = character.name
        cSpan.dataset.characterId = character.id
        cBar.append(cSpan)
      }
    })
  }

  const clickHandler = () => {
    document.addEventListener('click', e => {
      if (e.target.matches('[data-character-id]')) {
        const cButton = e.target
        const cId = cButton.dataset.characterId

        fetch(baseUrl + cId)
        .then(response => response.json())
        .then(cData => {
          let info = document.getElementById('detailed-info')
          let cName = document.getElementById('name')
          let cImage = document.getElementById('image')
          cName.textContent = cData.name
          cImage.src = cData.image
        })
      }
    })
  }


  getCharacters()
  clickHandler()

})
