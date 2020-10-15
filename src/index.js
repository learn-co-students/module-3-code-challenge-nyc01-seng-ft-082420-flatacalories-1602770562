document.addEventListener('DOMContentLoaded', () => {
    const baseURL = "http://localhost:3000/"
    const charsURL = "http://localhost:3000/characters"
    const charBar = document.querySelector('#character-bar')
    console.log("domloaded")

    const getChars = () => {
        fetch(charsURL) 
        .then(resp => resp.json())
        .then(chars => renderChars(chars))
        
    }

    const renderChars = chars => {
        chars.forEach(char => renderChar(char))
        
    }

    const renderChar = char => {
        const charSpan = document.createElement('span')
        charSpan.innerHTML = `${char.name}`
        const charName = document.querySelector('#name')
        
        charBar.append(charSpan)
        

        
    }

    const clickHandler = () => {
        charBar.addEventListener('click', e => {
            const charSpan = e.target.innerHTML
            const char = charSpan.parentElement
            console.log(char)
            const charName = document.querySelector('#name')
            charName.innerHTML = `${charSpan}`
            
            
        })

    }



    
    getChars()
    clickHandler()
})