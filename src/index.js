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

  const renderDogDetail = (dog) => {
    const name = detailDiv.querySelector('#name')
    const image = detailDiv.querySelector('#image')
    const calories = detailDiv.querySelector('#calories')
    name.innerHTML = dog.name
    image.setAttribute('src', dog.image)
    calories.innerHTML = dog.calories
  }
  const clickHandler = () => {
    document.addEventListener('click', (e) => {
      let data = e.target
      if(data.matches('#character-bar span')){
        let dogId = data.dataset.id
        fetchDog(dogId)
      }
    })
  }

  fetchDogs();
  clickHandler();


})
