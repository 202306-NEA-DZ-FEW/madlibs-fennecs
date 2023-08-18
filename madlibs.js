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
  console.log(processedStory);

  processedStory.map(item => {
    //console.log(item)
    const span_1 = document.createElement('span')
    const span_2 = document.createElement('span')
    const input = document.createElement('input')
    const mark = document.createElement('mark')
    mark.innerText = item.word

    input.type = "text";
    input.maxLength = 20;

    if (item.hasOwnProperty('pos')) {
      input.placeholder = `${item.word} ${[item.pos]}`
      input.addEventListener("input", () => {

        input.value ? mark.innerText = input.value : mark.innerText = item.word
      })
      madLibsEdit.appendChild(input)
      madLibsPreview.appendChild(mark)
    } else {

      span_1.innerText = item.word + ' '
      span_2.innerText = item.word + ' '
      madLibsEdit.appendChild(span_1)
      madLibsPreview.appendChild(span_2)

    }

  })


});
