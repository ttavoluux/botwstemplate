
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
    let estado = `🎶 ¡ArletteMusic V2! 🎶

✅ Servidor dedicado!
✅ Reproducción directa desde YouTube y Spotify
✅ Comando rápido: !spotify / !play [nombre de la canción]
✅ Compatible Android/Ios/Web

> 🔧 Version en desarrollo
> 🔧 La instalacion podria tardar hasta 48 horas

ArletteMusic es una extensión de ArletteBot, descarga/escucha tu musica dentro de whatsapp <3!

*PARA INSTALAR USA EL COMANDO* .installArlyMusic
`
    await conn.sendFile(m.chat, imagen40, 'lp.jpg', estado)
}
handler.command = /^(arlettemusic2|arlettemusic|arlettesporify|ArlyMusic)$/i
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
