//Constantes pour connecter les objets du DOM
const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("settings-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");


// Initialisations [mot, score, temps, dificulte "par defaut intermediaire"]
let randomWord;
let score = 0;
let time = 10;
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";


// Definir une valeur de diculte
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "medium";

// Focus sur le champs de saisi
text.focus();

// Constante pour les decomptes
const timeInterval = setInterval(updateTime, 1000);

// Generer une valeur aleatoire du tableau des mots
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// Rendre la valeur genere visible
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

// Mettre a jour le score
function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

// Mettre a jour le temps
function updateTime() {
  time--;
  timeEl.innerHTML = time + " s";

  if (time === 0) {
    clearInterval(timeInterval);
    // fin de la partie
    gameOver();
  }
}

// Fin de partie, bloc de fin de partie
function gameOver() {
  endgameEl.innerHTML = `
    <h1>FIN DE LA PARTIE</h1>
    <p>Votre score est : ${score}</p>
    <button onclick="location.reload()">Nouvelle partie</button>
  `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Ecoute des evenement [saisi, ]

// Saisi
text.addEventListener("input", (e) => {
  //recuperation de la valeur saissi
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // effaccer
    e.target.value = "";


    if (difficulty === "hard") {
      time += 2;
    } else if (difficulty === "medium") {
      time += 3;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Gestion du choix de niveau
settingsBtn.addEventListener("click", () => settings.classList.toggle("hide"));

// Stockage du niveau
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
});
