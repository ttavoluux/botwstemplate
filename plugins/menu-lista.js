/**
 POR FAVOR TENGAN LA AMABILIDAD Y BONDAD DE NO CAMBIAR MÍNIMAMENTE LOS CRÉDITOS DE GATABOT-MD,
 SI VAS A AÑADIR TUS DATOS O CRÉDITOS, ESTA BIEN. PERO NO QUITEN LOS QUE YA ESTAN DE GATABOT-MD, GRACIAS
 **/

/** PLEASE BE KIND AND KINDNESS NOT TO MINIMALLY CHANGE GATABOT-MD CREDITS,
 IF YOU ARE GOING TO ADD YOUR DATA OR CREDITS, IT'S OK. BUT DO NOT REMOVE THOSE THAT ARE ALREADY FROM GATABOT-MD, THANK YOU **/
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
    //𝑨 𝑩 𝑪 𝑫 𝑬 𝑭 𝑮 𝑯 𝑰 𝑱 𝑲 𝑳 𝑴 𝑵 𝑶 𝑷 𝑸 𝑹 𝑺 𝑻 𝑼 𝑽 𝑾 𝑿 𝒀 𝒁 𝑼𝑷𝑫𝑨𝑻𝑬
    //
    // 𝒂 𝒃 𝒄 𝒅 𝒆 𝒇 𝒈 𝒉 𝒊 𝒋 𝒌 𝒍 𝒎 𝒏 𝑜 𝒑 𝒒 𝒓 𝒔 𝒕 𝒖 𝒗 𝒘 𝒙 𝒚 𝒛
    let estado = `💗 *¡Hola!* ${name} ✨


📌
> *prefix: @ . !*
> *.menucompleto*
> *.notas | notasdelaversion*


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


🔞 *+18* -> *.xxx*


📍 𝑰𝒏𝒇𝒐 -> *.info*


> (Server auto maintenance for 5 minutes every 1AM UTC-7)



*Versión:* ${vs}
*Tiempo Activo:* ${uptime}`


let randomImage = [imagen10, imagen11, imagen12, imagen13, imagen14, imagen15][Math.floor(Math.random() * 6)];
    await conn.sendFile(m.chat, randomImage, 'lp.jpg',estado)
}
handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(menu|comandos)$/i
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}