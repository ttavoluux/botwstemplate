
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
    let estado = `🖤 ArletteBot Ultimate 🖤
> ArletteBot Ultimate es la version completa de ArletteBot (rendimiento superior, comandos personalizados, un servidor potente, soporte privado, actualizaciones constantes)

> *lista de menus*

💬 𝑮𝒓𝒖𝒑𝒐𝒔 -> *.grupos*


⚙️ 𝑨𝒋𝒖𝒔𝒕𝒆𝒔 -> *.ajustes*


🌸 𝑾𝒆𝒍𝒄𝑜𝒎𝒆 -> *.welcome*


🎵 𝑴𝒖𝒔𝒊𝒄 -> *.music*


🎨 𝑨𝒓𝒍𝒆𝒕𝒕𝒆𝑩𝒐𝒕 𝑯𝑫+ 🎨 -> *.photoshop*


🛠️ 𝙐𝙩𝙞𝙡𝙨 -> *.utils*


🕹️ 𝑱𝒖𝒆𝒈𝒐𝒔 -> *.juegos*


🕹️ 𝑱𝒖𝒆𝒈𝒐𝒔 (Free Fire) -> *.freefire | ff*


🤖 𝑰𝑨 -> *.ia*


🌐 𝑫𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒔 -> *.descargas*


🫧 𝑺𝒕𝒊𝒄𝒌𝒆𝒓𝒔 -> *.menustickers*


🎭 𝑭𝒊𝒍𝒕𝒓𝒐𝒔/𝑬𝒇𝒆𝒄𝒕𝒐𝒔 -> *.filtros*


🎨 𝑾𝒂𝒍𝒍𝒑𝒂𝒑𝒆𝒓𝒔 -> *.wallpapers*


💰 𝑬𝒄𝒐𝒏𝒐𝒎í𝒂 -> *.economia*


🛒 𝑽𝒆𝒏𝒕𝒂𝒔 -> *.ventas*


🔞 *+18* -> *.18+*


📍 𝑰𝒏𝒇𝒐 -> *.info*

> COMPRAR: .owner
`
    let randomImage = [imagen10, imagen11, imagen12, imagen13, imagen14, imagen15][Math.floor(Math.random() * 6)];
    await conn.sendFile(m.chat, randomImage, 'lp.jpg', estado)
}
handler.help = ['ultimate']
handler.tags = ['pro']
handler.command = /^(pro|ultimate|arlettepro|arlettebotultimate)$/i
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
