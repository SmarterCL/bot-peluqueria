"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flowConfirm = void 0;
var bot_1 = require("@bot-whatsapp/bot");
var handleHistory_1 = require("../utils/handleHistory");
var currentDate_1 = require("../utils/currentDate");
var calendar_1 = require("src/services/calendar");
var generatePromptToFormatDate = function (history) {
    var prompt = "Fecha de Hoy:".concat((0, currentDate_1.getFullCurrentDate)(), ", Basado en el Historial de conversacion: \n    ").concat(history, "\n    ----------------\n    Fecha ideal:...dd / mm hh:mm");
    return prompt;
};
var generateJsonParse = function (info) {
    var prompt = "tu tarea principal es analizar la informaci\u00F3n proporcionada en el contexto y generar un objeto JSON que se adhiera a la estructura especificada a continuaci\u00F3n. \n\n    Contexto: \"".concat(info, "\"\n    \n    {\n        \"name\": \"Leifer\",\n        \"interest\": \"n/a\",\n        \"value\": \"0\",\n        \"email\": \"fef@fef.com\",\n        \"startDate\": \"2024/02/15 00:00:00\"\n    }\n    \n    Objeto JSON a generar:");
    return prompt;
};
/**
 * Encargado de pedir los datos necesarios para registrar el evento en el calendario
 */
var flowConfirm = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION).addAction(function (_, _a) {
    var flowDynamic = _a.flowDynamic;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, flowDynamic('Ok, voy a pedirte unos datos para agendar')];
                case 1:
                    _b.sent();
                    return [4 /*yield*/, flowDynamic('¿Cual es tu nombre?')];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
}).addAction({ capture: true }, function (ctx, _a) {
    var state = _a.state, flowDynamic = _a.flowDynamic, extensions = _a.extensions;
    return __awaiter(void 0, void 0, void 0, function () {
        var ai, history, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, state.update({ name: ctx.body })];
                case 1:
                    _b.sent();
                    ai = extensions.ai;
                    history = (0, handleHistory_1.getHistoryParse)(state);
                    return [4 /*yield*/, ai.createChat([
                            {
                                role: 'system',
                                content: generatePromptToFormatDate(history)
                            }
                        ], 'gpt-4')];
                case 2:
                    text = _b.sent();
                    return [4 /*yield*/, (0, handleHistory_1.handleHistory)({ content: text, role: 'assistant' }, state)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, flowDynamic("\u00BFMe confirmas fecha y hora?: ".concat(text))];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, state.update({ startDate: text })];
                case 5:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
})
    .addAction({ capture: true }, function (ctx, _a) {
    var state = _a.state, flowDynamic = _a.flowDynamic;
    return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, flowDynamic("Ultima pregunta \u00BFCual es tu email?")];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
})
    .addAction({ capture: true }, function (ctx, _a) {
    var state = _a.state, extensions = _a.extensions, flowDynamic = _a.flowDynamic;
    return __awaiter(void 0, void 0, void 0, function () {
        var infoCustomer, ai, text;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    infoCustomer = "Name: ".concat(state.get('name'), ", StarteDate: ").concat(state.get('startDate'), ", email: ").concat(ctx.body);
                    ai = extensions.ai;
                    return [4 /*yield*/, ai.createChat([
                            {
                                role: 'system',
                                content: generateJsonParse(infoCustomer)
                            }
                        ])];
                case 1:
                    text = _b.sent();
                    return [4 /*yield*/, (0, calendar_1.appToCalendar)(text)];
                case 2:
                    _b.sent();
                    (0, handleHistory_1.clearHistory)(state);
                    return [4 /*yield*/, flowDynamic('Listo! agendado Buen dia')];
                case 3:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    });
});
exports.flowConfirm = flowConfirm;
