/**
 * 
 * ==============================================================
 * 
 * =====               7 Segment Display Decoder            =====
 * 
 * ==============================================================
 * 
 *    __        __    __          __    __   __    __    __
 *   |  |   |   __|   __|  |__|  |__   |__     |  |__|  |__|
 *   |__|   |  |__    __|     |   __|  |__|    |  |__|     |
 * 
 * 
 * 
 * 
*/


"use strict";

/***
 * Precision - 4 bits only
 */
const bits = 4;

/**
 * Valid Numbers to Display 
 *   - digits only
 */
const VALID_NUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Convert a Denary digit into Binary
 * 
 *   - returns an array of bits
 * 
 */
const toBinary = (num = 0) => {

    // validate only digits, zero otherwise 
    if (!VALID_NUMBERS.includes(num)) {
        return new Array(bits).fill(0);
    }

    let temp = num, 
        qoutient,
        remainder, 
        base = 2,
        result = new Array(4).fill(0),
        i = 3;

    do {
        qoutient = Math.floor(temp / base); 
        remainder = Math.floor(temp % base);
        
        result[i] = remainder;

        --i;

        temp = qoutient;

    } while (temp !== 0 || i > -1);

    return result;
};

/**
 * Invert a bit
 * 
 *  - get one bit complement
 * 
 */
const invert = (x = 0) => {
    return x === 0 ? 1 : 0;
};


/**
 * Boolean Arithmetic  - Addition
 * 
 *  - addition of bits
 *      0 + 0 = 0
 *      0 + 1 = 1
 *      1 + 0 = 1
 *      1 + 1 = 1
 * 
 */
const addBin = (a = 0, b = 0) => {
    return (a + b) >= 1 ? 1 : 0;
};


/**
 * Boolean Expression Evaluation
 * 
 *  - apply an array of bits as arguments to a boolean expression
 * 
 * 
 */
const booleanExp = (arr = [], fn) => {
    const [a,b,c,d] = arr;
    return fn(a || 0, b || 0, c || 0, d || 0);
};

/**
 * 
 * The Logical Decoder
 * 
 *  - takes a denary number and outputs an object of outcomes that 
 *    indicate which segment lights or not  
 *  
 * 
 *  NB: The formulas used to compute whether a particular segment lights on a certain number
 * 
 *      where obtained using theory on Decoders and further simplified 
 *      
 *      using K-maps in Boolean Algebra 
 * 
 */
function decoder(num) {

    // first switch to binary number system
    const binaryNum = toBinary(num); 

    // compute the boolean expression of each segment a through g
    return {

        // Segment A
        a: booleanExp(binaryNum, (a,b,c,d) => {
            let p = invert(a) * c,
                q = invert(a) * b * d,
                r = a * invert(b) * invert(c),
                s = invert(b) * invert(c) * invert(d),
                t = addBin(p, q),
                u = addBin(r, s);
            return addBin(t, u);
        }),

        // Segment B
        b: booleanExp(binaryNum, (a,b,c,d) => {
            let p = invert(a) * invert(b),
                q = invert(a) * c * d,
                r = a * invert(b) * invert(c),
                s = invert(a) * invert(c) * invert(d),
                t = addBin(p, q),
                u = addBin(r, s);
            return addBin(t, u);
        }),

        // Segment C
        c: booleanExp(binaryNum, (a,b,c,d) => {
            let p = invert(a) * invert(c),
                q = a * invert(b) * invert(c),
                r = invert(a) * b * c,
                s = invert(a) * c * d,
                t = addBin(p, q),
                u = addBin(r, s);
            return addBin(t, u);
        }),

        // Segment D
        d: booleanExp(binaryNum, (a,b,c,d) => {
            let p = invert(a) * c * invert(d),
                q = invert(a) * invert(b) * c,
                r = invert(a) * b * invert(c) * d,
                s = invert(b) * invert(c) * invert(d),
                t = addBin(p, q),
                u = addBin(r, s);
            return addBin(t, u);
        }),

        // Segment E
        e: booleanExp(binaryNum, (a,b,c,d) => {
            let p = invert(a) * c * invert(d),
                q = invert(b) * invert(c) * invert(d);
            return addBin(p, q);
        }),

        // Segment F
        f: booleanExp(binaryNum, (a,b,c,d) => {
            let p = invert(a) * b * invert(d),
                q = a * invert(b) * invert(c),
                r = invert(a) * b * invert(c),
                s = invert(a) * invert(c) * invert(d),
                t = addBin(p, q),
                u = addBin(r, s);
            return addBin(t, u);
        }),

        // Segment G
        g: booleanExp(binaryNum, (a,b,c,d) => {
            let p = invert(a) * b * invert(c),
                q = a * invert(b) * invert(c),
                r = invert(a) * c * invert(d),
                s = invert(a) * invert(b) * c,
                t = addBin(p, q),
                u = addBin(r, s);
            return addBin(t, u);
        }),
    };
}

export default decoder;
