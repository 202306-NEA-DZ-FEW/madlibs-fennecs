/* *
 * Complete the implementation of parseStory.
 * 
 * parseStory retrieves the story as a single string from story.txt
 * (I have written this part for you).
 * 
 * In your code, you are required (please read this carefully):
 * - to return a list of objects
 * - each object should definitely have a field, `word`
 * - each object should maybe have a field, `pos` (part of speech)
 * 
 * So for example, the return value of this for the example story.txt
 * will be an object that looks like so (note the comma! periods should
 * be handled in the same way).
 * 
 * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
 * Output: [
 *  { word: "Louis", pos: "noun" },
 *  { word: "went", pos: "verb", },
 *  { word: "to", },
 *  { word: "the", },
 *  { word: "store", pos: "noun" }
 *  { word: "," }
 *  ....
 * 
 * There are multiple ways to do this, but you may want to use regular expressions.
 * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/ */



/**
 * A function that retrieves the story from story.txt and return an array of objects
 * @param {String}  rawStory: string 
 * @returns {Array<Objetc>} wordsObjetct: Array of objetcs
 */
function parseStory(rawStory) {
  /* *
   * An Object to maps part of speech codes to their corresponding labels
   */
  const partOfSpeech = {
    n: "[noun]",
    v: "[verb]",
    a: "[adjectif]",
    ad: "[adverb]",

  }

  /**
   * Regex matches words with part of speech codes (e.g., "word[pos]") 
   * Or just words
   * 
   */
  const matchWordsRegex = /\w+\[[anvad]+\]|[.,]|\w+/g


  /**
   * Regex to match the format "word[pos]" 
   * And captures both the word and the part of speech code.
   */
  const matchPosRegex = /(\w+)\[([anvad]+)\]/

  return rawStory.match(matchWordsRegex)
    .map(word => {

      /**
       * Get pos match : word[pos] 
       * And captures both the word and the part of speech code. 
       */
      const match = word.match(matchPosRegex)

      /**
       * create wordsObjetct objetc 
       * Set word field to the extracted word match[1] if there is one
       * Or else simply set it to word 
       */
      const wordsObjetct = { word: match ? match[1] : word }


      /**
       * Checks if a match exists 
       * and if the extracted part of speech code (match[2]) 
       * has a corresponding entry in the partOfSpeech {a,v,n}
       * if so we set pos field to partOfSpeech[match[2]] .
       */
      if (match && partOfSpeech[match[2]]) {
        wordsObjetct.pos = partOfSpeech[match[2]];
      }

      return wordsObjetct;
    })

}
let madLibsEdit = document.querySelector(".madLibsEdit")
let madLibsPreview = document.querySelector(".madLibsPreview")


/**
 * All your other JavaScript code goes here, inside the function. Don't worry about
 * the `then` and `async` syntax for now.
 * 
 * You'll want to use the results of parseStory() to display the story on the page.
 */
