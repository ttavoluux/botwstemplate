let handler = async (m, { conn, args, usedPrefix, command }) => {
    let op;
    if(command === 'cerrar' || command === 'cerrado' || command === 'close' ){
        op='announcement'
    }else{
        op='not_announcement'
    }
    await conn.groupSettingUpdate(m.chat, op)

    if (op === 'not_announcement'){
        m.reply(`*🐈‍⬛ Grupo Abierto ✅*`)
    }

    if (op === 'announcement'){
        m.reply(`*🐈‍⬛ Grupo Cerrado ❌*`)
    }}
handler.help = ['group open / close', 'grupo abrir / cerrar']
handler.tags = ['group']
handler.command = /^(cerrar|abrir|open|close|cerrado|abierto)$/i
handler.admin = true
handler.botAdmin = true
handler.exp = 200
export default handler


//conn.sendButton(m.chat, `${lenguajeGB['smsAvisoEG']()}𝙔𝘼 𝙋𝙐𝙀𝘿𝙀𝙉 𝙀𝙎𝘾𝙍𝙄𝘽𝙄𝙍 𝙏𝙊𝘿𝙊𝙎 𝙀𝙉 𝙀𝙎𝙏𝙀 𝙂𝙍𝙐𝙋𝙊!!`, `𝙂𝙍𝙐𝙋𝙊 𝘼𝘽𝙄𝙀𝙍𝙏𝙊\n${wm}`, pp, [['𝘾𝙪𝙚𝙣𝙩𝙖𝙨 𝙊𝙛𝙞𝙘𝙞𝙖𝙡𝙚𝙨 | 𝘼𝙘𝙘𝙤𝙪𝙣𝙩𝙨 ✅', `.cuentasgb`], ['𝙑𝙤𝙡𝙫𝙚𝙧 𝙖𝙡 𝙈𝙚𝙣𝙪́ | 𝘽𝙖𝙘𝙠 𝙩𝙤 𝙈𝙚𝙣𝙪 ☘️', `/menu`]], m)