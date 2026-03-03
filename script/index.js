console.log("index.js connected");

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //todo promise of response
    .then((res) => res.json()) //todo promise of json data
    .then((json) => displayLesson(json.data));
};
loadLesson();
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const loadWordDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayWordDetails(details.data);
};
const displayWordDetails = (words) => {
  // console.log(words);
  const wordModal = document.getElementById("word_modal");
  const detailsBox = document.getElementById("word-details");
  const Synonyms = document.getElementById("Synonyms");
  const SynonymsWords = words.synonyms;
  console.log(SynonymsWords);
  detailsBox.innerHTML = `
            <h3 class="font-bangla text-2xl font-bold">
              ${words.word} (<i class="fa-solid fa-microphone-lines"></i>:${words.pronunciation})
            </h3>
            <div>
            <h4 class="font-bold mb-3">Meaning</h4>
            <p class="font-bangla ">${words.meaning}</p>
            </div>
            <div>
            <h4 class="font-bold mb-3">Example</h4>
            <p class="">${words.sentence}</p>
            </div>
            <div>
            <h4 class="font-bold mb-3">সমার্থক শব্দ গুলো</h4>
            <div>${createElement(SynonymsWords)}</div>
            </div>
  `;

  wordModal.showModal();
};
const manageSpinner = (status) => {
  if (status) {
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("wordContainer").classList.add("hidden");
  } else {
    document.getElementById("wordContainer").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};
const loadLevelWord = (id) => {
  manageSpinner(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url) //todo promise of response
    .then((res) => res.json()) //todo promise of json data
    .then((json) => {
      activeRemove();
      const activeBtn = document.getElementById(`lesson-btn-${id}`);
      activeBtn.classList.add("active");
      // console.log(activeBtn);
      displayWord(json.data);
    });
};
const activeRemove = () => {
  const lessonButtons = document.querySelectorAll(".lesson-btn");
  // console.log(lessonButtons);
  lessonButtons.forEach((btn) => btn.classList.remove("active"));
};
const createElement = (arr) => {
  // console.log(arr);
  const htmlElement = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlElement.join(" ");
};
const displayWord = (words) => {
  //   console.log(word);
  //todo   1. get the container & empty
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";
  if (words.length === 0) {
    wordContainer.innerHTML = `
        <div class="col-span-full text-center font-bangla space-y-5 my-10">
            <div class="flex justify-center">
              <img src="./assets/alert-error.png" alt="" />
            </div>
            <p class="text-xl text-[#79716B] font-medium">
              এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
            </p>
            <h2 class="text-4xl font-semibold">নেক্সট Lesson এ যান</h2>
          </div>
     `;
    manageSpinner(false);
    return;
  }
  //todo   2. get into evey lessons
  for (let word of words) {
    //todo         3. create Element
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                 <div class="card bg-base-100 card-xs shadow-sm  p-2">
            <div class="card-body text-center space-y-3 my-auto">
             <div class="space-y-3 pt-8"> <h2 class="text-3xl font-bold">${word.word ? word.word : "Word Not Found!"}</h2>
              <p class="text-xl font-semibold">Meaning /Pronounciation</p>
              <p class="font-bangla text-[#18181B] text-2xl font-semibold">
                "${word.meaning ? word.meaning : "Meaning Not Found!"}/${word.pronunciation ? word.pronunciation : "Pronunciation Not Found!"}"
              </p></div>
              <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn btn-md bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <button onclick="pronounceWord('${word.word}')" class="btn btn-md bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
            </div>
          </div>
    `;

    //todo        4. append into container

    wordContainer.append(btnDiv);
  }
  manageSpinner(false);
};
const displayLesson = (lessons) => {
  //todo   1. get the container & empty
  const levelContainer = document.getElementById("level-container");
  levelContainer.innerHTML = "";

  //todo   2. get into evey lessons
  for (let lesson of lessons) {
    //todo         3. create Element
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                 <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn">
                 <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                  </button>
    `;

    //todo        4. append into container

    levelContainer.append(btnDiv);
  }
};

document.getElementById("btn-Search").addEventListener("click", function () {
  activeRemove();
  const input = document.getElementById("input-Search");
  const searchValue = input.value.trim().toLowerCase();
  // console.log(searchValue);

  fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((words) => {
      const allWords = words.data;
      console.log(allWords);
      const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue),
      );
      displayWord(filterWords);
    });
});
