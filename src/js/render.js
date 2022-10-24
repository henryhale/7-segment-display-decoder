import decode from "./decoder.js";

/**
 * 
 * Display of One Digit 
 *  
 *  - using the output from the decoder
 * 
 *   __ 
 *  |__|
 *  |__|
 * 
 * 
 */
export function display(num = 0) {
    
    // decode `num`
    let decodedNum = decode(num);

    // check & validate segments with CSS borders

    let top = decodedNum.a === 1 ? "top" : "",
        middle = decodedNum.g === 1 ? "top" : "",
        bottom = decodedNum.d === 1 ? "bottom" : "",

        upperLeft = decodedNum.f === 1 ? "left" : "", 
        lowerLeft = decodedNum.e === 1 ? "left" : "", 

        upperRight = decodedNum.b === 1 ? "right" : "", 
        lowerRight = decodedNum.c === 1 ? "right" : "";

    // build digit
    let template = document.createElement('div')
    template.className = "digit";
    template.innerHTML = `
        <div class="${top} ${upperRight} ${upperLeft}"></div>
        <div class="${lowerLeft} ${lowerRight} ${middle} ${bottom}"></div>
    `;

    // return template
    return template;
}

// render digit
export function render(container, ...num) {
    if (container instanceof HTMLElement) {
        container.innerHTML = "";
        for (const n of num) {
            container.appendChild(display(n));
        }
    }
}

export default render;
