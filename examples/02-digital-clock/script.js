import render from "../../src/js/render.js";

let domRef = {
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds"),
};

const hasOwn = Object.hasOwnProperty;

const timeStr = t => `${t < 10 ? 0 : ""}${t}`;

let store = {
    hours: 0,
    minutes: 0,
    seconds: 0
};

setInterval(() => {
    let today = new Date(),
        hours = today.getHours(),
        minutes = today.getMinutes(),
        seconds = today.getSeconds();
    
    let timeData = {
        hours: timeStr(hours),
        minutes: timeStr(minutes),
        seconds: timeStr(seconds)
    };

    for (const key in timeData) {
        if (hasOwn.call(timeData, key) && hasOwn.call(domRef, key) && hasOwn.call(store, key)) {

            if (store[key] == timeData[key]) {
                // ... do nothing
            } else {
                store[key] = timeData[key];
                render(domRef[key], parseInt(timeData[key][0], 10), parseInt(timeData[key][1], 10));
            }

        }
    }

}, 1000);
