import * as functions from 'firebase-functions';
import Telegraf from "telegraf";
import commands from "./commands";


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const bot = new Telegraf(functions.config().bot.key);

bot.hears('hi', (ctx) => ctx.reply('Hey there from Google Firebase Cloud Function'));
bot.launch().then(() =>
    console.log('Yay The bot just started')
).catch(() => {
    console.error('Oh No Something bad happened')
});

commands(bot)

export const webhookCall = functions.https.onRequest((req, res) => {
    bot.handleUpdate(req.body, res).catch(err => console.error(err));
})