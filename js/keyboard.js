const TERM = 300;
const rows = document.querySelectorAll(".row");
const totalCells = document.querySelectorAll(".cell");
const keyboard = document.querySelector(".keyboard");
const keys = keyboard.querySelectorAll(".key");

let turn = 0;
let cells = rows[0].querySelectorAll(".cell");
let txt = "";


function submit() {
    if (txt.length < 5) {
        alert("입력한 단어가 5자 미만입니다.");
    } else {
        // console.log("submit: turn " + (turn+1));
        checkAnswer();
        checkFinish();
    }
}

function del() {
    // console.log("delete");
    if (txt.length > 0) {
        // update current text
        txt = txt.slice(0, txt.length-1);

        // update board
        const cell = cells[txt.length];
        cell.querySelector("div").textContent = "";
        cell.classList.remove("occupied");
    }
    // console.log(txt);
}

function write(ch) {
    if(txt.length >= 5) {
        alert("입력한 단어가 5자를 초과하였습니다.");
    } else {
        // update current text
        txt += ch;
        // console.log(txt);

        // update board
        const cell = cells[txt.length-1];
        cell.querySelector("div").textContent = ch;
        cell.classList.add("occupied");
    }
}

function checkAnswer() {
    for(let i = 0; i < 5; i++) {
        const cell = cells[i];
        const key = keyboard.querySelector("#" + txt[i]);

        if(txt[i] === answer[i]) {
            // strike
            setTimeout(function(){updateColor(cell, ["strike", "animate"]);}, TERM*i);
            setTimeout(function(){updateColor(key, ["strike"]);}, TERM*i);
        } else if (answer.indexOf(txt[i]) > -1) {
            // ball
            setTimeout(function(){updateColor(cell, ["ball", "animate"]);}, TERM*i);
            setTimeout(function(){updateColor(key, ["ball"]);}, TERM*i);
        } else {
            // wrong
            setTimeout(function(){updateColor(cell, ["wrong", "animate"]);}, TERM*i);
            setTimeout(function(){updateColor(key, ["wrong"]);}, TERM*i);
        }
    }
}

function checkFinish(){
    // 게임 종료 여부 확인
    if (txt === answer) {
        // 정답을 맞춘 경우
        setTimeout(function(){
            alert("YOU WIN!!!");
            reset();
        }, 1800);
    } else if (turn >= 5) {
        // 기회를 모두 사용한 경우
        setTimeout(function(){
            alert("YOU LOSE...\nANSWER : " + answer);
            reset();
        }, 1800);
    } else {
        // 다음 시도
        turn += 1;
        txt = "";
        cells = rows[turn].querySelectorAll(".cell");
    }
}

function updateColor(target, className) {
    target.classList.add(...className);
}

function reset() {
    setAnswer();
    turn = 0;
    cells = rows[0].querySelectorAll(".cell");
    txt = "";

    for(let i = 0; i < totalCells.length; i++) {
        totalCells[i].classList.remove("occupied", "strike", "ball", "wrong", "animate");
        totalCells[i].querySelector("div").textContent = "";
    }

    for(let i = 0; i < keys.length; i++) {
        keys[i].classList.remove("strike", "ball", "wrong");
    }
}


// 마우스 클릭
function handleClick(event) {
    const key = event.target;
    const id = key.id;

    if (id === "enter") {
        submit();
    } else if (id === "del") {
        del();
    } else {
        write(id);
    }
}
keys.forEach(function(key){
    key.addEventListener("click", handleClick);
});

// 키보드 입력
function handleKeyboard(event) {
    // console.log(event.key);

    if (event.key === "Enter") {
        submit();
    } else if (event.key === "Backspace") {
        del();
    } else if (event.key.length === 1 && event.key >= "A" && event.key <= "z") {
        write(event.key.toUpperCase());
    }
}
window.addEventListener("keydown", handleKeyboard);

setAnswer();
console.log(answer);

