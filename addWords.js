const { email, password } = require("./config.json");
const lingualeoApi = require("./lib/lingualeo");

console.log(`Test runner will use credentials: ${email} : ${password}`);

let words = [
  // put words here
  "section"
];

async function addWords() {
  await lingualeoApi.login(email, password);

  words.forEach(word => {
    lingualeoApi
      .getTranslates(word)
      .then(data => {
        console.log(
          `Translates for ${word}`,
          JSON.stringify(data.map(t => t.value))
        );
        return data;
      })
      .then(list => lingualeoApi.addWord(word, list[0].value))
      .then(data => console.log("addWord", JSON.stringify(data.text)))
      .catch(err => console.error("Error", err));
  });
}

addWords();
