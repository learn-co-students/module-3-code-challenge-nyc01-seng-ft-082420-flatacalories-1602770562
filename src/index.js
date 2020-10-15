document.addEventListener('DOMContentLoaded', () => {
    const baseUrl = 'http://localhost:3000/characters'
    const charDiv = document.getElementById('character-bar')

    const getCharacters = () => {
        fetch(baseUrl)
        .then(resp => resp.json())
        //.then(characters => console.log(characters));
        .then(characters => renderChars(characters));
    }

    const renderChars = (characters) => {
        for(const character of characters){
            //console.log(character)
            addCharToDom(character)
        }
    }

    const addCharToDom = (character) => {
        const charSpan = document.createElement('span')
        charSpan.dataset.id = character.id
        charSpan.innerHTML = `
        ${character.name}
        `
        charDiv.appendChild(charSpan)
    }

    const selectCharacter = (character) => {
        const charSpan = document.querySelector('span')
        const charInfoDiv = document.getElementById('detailed-info')
        

        document.addEventListener('click', e => {
        if (e.target.textContent = character){
            charInfoDiv.dataset.id = charSpan.dataset.id
        }
        charInfoDiv.append(charSpan)
        })
    }

    //     const populateDetailInfo = (character) => {
    //         const charSpan = document.querySelector('span')
    //         const charInfoDiv = document.getElementById('#detailed-info')
    //     //    const imageId = document.getElementById('image')
    //     //     .characterInfo
        
        //     if (charInfoDiv.dataset.id = charSpan.dataset.id){

        //     const options = {
        //         method: "POST",
        //         headers: {
        //             "content-type": "application/json",
        //             "accept": "application/json"
        //         },
        //         body: JSON.stringify(character)
        //     }
        // }

    //     fetch(baseUrl + charSpan, options)
    //     .then(resp => resp.json())
    //     .then(_characters => {
    //         getCharacters()
    //     })
    // }
        
    getCharacters()
    selectCharacter()
   // populateDetailInfo()
})