const {

	MessageType

} = require("@adiwajshing/baileys");

const fs = require("fs-extra")



const { getBuffer } = require('../lib/myfunc')

const { color, bgcolor } = require('../lib/color')



let setting = JSON.parse(fs.readFileSync('./setting.json'))



module.exports = welcome = async (rzky, anu) => {

	    const welkom = JSON.parse(fs.readFileSync('./database/group/welcome.json'))

	    const isWelcome = welkom.includes(anu.jid)

	    if (!isWelcome) return

		try {

			    mem = anu.participants[0]

			    console.log(anu)

                try {

                pp_user = await rzky.getProfilePicture(mem)

                } catch (e) {

                pp_user = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'

            }
                try {
                pp_grup = await rzky.getProfilePicture(anu.jid)
                } catch (e) {
                pp_grup = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
            }
            if (anu.action == 'add' && mem.includes(rzky.user.jid)) {
            rzky.sendMessage(anu.jid, 'Halo! Terima Kasih sudah Mengundangku, Jika ingin Menggunakan Bot Ketik !menu', 'conversation')
            }
             if (anu.action == 'add' && !mem.includes(rzky.user.jid)) {
             if (!welkom.includes(anu.jid)) return
                mdata = await rzky.groupMetadata(anu.jid)
                memeg = mdata.participants.length
            	num = anu.participants[0]
                let v = rzky.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = v.vname || v.notify || num.split('@')[0]
                teks = ` Welcome ðŸ‘‹ Hai Kak @${anu.participants[0].split('@')[0]} `
	            buff = await getBuffer(`https://api.lolhuman.xyz/api/base/welcome?apikey=${setting.lolkey}&img1=${pp_user}&img2=${pp_grup}&background=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg&username=${encodeURI(anu_user)}&member=${memeg}&groupname= ${encodeURI(mdata.subject)}`) 
	buttons = [{buttonId: `!rules`,buttonText:{displayText: 'S&K'},type:1},{buttonId:`!menu`,buttonText:{displayText:'LIST MENU'},type:1}]

imageMsg = (await rzky.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage

buttonsMessage = {
               contentText: `${teks}`,
               footerText: '© Regards : RZKY ID', imageMessage: imageMsg,
               buttons: buttons,
               headerType: 4
}
prep = await rzky.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
               rzky.relayWAMessage(prep)
}
            if (anu.action == 'remove' && !mem.includes(rzky.user.jid)) {
            if (!welkom.includes(anu.jid)) return
                mdata = await rzky.groupMetadata(anu.jid)
            	num = anu.participants[0]
                let w = rzky.contacts[num] || { notify: num.replace(/@.+/, '') }
                anu_user = w.vname || w.notify || num.split('@')[0]
                memeg = mdata.participants.length
                out = `Sayonaraa ðŸ‘‹ @${anu.participants[0].split('@')[0]}`
                buff = await getBuffer(`https://api.lolhuman.xyz/api/base/leave?apikey=${setting.lolkey}&img1=${pp_user}&img2=${pp_grup}&background=https://i.postimg.cc/rFkw8MpX/IMG-20210807-151325.jpg&username=${encodeURI(anu_user)}&member=${memeg}&groupname= ${encodeURI(mdata.subject)}`)
                buttons = [{buttonId: `#nice`,buttonText:{displayText: 'Sayonaraa ðŸ‘‹'},type:1}]
                
                imageMsg = (await rzky.prepareMessageMedia((buff), 'imageMessage', {thumbnail: buff})).imageMessage

buttonsMessage = {
               contentText: `${out}`,
               footerText: '© Regards : RZKY ID', imageMessage: imageMsg,
               buttons: buttons,
               headerType: 4
}
prep = await rzky.prepareMessageFromContent(mdata.id,{buttonsMessage},{})
               rzky.relayWAMessage(prep)
            }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	}

