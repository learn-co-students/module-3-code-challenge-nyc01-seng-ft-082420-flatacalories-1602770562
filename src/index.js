document.addEventListener('DOMContentLoaded', e => {

 const baseUrl = "http://localhost:3000/characters/"
 const characterBar = document.querySelector('#character-bar')


 const fetchCharacters = () => {
     fetch(baseUrl)
     .then(resp => resp.json())
     .then(chars => addChars(chars))
 }

 const addChars = (chars) => {
     for(const char of chars){
         addCharsToDom(char)
     }
 }

 const addCharsToDom = (char) => {
     const charSpan = document.createElement('span')
     charSpan.dataset.id = char.id
     charSpan.classList.add('char')
     charSpan.innerText = `${char.name}`
     console.log(charSpan)

     characterBar.append(charSpan)
 }

 const clickHandler = () => {
    document.addEventListener('click', e => {
        if(e.target.matches('.char')){
            const button = e.target
            const charId = button.dataset.id
            console.log(charId)
        }
    })

 }


 clickHandler();
 fetchCharacters();










})