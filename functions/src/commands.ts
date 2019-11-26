import Telegraf, { ContextMessageUpdate, Markup, Extra } from "telegraf";
import * as functions from 'firebase-functions';
import { fromWeiToEther } from "./utils/eth";
import FrankCoin from "./token/FrankCoin";
import { messages } from "./constant";
import { ExtraReplyMessage } from "telegraf/typings/telegram-types";

export default (bot: Telegraf<ContextMessageUpdate>) => {
    // commands must be lowercase to be register in the telegram bot cmd list
    bot.command('balanceof', async ({ message, reply }) => {
        console.info(message)
        const parameters: string[] = message!.text!.split(" ").slice(1)
        const [address] = parameters
        // @todo: 对 address 用工具进行checksum
        if (!address || address.length !== 42) reply(messages.INVALID_ADDRESS).catch()
        else {
            try {
                const result = await FrankCoin.methods.balanceOf(address).call()
                const replyMsg = `Balance of ${address}: ${fromWeiToEther(result)}`
                console.info(replyMsg)
                reply(replyMsg).catch()
            } catch (error) {
                reply(`error happened: ` + error.toString()).catch()
            }
        }
    })


    bot.command('ping', ({ message, reply }) => {
        console.info(message)
        reply(`pong`).catch()
    })

    bot.command('join', async ({ message, chat, telegram, reply }) => {
        const link = await telegram.exportChatInviteLink(functions.config().group.chatid)
        const keyboard = Extra.markup(Markup.inlineKeyboard([
            Markup.urlButton('加入', link),
        ])) as ExtraReplyMessage;
        reply(`点击下方加入按钮以加入 FWC Hodler Circle:`, keyboard).catch()
        // telegram.sendCopy(chat!.id, message, Extra.markup(keyboard)).catch()
    })
}