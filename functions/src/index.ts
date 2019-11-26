import * as functions from 'firebase-functions';
import Telegraf from "telegraf";
import commands from "./commands";


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const bot = new Telegraf(functions.config().bot.key);

bot.start(ctx => {
    ctx.reply(`欢迎使用 FrankCoin 机器人`).catch()
})

bot.hears('hi', (ctx) => ctx.reply('Hey there from Google Firebase Cloud Function'));
commands(bot)

export const webhookCall = functions.https.onRequest((req, res) => {
    bot.handleUpdate(req.body, res).catch(err => console.error(err));
})