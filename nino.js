
let { WAConnection, MessageType, Mimetype} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require('fs')

listjadibot = [];

const jadibot = async(reply,client,id) => {
	rzky = new WAConnection()
    rzky.logger.level = 'warn'
    rzky.version = [3, 3234, 9]
    rzky.browserDescription = [ 'jadibot', '', '3.0' ]
    rzky.on('qr', async qr => {
    	let bot = await qrcode.toDataURL(qr, { scale: 8 })
    	let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
       	bot = await client.sendMessage(id,buffer,MessageType.image,{caption:'Scan QR Untuk menjadi bot\n*Rules:*\nQR akan diganti setiap 30 detik'})
    	setTimeout(() => {
       	client.deleteMessage(id, bot.key)
       },30000)
    })
    rzky.on('connecting', () => {
    })
    rzky.on('open', () => {
    	reply(`Sukses Jadi Bot\n\n*Device*:\n\n ${JSON.stringify(rzky.user,null,2)}`)
    })
    await rzky.connect({timeoutMs: 30 * 1000})
    listjadibot.push(rzky.user)
    rzky.on('chat-update', async (message) => {
        require('../iky.js')(rzky, message)
    })
}

const stopjadibot = (reply) => {
	rzky = new WAConnection();
	rzky.close()
	reply('Sukses stop jadibot')
}

module.exports = {
	jadibot,
	stopjadibot,
	listjadibot
}