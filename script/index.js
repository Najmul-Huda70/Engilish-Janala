console.log("index.js connected");

const loadLesson = () => {
  fetch("https://openapi.programming-hero.com/api/levels/all") //todo promise of response
    .then((res) => res.json()) //todo promise of json data
    .then((json) => displayLesson(json.data));
};
loadLesson();
const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url) //todo promise of response
    .then((res) => res.json()) //todo promise of json data
    .then((json) => displayWord(json.data));
};
const displayWord = (words) => {
  //   console.log(word);
  //todo   1. get the container & empty
  const wordContainer = document.getElementById("wordContainer");
  wordContainer.innerHTML = "";

  //todo   2. get into evey lessons
  for (let word of words) {
    //todo         3. create Element
    // console.log(lesson);
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `
                 <div class="card bg-base-100 card-xs shadow-sm">
            <div class="card-body text-center">
              <h2 class="text-2xl font-bold">${word.word}</h2>
              <p class="font-semibold">Meaning /Pronounciation</p>
              <div class="font-bangla text-[#18181B] text-base font-semibold">
                "${word.meaning}/${word.pronunciation}"
              </div>
              <div class="flex justify-between items-center">
                <button class="btn btn-xs bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                  <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn btn-xs bg-[#1A91FF10] hover:bg-[#1A91FF80]">
                  <i class="fa-solid fa-volume-high"></i>
                </button>
              </div>
            </div>
          </div>
    `;

    //todo        4. append into container

    wordContainer.append(btnDiv);
  }
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
