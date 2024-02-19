"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTimer = void 0;
function generateTimer(min, max) {
    var numSal = Math.random();
    var numeroAleatorio = Math.floor(numSal * (max - min + 1)) + min;
    return numeroAleatorio;
}
exports.generateTimer = generateTimer;
