// Exercise 30

function operate (x,y, callback) {
    
    return callback(x,y);
};

function add (x,y) {
    return x+y;
};
console.log("Addition", operate(18,2, add));


function substract (x,y) {
    return x-y;
};
console.log("Substract", operate(42,22, substract));

function multiply (x,y) {
    return x*y;
};
console.log("Multiply", operate(5,4, multiply));

function divide (x,y) {
    return x/y;
};
console.log("divide", operate(60,3, divide))