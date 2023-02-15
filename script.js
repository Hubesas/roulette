"use strict";
const gameTable = document.querySelector(`.table`);
const playButton = document.querySelector(`button`);
const betAmount = document.querySelector(`input[placeholder="bet mount"]`);
const gameMoney = document.querySelector(`.money`);
const rolledNumber = document.querySelector(`h2`);
const rolledColor = document.querySelector(`h3`);
const red = document.querySelector(`.redBox`);
const black = document.querySelector(`.blackbox`);
red.onclick = () => {
    black.style.border = `none`;
    red.style.border = `2px solid`;
    choosenColor = `red`;
};
black.onclick = () => {
    black.style.border = `2px solid `;
    red.style.border = `none`;
    choosenColor = `black`;
};
let money = 1000;
let boxNumber = 1;
let triger = false;
let choosenNumber = 0;
let winningNumber = 0;
let betmount = 0;
let choosenColor = ``;
const winningColorArr = [`red`, `black`];
let winningColorIndex = 0;
appendBox();
function appendBox() {
    gameTable.innerHTML = ``;
    for (let i = 0; i < 16; i++) {
        gameTable.innerHTML += `
     <div class="blackbox click text-center">${boxNumber++}</div>
        <div class="redBox click text-center">${boxNumber++}</div>
    `;
    }
    boxNumber = 1;
    const box = document.querySelectorAll(`.click`);
    box.forEach(btn => {
        btn.onclick = (event) => {
            console.log(event);
            choosenNumber = Number(event.target.firstChild.data);
            event.target.style.border = `2px solid`;
        };
    });
}
playButton.addEventListener(`click`, function () {
    betmount = Number(betAmount.value);
    winningNumber = Math.floor(Math.random() * 32);
    winningColorIndex = Math.floor(Math.random() * winningColorArr.length);
    if (money <= 0 || betmount === 0)
        return;
    if (choosenNumber === winningNumber) {
        money = money + betmount * 32;
        gameMoney.innerText = `Money: ${money}`;
        rolledNumber.innerText = `Rolled number: ${winningNumber}`;
    }
    else {
        money = money - betmount;
        gameMoney.innerText = `Money: ${money}`;
        rolledNumber.innerText = `Rolled number: ${winningNumber}`;
    }
    if (choosenColor === winningColorArr[winningColorIndex]) {
        money = money + betmount * 2;
        gameMoney.innerText = `Money: ${money}`;
        rolledColor.innerText = `Rolled color: ${winningColorArr[winningColorIndex]}`;
    }
    else {
        gameMoney.innerText = `Money: ${money}`;
        money = money - betmount;
        rolledColor.innerText = `Rolled color: ${winningColorArr[winningColorIndex]}`;
    }
    appendBox();
    black.style.border = `none`;
    red.style.border = `none`;
    choosenColor = ``;
});
