let handler = async (m, { conn, text, isROwner, isOwner }) => {
    // Verificar que haya al menos imagen O texto
    if (!text && !m.quoted && !m.msg.imageMessage) {
        throw `🛒 *Envía una imagen O texto O ambos*\n\nEjemplos:\n• .setpeliculas texto`
    }
    let imageBuffer = null
    let finalText = text || '' // Si no hay texto, será string vacío
    
    // Descargar imagen si existe
    if (m.quoted && m.quoted.mtype === 'imageMessage') {
        imageBuffer = await m.quoted.download()
    } else if (m.msg.imageMessage) {
        imageBuffer = await m.msg.download()
    }
    
    // Guardar en base de datos
    global.db.data.chats[m.chat].peliculas = {
        text: finalText,
        image: imageBuffer ? imageBuffer.toString('base64') : null,
        timestamp: new Date().getTime()
    }
    
    // Mensaje de confirmación según lo que se guardó
    let responseMsg = ''
    if (finalText && imageBuffer) {
        responseMsg = '🛒 *¡Peliculas actualizados!🛒*'
    } else if (finalText && !imageBuffer) {
        responseMsg = '🛒 *¡Peliculas actualizados!🛒*'
    } else if (!finalText && imageBuffer) {
        responseMsg = '🛒 *¡Peliculas actualizados!🛒*'
    }
    
    conn.reply(m.chat, responseMsg, m)
}

handler.command = ['setpeliculas']
handler.help = ['setpeliculas']
handler.admin = true
handler.group = true

export default handler