getRawStory().then(parseStory).then((processedStory) => {
  processedStory.map(item => {
    //console.log(item)
    const span_1 = document.createElement('span')
    const span_2 = document.createElement('span')
    const input = document.createElement('input')
    const mark = document.createElement('mark')
    mark.innerText = item.word
    mark.setAttribute('data_default', item.word)

    input.type = "text";
    input.maxLength = 20;
    input.classList.add("input"); // Adding the "input" class to the input element

    if (item.hasOwnProperty('pos')) {
      input.placeholder = item.pos
      input.addEventListener("input", () => {

        input.value ? mark.innerText = input.value : mark.innerText = item.word
      })


      madLibsEdit.appendChild(input)
      madLibsPreview.appendChild(mark)

      // Implement hotkey feature on enter key 
      const inputs = document.querySelectorAll(".input");
      inputs.forEach((input, index) => {
        input.addEventListener("keydown", (event) => {
          if (event.key === "Enter") { // If the pressed key is "Enter"
            event.preventDefault(); // Prevent the default behavior of the "Enter" key
            const nextIndex = index + 1;
            if (nextIndex < inputs.length) {
              inputs[nextIndex].focus(); // Set focus to the next input field
            }
          }
        });
      });
    } else {

      span_1.innerText = item.word + ' '
      span_2.innerText = item.word + ' '
      madLibsEdit.appendChild(span_1)
      madLibsPreview.appendChild(span_2)

    }

  })


  // Manage theme fonctionality (Dark mode ,Ligth mode)
  let theme_button = document.querySelector("#themeIcon")
  theme_button.innerHTML = '<span class="darkBtn">Light Mode </span><img src="./assets/sun.png" title="light!">';

  let h1 = document.getElementById('heading')
  let body = document.querySelector('body')
  let isLightmode = false  // by default the dark mode is on 
  theme_button.addEventListener("click", () => {

    if (isLightmode) {
      //dark mode codes lies here
      theme_button.innerHTML = '<span class="darkBtn">Light Mode </span><img src="./assets/sun.png" title="light!">';
      body.classList.remove('body_light');
      isLightmode = !isLightmode;
      madLibsEdit.classList.remove('madlibs_dark')
      madLibsPreview.classList.add('madlibs_dark')

    } else {
      //light mode codes lies here

      theme_button.innerHTML = '<span class="lightBtn">Dark Mode </span><img src="./assets/moon.png" title="Darkness consumes!">'; // change icon
      body.classList.add('body_light');
      madLibsEdit.classList.add('madlibs_dark')
      madLibsPreview.classList.remove('madlibs_dark')
      /**add the rest changes */

      isLightmode = !isLightmode;

    }


    // const materialIcon = document.createElement('i');

    // if(theme_button.firstElementChild.innerText ==="brightness_4"){
    //   theme_button.firstElementChild.innerText="dark_mode"

    // }else{
    //   theme_button.firstElementChild.innerText="brightness_4"
    // }


  })



  // reset button fonctionality
  const reset = document.querySelector('#reset')
  //#endregion

  reset.addEventListener("click", () => {
    const all_input = document.querySelectorAll('input')
    const all_mark = document.querySelectorAll('mark')
    all_input.forEach(item => {
      item.value = ''
    })
    all_mark.forEach(item => {
      item.innerText = item.getAttribute('data_default')
    })
  })

  /*Adding Sound functionality*/

  /*The DOMContentLoaded event fires when the DOM content is loaded,
   without waiting for images and stylesheets to finish loading.*/


  document.addEventListener("DOMContentLoaded", () => {
    const soundButton = document.getElementById("soundButton");
    const sound = document.getElementById("sound");

    let isPlaying = false; //by default the sound is off

    soundButton.addEventListener("click", function () {
      if (isPlaying) {
        sound.pause();
        sound.currentTime = 0; // plays from the begining 
        isPlaying = false;
        soundButton.innerHTML = '<img src="./assets/sound.png" title="Play Sound">'; // change icon
      } else {
        sound.play();
        isPlaying = true;
        soundButton.innerHTML = '<img src="./assets/sleep.png" title="Pause Sound">';
      }
    });

    /* I added an event listner so that the translation scripts only activates when button is clicked */

    translateButton = document.getElementById("google_translate_element")
    translateButton.addEventListener("click", googleTranslateElementInit)
    function googleTranslateElementInit() {
      new google.translate.TranslateElement(
        { pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE },
        'google_translate_element'
      );
    }

    const script = document.createElement('script');
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.head.appendChild(script);


  });


});

const downloadButton = document.getElementById('download');
// const contentToDownload = document.getElementsByClassName('madLibsPreview');

downloadButton.addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();
  const Children_element = madLibsPreview.children
  const innerTextArray = [];
  let count=0
  for (const childElement of Children_element) {
  if(count===5){
    innerTextArray.push("\n")
    innerTextArray.push(childElement.innerText)
    count=0
  }else{
    innerTextArray.push(childElement.innerText);
    count++
  }
  
  }
  const text=innerTextArray.reduce((total,val)=>{
    return total.concat(" ", val)
  }," ")
  pdf.setFontSize(12);
  pdf.setFont("courier");
  pdf.text(text,100 ,20, 'center')
  pdf.save('madlib_story.pdf')
  alert("your story download successfuly")
});




