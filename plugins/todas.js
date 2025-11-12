let handler = async(m, { conn, text, participants, args, command }) => {
const emojisKawaii = ['🌸', '🍄', '💝', '🎀', '🧸', '🫧', '🩷', '💞', '💓', '💗', '💖', '💘', '🦋', '🍓', '🍬', '🍭']

// Seleccionar un solo emoji aleatorio para todas
const randomEmoji = emojisKawaii[Math.floor(Math.random() * emojisKawaii.length)]
var texto = `𝗛𝗼𝗹𝗶𝘀`
var texto2 = '' 
var texto3 = ' '
var texto4 = ' '
if(text.length>1){ 
texto = texto2 
texto3=' *'
texto4=`* `
}

// Lista de emojis kawaii aleatorios


let pesan = args.join` `
let teks = `🎀 ${texto} ${texto3}${text.toUpperCase()}${texto4}\n\n`

for (let mem of participants) {
teks += `${randomEmoji}  @${mem.id.split('@')[0]}\n`}

teks += `\n🎀𝗔𝗿𝗹𝗲𝘁𝘀𝗶𝘁𝗮𝗕𝗼𝘁`

conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )  
}
handler.command = /^(todas)$/i

handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler