/*
  1. div: #character-bar
  2. GET all characters
  3. add <span> with names to bar, selectable
  4.when click on span, display info in div: #detailed-info
  5.PATCH clories with clories form button

  Advance:

*/

document.addEventListener('DOMContentLoaded', () => {
  const PRE_FIX = 'http://localhost:3000/characters/'
  const bar = document.querySelector('#character-bar')
  const detailDiv = document.querySelector('#detailed-info')

  const renderDogs = (dogs) => {
    dogs.forEach(renderDog)
  }

  const renderDog = (dog) => {
    const dogSpan = document.createElement('span')
    dogSpan.innerText = dog.name
    dogSpan.dataset.id = dog.id
    bar.append(dogSpan)
  }

  const fetchDogs = () => {
    fetch(PRE_FIX)
    .then(resp => resp.json())
    .then(renderDogs)
  }

  const fetchDog = (id) => {
    fetch(PRE_FIX + id)
    .then(resp => resp.json())
    .then(renderDogDetail)
  }
  const patchDog = (id, adds) => {
    const options = {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'accepts': 'application/json'
      },
      body: JSON.stringify({calories: parseInt(adds)})
    }

    fetch(PRE_FIX + id, options)
    .then(resp => resp.json())
    .then(renderCalories)
  }

  const renderCalories = (dog) => {
    const caloriesSpan = document.querySelector('span#calories')
    caloriesSpan.innerText = dog.calories
  }
  
  const renderDogDetail = (dog) => {
    const name = detailDiv.querySelector('#name')
    const image = detailDiv.querySelector('#image')
    const calories = detailDiv.querySelector('#calories')
    const hiddenId = detailDiv.querySelector('#characterID')
    name.innerHTML = dog.name
    image.setAttribute('src', dog.image)
    calories.innerHTML = dog.calories
    hiddenId.value = dog.id
  }
  const clickHandler = () => {
    document.addEventListener('click', e => {
      let data = e.target
      if(data.matches('#character-bar span')){
        let dogId = data.dataset.id
        fetchDog(dogId)
      }else if(data.matches('#reset-btn')){
        let dogId = document.querySelector('#characterId').value
        patchDog(dogId, 0)
      }

    })
  }
  const formHandler = () => {
    document.addEventListener('submit', e => {
      let form = e.target
      if(form.matches('#calories-form')){
        const id = form.querySelector('#characterId').value
        const add = form.querySelector('#calories').value
        const origin = document.querySelector('span#calories').innerText
        const sum = parseInt(add) + parseInt(origin)
        patchDog(id, sum);
        e.preventDefault();
      }
    })
  }

  formHandler();
  fetchDogs();
  clickHandler();


})
