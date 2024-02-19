"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bot_1 = require("@bot-whatsapp/bot");
var welcome_flow_1 = require("./welcome.flow");
var seller_flow_1 = require("./seller.flow");
var schedule_flow_1 = require("./schedule.flow");
var confirm_flow_1 = require("./confirm.flow");
/**
 * Declaramos todos los flujos que vamos a utilizar
 */
exports.default = (0, bot_1.createFlow)([welcome_flow_1.default, seller_flow_1.flowSeller, schedule_flow_1.flowSchedule, confirm_flow_1.flowConfirm]);
