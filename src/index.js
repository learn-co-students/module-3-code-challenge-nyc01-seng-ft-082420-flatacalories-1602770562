document.addEventListener('DOMContentLoaded', e => {
    const baseUrl = "http://localhost:3000/characters/"

    const charBar = document.querySelector('#character-bar')

    const renderCharactersBar = characters => {
        for (const char of characters) {
            renderCharSpan(char)
        }
    }

    const renderCharSpan = char => {
        let charSpan = document.createElement('span')
        charSpan.innerText = `${char.name}`
        charSpan.dataset.id = char.id
        charSpan.classList.add('char-btn')
        charBar.append(charSpan)
    }

    const renderCharPage = char => {
        const charPage = document.querySelector('#detailed-info')
        const nameP = charPage.querySelector('#name')
        const img = charPage.querySelector('#image')
        const caloriesSpan = charPage.querySelector('#calories')
        nameP.innerText = `${char.name}`
        img.src = `${char.image}`
        caloriesSpan.innerText = `${char.calories}`
        const calForm = charPage.querySelector('#calories-form')
        calForm.reset()
        calForm.querySelector('#characterId').value = `${char.id}`
    }

    const getCharacters = () => {
        fetch(baseUrl)
        .then(response => response.json())
        .then(characters => renderCharactersBar(characters))
    }

    const getSingleCharacter = charId => {
        fetch(baseUrl + charId)
        .then(response => response.json())
        .then(char => renderCharPage(char))
    }


    const clickHandler = () => {
        document.addEventListener('click', e => {
            if (e.target.matches('.char-btn')) {
                const charBtn = e.target
                const charId = charBtn.dataset.id
                getSingleCharacter(charId)
            }else if (e.target.matches('.reset-btn')) {
                //would add reset function


            }
        })
    }

    const submitHandler = () => {
        document.addEventListener('submit', e => {
            e.preventDefault()
            const calForm = e.target
            const id = calForm.characterId.value
            const addCalories = calForm.calories.value
            const charPage = document.querySelector('#detailed-info')
            const caloriesSpan = charPage.querySelector('#calories')
            const oldCalories = caloriesSpan.innerText
            const totalCalories = parseInt(addCalories, 10) + parseInt(oldCalories, 10)
            const calories = {calories: `${totalCalories}`}

            const options = {
                method: "PATCH", 
                headers: {
                    "content-type": "application/json",
                    "accept": "application/json"
                }, 
                body: JSON.stringify(calories)
            }

            fetch(baseUrl + id, options)
            .then(response => response.json())
            .then(_char => getSingleCharacter(id))
        })
    }




    getCharacters()
    clickHandler()
    submitHandler()
})



/*
*get data from server
*add span tag with name to character bar


*click character to see all info in #detailed-info div

*add calories button adds calories to character

reset calories: clickHandler
maybe refactor a calories function for both adding and resetting calories
*/