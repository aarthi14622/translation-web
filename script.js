// Discussion
/* 

ul ==> Div
li ===> div

h -> API -< data
" " -> "h " -> ["h", ""]

*/

 
const textarea = document.getElementById('textArea');
const listContainer = document.getElementById('tamilList') 

async function checkEmptyTextArea(value){
    if(!value.length) { //value.length === 0
        document.getElementById('tamilList').removeChild(document.getElementById('tamilList').getElementsByTagName('li')[0]);
    }
} 

/* 
Duck Debugging 

"jenish enbavan"
arrayOfWords  = ["jenish", "enbavan"]


h -> API <- Data
" " -> !API -> Data[-1] = value
**/

function handleSpacePress(){

}

// 1 - bool
// j- je
// textArea = "J "
// exactTamilWord = undefined

let exactTamilWord;

textarea.addEventListener( 'input' , async (e) => {
    console.log("check key",e)
    const userInput = textarea.value
    const arrayOfWords = userInput.split(" ")    
    // Spacebar press
    if(e.data === " "){
        // second space bar
        if(arrayOfWords[0].length){ // ["h","i", ""]
            arrayOfWords[arrayOfWords.length-2] = exactTamilWord
            textarea.value = arrayOfWords.join(" ")
        }
    }  
    else{
        const wordToTranslate = arrayOfWords[arrayOfWords.length - 1]

        await checkEmptyTextArea(textarea.value)

        fetch(`https://inputtools.google.com/request?text=${wordToTranslate}&itc=ta-t-i0-und&num=13&cp=0&cs=0&ie=utf-8&oe=utf-8&app=demopage\n`)
        .then( res => res.json())
        .then (data => {
            console.log(data)
            const tamilWords = data[1][0][1]
            exactTamilWord = tamilWords[0]
            console.log("SETTTT", exactTamilWord)
        
            
            const output = document.createElement('div')

            tamilWords.map(async (word, index) => {
                console.log(word);
                const buttonElement = document.createElement("button")
                buttonElement.innerText = word
                buttonElement.id = index
                buttonElement.onclick = function setTamilWord(e){
                    const tamilWord = e.target.innerText 
                    arrayOfWords[arrayOfWords.length-1] = tamilWord
                    textarea.value = arrayOfWords.join(" ")
                }
                output.appendChild(buttonElement)
            })
            
            console.log(output)
            listContainer.appendChild(output)
            
            console.log(document.getElementById('tamilList').getElementsByTagName('li')[0]);
            
            if(document.getElementById('tamilList').getElementsByTagName('div').length > 1) {
                document.getElementById('tamilList').removeChild(document.getElementById('tamilList').getElementsByTagName('div')[0]);
            }
            
            
        })
        
        .catch( err => {
            console.log(err)
        })
    }
})
 
            
 


   





