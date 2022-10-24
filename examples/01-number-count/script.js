import { display } from "../../src/js/render.js";

const appContainer = document.getElementById("timer");

let count = 0, nums = []

setInterval(() => {
    
    setTimeout(() => {
        
        nums.forEach(n => appContainer.appendChild(display(n)))

        ++count;

    }, 500);

    nums = String(count).split('').map(x => Number(x))

    appContainer.innerHTML = ""

}, 500);
