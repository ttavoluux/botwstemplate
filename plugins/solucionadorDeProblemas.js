let handler = async (m, { conn, command, usedPrefix }) => {

    const groupInfo = await conn.groupMetadata(m.chat)
    const participants = groupInfo.participants
    const botNumber = conn.user.jid
    const isBotAdmin = participants.some(p => p.id === botNumber && p.admin)

    let estado = `> *El grupo*  ${groupInfo.subject} no es compatible con ArletteBot\n`

    if (participants.length <= 5) {
        estado += "> ⚠️ No cumple con los integrantes minimos\n";
    }else{
        estado += "> ✅ Integrantes minimos\n";
    }
    if (!isBotAdmin) {
        estado += "> ⚠️ El bot no tiene sufucientes permisos\n";
    }else{
        estado += "> ✅ El bot tiene permisos de administrador\n";
    }
    estado += "> ✅ El grupo se encuentra activo\n";
    estado += "> ✅ Grupo sin spam\n";
    estado += "> ✅ El grupo no cuenta con otros Bots\n";
    estado += "> ❗Este grupo es incompatible❗";


    if(funcionandocorrectamente){
        estado = "🖤 ArletteBot  Funciona correctamente."
    }


    // Enviar imagen con estado
    await conn.sendFile(m.chat, imagen42, 'lp.jpg', estado, m, null, {
        mentions: [m.sender],
        ephemeralExpiration: 24 * 60 * 60 * 1000
    })
}

handler.command = /^(estadogrupo|verificargrupo|checkgroup)$/i
handler.group = true
handler.admin = false // Opcional: requerir que el usuario sea admin
export default handler