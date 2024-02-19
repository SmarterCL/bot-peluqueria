"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullCurrentDate = void 0;
var date_fns_1 = require("date-fns");
var getFullCurrentDate = function () {
    var currentD = new Date();
    var formatDate = (0, date_fns_1.format)(currentD, 'yyyy/MM/dd HH:mm'); // Formato "dd/MM/yyyy HH:mm:ss"
    var day = (0, date_fns_1.format)(currentD, 'EEEE'); // Obtener el día de la semana
    return [
        formatDate,
        day,
    ].join(' ');
};
exports.getFullCurrentDate = getFullCurrentDate;
