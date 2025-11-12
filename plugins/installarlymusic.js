let handler = async (m, { conn, command, usedPrefix }) => {
    let picture = './media/menus/img1.jpg'
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) { process.send('uptime')
        _muptime = await new Promise(resolve => { process.once('message', resolve)
            setTimeout(resolve, 1000) }) * 1000}
    let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    let uptime = clockString(_uptime)
    let estado = `> Instalando ArlyMusic🎶🖤 V2 ...`
    //await m.react('🎶')
    await conn.sendMessage(m.chat,{text: estado})
    const botNumber = conn.user.jid;  // El número del bot es el JID

    // const gruponame = conn.getName(m.chat);
    // Enviar el mensaje con la solicitud al mismo número del bot
    const solicitudMessage = `El grupo: ${await conn.getName(m.chat)} solicito la instalacion de ArlyMusic🎶🖤`;

    try {
        // Enviar el mensaje con la solicitud al mismo número del bot
        await conn.sendMessage(botNumber, {
            text: solicitudMessage,  // El mensaje con el texto de la solicitud
            quoted: m,  // Esta es la respuesta al mensaje original, si es necesario
        });
    }catch (e) {

    }

}
handler.command = /^(installArlyMusic)$/i
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}