import * as functions from 'firebase-functions';
import Telegraf from "telegraf";
import commands from "./commands";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const bot = new Telegraf(functions.config().bot.key);
bot.catch((err :any, ctx: any) => {
    console.log(`Ooops, ecountered an error for ${ctx.updateType}`, err)
})

bot.start((ctx) => ctx.reply('Hey there'));
bot.hears('hi', (ctx) => ctx.reply('Hey there from Google Firebase Cloud Function'));
commands(bot)

export const hook = functions.https.onRequest((req, res) => {
    console.log(req.body)
    bot.handleUpdate(req.body, res)
        .catch(err => console.error(err));
})