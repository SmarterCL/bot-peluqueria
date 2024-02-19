"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("@bot-whatsapp/bot");
var conversational_layer_1 = require("src/layers/conversational.layer");
var main_layer_1 = require("src/layers/main.layer");
/**
 * Este flow responde a cualquier palabra que escriban
 */
exports.default = (0, bot_1.addKeyword)(bot_1.EVENTS.WELCOME)
    .addAction(conversational_layer_1.default)
    .addAction(main_layer_1.default);
