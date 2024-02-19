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
exports.flowSchedule = void 0;
var bot_1 = require("@bot-whatsapp/bot");
var handleHistory_1 = require("../utils/handleHistory");
var generateTimer_1 = require("../utils/generateTimer");
var calendar_1 = require("../services/calendar");
var currentDate_1 = require("src/utils/currentDate");
var PROMPT_SCHEDULE = "\nComo ingeniero de inteligencia artificial especializado en la programaci\u00F3n de reuniones, tu objetivo es analizar la conversaci\u00F3n y determinar la intenci\u00F3n del cliente de programar una reuni\u00F3n, as\u00ED como su preferencia de fecha y hora. La reuni\u00F3n durar\u00E1 aproximadamente 45 minutos y solo puede ser programada entre las 9am y las 4pm, de lunes a viernes, y solo para la semana en curso.\n\nFecha de hoy: {CURRENT_DAY}\n\nReuniones ya agendadas:\n-----------------------------------\n{AGENDA_ACTUAL}\n\nHistorial de Conversacion:\n-----------------------------------\n{HISTORIAL_CONVERSACION}\n\nEjemplos de respuestas adecuadas para sugerir horarios y verificar disponibilidad:\n----------------------------------\n\"Por supuesto, tengo un espacio disponible ma\u00F1ana, \u00BFa qu\u00E9 hora te resulta m\u00E1s conveniente?\"\n\"S\u00ED, tengo un espacio disponible hoy, \u00BFa qu\u00E9 hora te resulta m\u00E1s conveniente?\"\n\"Ciertamente, tengo varios huecos libres esta semana. Por favor, ind\u00EDcame el d\u00EDa y la hora que prefieres.\"\n\nINSTRUCCIONES:\n- NO saludes\n- Si existe disponibilidad debes decirle al usuario que confirme\n- Revisar detalladamente el historial de conversaci\u00F3n y calcular el d\u00EDa fecha y hora que no tenga conflicto con otra hora ya agendada\n- Respuestas cortas ideales para enviar por whatsapp con emojis\n-----------------------------\nRespuesta \u00FAtil en primera persona:";
var generateSchedulePrompt = function (summary, history) {
    var nowDate = (0, currentDate_1.getFullCurrentDate)();
    var mainPrompt = PROMPT_SCHEDULE
        .replace('{AGENDA_ACTUAL}', summary)
        .replace('{HISTORIAL_CONVERSACION}', history)
        .replace('{CURRENT_DAY}', nowDate);
    return mainPrompt;
};
/**
 * Hable sobre todo lo referente a agendar citas, revisar historial saber si existe huecos disponibles
 */
var flowSchedule = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION).addAction(function (ctx, _a) {
    var extensions = _a.extensions, state = _a.state, flowDynamic = _a.flowDynamic;
    return __awaiter(void 0, void 0, void 0, function () {
        var ai, history, list, promptSchedule, text, chunks, _i, chunks_1, chunk;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, flowDynamic('dame un momento para consultar la agenda...')];
                case 1:
                    _b.sent();
                    ai = extensions.ai;
                    history = (0, handleHistory_1.getHistoryParse)(state);
                    return [4 /*yield*/, (0, calendar_1.getCurrentCalendar)()];
                case 2:
                    list = _b.sent();
                    promptSchedule = generateSchedulePrompt((list === null || list === void 0 ? void 0 : list.length) ? list : 'ninguna', history);
                    return [4 /*yield*/, ai.createChat([
                            {
                                role: 'system',
                                content: promptSchedule
                            },
                            {
                                role: 'user',
                                content: "Cliente pregunta: ".concat(ctx.body)
                            }
                        ], 'gpt-4')];
                case 3:
                    text = _b.sent();
                    return [4 /*yield*/, (0, handleHistory_1.handleHistory)({ content: text, role: 'assistant' }, state)];
                case 4:
                    _b.sent();
                    chunks = text.split(/(?<!\d)\.\s+/g);
                    _i = 0, chunks_1 = chunks;
                    _b.label = 5;
                case 5:
                    if (!(_i < chunks_1.length)) return [3 /*break*/, 8];
                    chunk = chunks_1[_i];
                    return [4 /*yield*/, flowDynamic([{ body: chunk.trim(), delay: (0, generateTimer_1.generateTimer)(150, 250) }])];
                case 6:
                    _b.sent();
                    _b.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [2 /*return*/];
            }
        });
    });
});
exports.flowSchedule = flowSchedule;
