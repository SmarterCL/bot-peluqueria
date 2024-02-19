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
exports.flowSeller = exports.generatePromptSeller = void 0;
var bot_1 = require("@bot-whatsapp/bot");
var generateTimer_1 = require("../utils/generateTimer");
var handleHistory_1 = require("../utils/handleHistory");
var currentDate_1 = require("src/utils/currentDate");
var PROMPT_SELLER = "Eres el asistente virtual en la prestigiosa barber\u00EDa \"Barber\u00EDa Flow 25\", ubicada en Madrid, Plaza de Castilla 4A. Tu principal responsabilidad es responder a las consultas de los clientes y ayudarles a programar sus citas.\n\nFECHA DE HOY: {CURRENT_DAY}\n\nSOBRE \"BARBER\u00CDA FLOW 25\":\nNos distinguimos por ofrecer cortes de cabello modernos y siempre a la vanguardia. Nuestro horario de atenci\u00F3n es de lunes a viernes, desde las 09:00 hasta las 17:00. Para m\u00E1s informaci\u00F3n, visita nuestro sitio web en \"barberflow.co\". Aceptamos pagos en efectivo y a trav\u00E9s de PayPal. Recuerda que es necesario programar una cita.\n\nPRECIOS DE LOS SERVICIOS:\n- Corte de pelo de hombre 10USD\n- Corte de pelo + barba 15 USD\n\nHISTORIAL DE CONVERSACI\u00D3N:\n--------------\n{HISTORIAL_CONVERSACION}\n--------------\n\nDIRECTRICES DE INTERACCI\u00D3N:\n1. Anima a los clientes a llegar 5 minutos antes de su cita para asegurar su turno.\n2. Evita sugerir modificaciones en los servicios, a\u00F1adir extras o ofrecer descuentos.\n3. Siempre reconfirma el servicio solicitado por el cliente antes de programar la cita para asegurar su satisfacci\u00F3n.\n\n\nEJEMPLOS DE RESPUESTAS:\n\"Claro, \u00BFc\u00F3mo puedo ayudarte a programar tu cita?\"\n\"Recuerda que debes agendar tu cita...\"\n\"como puedo ayudarte...\"\n\nINSTRUCCIONES:\n- NO saludes\n- Respuestas cortas ideales para enviar por whatsapp con emojis\n\nRespuesta \u00FAtil:";
var generatePromptSeller = function (history) {
    var nowDate = (0, currentDate_1.getFullCurrentDate)();
    return PROMPT_SELLER.replace('{HISTORIAL_CONVERSACION}', history).replace('{CURRENT_DAY}', nowDate);
};
exports.generatePromptSeller = generatePromptSeller;
/**
 * Hablamos con el PROMPT que sabe sobre las cosas basicas del negocio, info, precio, etc.
 */
var flowSeller = (0, bot_1.addKeyword)(bot_1.EVENTS.ACTION).addAction(function (_, _a) {
    var state = _a.state, flowDynamic = _a.flowDynamic, extensions = _a.extensions;
    return __awaiter(void 0, void 0, void 0, function () {
        var ai, history_1, prompt_1, text, chunks, _i, chunks_1, chunk, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 7, , 8]);
                    ai = extensions.ai;
                    history_1 = (0, handleHistory_1.getHistoryParse)(state);
                    prompt_1 = (0, exports.generatePromptSeller)(history_1);
                    return [4 /*yield*/, ai.createChat([
                            {
                                role: 'system',
                                content: prompt_1
                            }
                        ])];
                case 1:
                    text = _b.sent();
                    return [4 /*yield*/, (0, handleHistory_1.handleHistory)({ content: text, role: 'assistant' }, state)];
                case 2:
                    _b.sent();
                    chunks = text.split(/(?<!\d)\.\s+/g);
                    _i = 0, chunks_1 = chunks;
                    _b.label = 3;
                case 3:
                    if (!(_i < chunks_1.length)) return [3 /*break*/, 6];
                    chunk = chunks_1[_i];
                    return [4 /*yield*/, flowDynamic([{ body: chunk.trim(), delay: (0, generateTimer_1.generateTimer)(150, 250) }])];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [3 /*break*/, 8];
                case 7:
                    err_1 = _b.sent();
                    console.log("[ERROR]:", err_1);
                    return [2 /*return*/];
                case 8: return [2 /*return*/];
            }
        });
    });
});
exports.flowSeller = flowSeller;
