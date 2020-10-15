document.addEventListener("DOMContentLoaded", e => {
    const baseUrl = "http://localhost:3000/characters/"
    
    const getCharacters = () => {
        fetch(baseUrl)
        .then(res => res.json())
        .then(char => renderCharacters(char))
    };

    const renderCharacters = characters => {
        for (let character of characters){
            renderCharacter(character)
        }
    };
    
    const renderCharacter = character => {
        const nameDiv = document.querySelector("#character-bar")
        const nameSpan = document.createElement("span")
        nameSpan.dataset.characterId = character.id
        nameSpan.classList.add("character-name")

        nameSpan.textContent = `${character.name}`

        nameDiv.append(nameSpan)   
    };

    const clickHandler = () => {
        document.addEventListener("click", e => {
            if (e.target.matches(".character-name")){
                const span = e.target
                const characterId = span.dataset.characterId
                const infoDIv = document.querySelector("#detailed-info")
                console.log(infoDIv)
                console.log(characterId)
            }
        })
    };

    getCharacters();
    clickHandler();
});