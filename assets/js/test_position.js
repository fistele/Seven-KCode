const sounds = {
    "background": document.getElementById("sounds-background"),
    "explosion": document.getElementById("sounds-explosion"),
    "wow": document.getElementById("sounds-wow"),
    "show": document.getElementById("sounds-show"),
    "failedword": document.getElementById("sounds-failedword"),
}

const list_of_word = {
    science: [
        "science", "bras", "muscle", "roche", "plante", "cellule", "adn", "lipide", "hormone", "vie"
    ],
    informatique: [
        "informatique", "clavier", "souris", "ram", "rom", "casque", "moniteur", "proceseur", "reseau", "hdmi"
    ],
    musique: [
        "musique", "artiste", "micro", "chansson", "clip", "audio", "mp3", "mp4", "dvd", "vcd"
    ],
};

let words = list_of_word.science;

let current_speed = 100;
let apparition_speed = 7;

const screen_words = [];
const screen_words_div = {};
const user_score = document.getElementById('user-score');
const user_loose = document.getElementById('user-loose');
const input_word = document.getElementById('word');
const girl_image = document.querySelector('.pending-img');

function generateNewWord() {

    const word = words[Math.floor(Math.random() * words.length)];
    createWord(word);
}

function getQueryParams() {

    return params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
}

function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));
}

if (input_word) {
    input_word.addEventListener("input", (e) => {

        // recuperation de la valeur saissi
        const insertedText = e.target.value;
        if (screen_words.includes(insertedText)) {
            
            const div = screen_words_div[insertedText];
            div.dataset.disabled = true;
            div.parentNode.removeChild(div);
            sounds.wow.play();

            user_score.innerText = parseInt(user_score.innerText) + 1;
            e.target.value = "";
            current_speed--;

            // Added success animation
            girl_image.classList.add('success');
            setTimeout(() => {
                girl_image.classList.remove('success');
            }, 500);

            // Geneate new word
            generateNewWord();
        }
    });
}

function getLocalStream() {
    navigator.mediaDevices.getUserMedia({video: false, audio: true}).then( stream => {
        window.localStream = stream;
        // window.localAudio.srcObject = stream;
        // window.localAudio.autoplay = true;
        sounds.background.play();
    }).catch( err => {

        console.log(err);
    });
}

function createWord(word) {

    const word_lenght = word.length
    const id = parseInt(Math.random() * 1000) + 'bullet';
    const div = document.createElement('div');
    const playground = document.getElementById('playground');
    let div_left_margin = ((Math.random() * 1000) + 250);

    if (word_lenght > 7) {

        div.style.width = "200px";
        div.style.height = "200px";
        div.style.lineHeight = "200px";
    } else {

        div.style.width = "100px";10
    }

    div.id = id;
    div.classList.add('wordDiv');
    div.style.backgroundImage = "url(/assets/images/bulle.png)";
    div.dataset.disabled = false;
    let div_width = div.style.width;
    let int_div_width = parseInt(div_width.substring(0, div_width.length - 2));

    if ((div_left_margin + int_div_width) >= playground.clientWidth) {

        div_left_margin = div_left_margin - (div_left_margin - playground.clientWidth + int_div_width) - 10;
    }

    div.style.left = div_left_margin + 'px';
    div.innerHTML = '<p>' + word + '</p>';
    playground.appendChild(div);
    screen_words.push(word);
    screen_words_div[word] = div;
    sounds.show.play();
    moveDiv(div, word);
}

function moveDiv(element, word) {
    let id = null;
    // const element = document.getElementById(identifiant);
    let position = 0;
    clearInterval(id);
    id = setInterval(frame, current_speed);

    function frame() {

        const playground = document.getElementById('playground');
        let element_width = element.style.width;
        let int_element_width = parseInt(element_width.substring(0, element_width.length - 2));
        const warning_50 = parseInt((playground.clientHeight / 2) - int_element_width - 100);
        const warning_80 = parseInt((playground.clientHeight - ((playground.clientHeight * 20) / 100)) - int_element_width - 100);
        const warning_100 = parseInt(playground.clientHeight - int_element_width - 100);

        if (position == warning_100) {

            clearInterval(id);
            // element.style.top = '0px';

            console.log(element.style.display);

            if (element.dataset.disabled === 'false') {
                
                sounds.failedword.play();
            }
            element.style.display = 'none';
            element.style.backgroundImage = "url(/assets/images/bulle.png)";
            if (screen_words.includes(word)) {

                for (let i = 0; i < screen_words.length; i++) {

                    if (screen_words[i] === word) {
                        
                        screen_words.splice(i, 1);
                        delete screen_words_div[word];
                    }
                }
            }

            // Loose score
            user_loose.innerText = parseInt(user_loose.innerText) + 1;

            // Clear input
            input_word.value = "";
        } else {

            if (position == warning_50) {

                element.style.backgroundImage = "url(/assets/images/bulle_orange.png)"
            }

            if (position == warning_80) {

                element.style.backgroundImage = "url(/assets/images/bulle_rouge.png)";
            }

            position++;
            element.style.top = position + "px";
        }
    }
}

window.onload = async () => {

    input_word.focus();
    getLocalStream();

    const params = getQueryParams();
    if (params.name && params.categorie) {

        words = list_of_word[params.categorie];
        document.getElementById("user-pseudo").innerText = params.name;
        document.getElementById("user-categorie").innerText = params.categorie;

        // Geneate new Word
        setInterval(() => {
            generateNewWord();
        }, apparition_speed * 1000);
    } else {

        window.location.href = "/";
    }
};
