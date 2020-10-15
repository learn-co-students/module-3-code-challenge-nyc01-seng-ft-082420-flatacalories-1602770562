document.addEventListener('DOMContentLoaded', e => {
  const baseUrl = 'http://localhost:3000/characters/'

  const getCharacters = () => {
    cBar = document.getElementById('character-bar')
    cBar.innerHTML = ""
    fetch(baseUrl)
    .then(response => response.json())
    .then(characterData => {
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
        cId = cButton.dataset.characterId

        fetch(baseUrl + cId)
        .then(response => response.json())
        .then(cData => {
          let info = document.getElementById('detailed-info')
          let cName = document.getElementById('name')
          let cImage = document.getElementById('image')
          let calories = document.getElementById('calories')
          let form = document.getElementById('calories-form')
          form.dataset.characterId = cData.id
          cName.textContent = cData.name
          cImage.src = cData.image
          calories.textContent = cData.calories
        })
      } else if (e.target.matches('#reset-btn')) {setCalories(0)}
    })
  }

  const setCalories = (calories) => {
    options = {
      method: "PATCH",
      headers: {
        "content-type" : "application/json",
        "accept" : "application/json"
      },
      body: JSON.stringify({
        calories: calories
      })
    }


    fetch(baseUrl + cId, options)
    .then(response => response.json())
    .then(cData => {
      let calories = document.getElementById('calories')
      calories.textContent = cData.calories
    })
  }

  const submitHandler = () => {
    const caloriesForm = document.getElementById('calories-form')
    caloriesForm.addEventListener('submit', e => {
      e.preventDefault()

      const calorieCount = caloriesForm.querySelector('#calories').value
      const cId = caloriesForm.dataset.characterId

      setCalories(calorieCount)
      caloriesForm.reset()
    })

  }

  getCharacters()
  clickHandler()
  submitHandler()

})
