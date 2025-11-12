let handler = async (m, { conn }) => {
    const diamantesData = global.db.data.chats[m.chat].diamantes
    
    if (!diamantesData) {
        throw '🛒 No hay diamantes configurados en este grupo'
    }
    
    const hasText = diamantesData.text && diamantesData.text.trim() !== ''
    const hasImage = diamantesData.image
    
    if (hasImage && hasText) {
        // Enviar con imagen y texto
        const imageBuffer = Buffer.from(diamantesData.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, 'diamantes.jpg', 
            `\n\n${diamantesData.text}\n\n> ArletteBot`, m)
    } else if (hasImage && !hasText) {
        // Solo imagen
        const imageBuffer = Buffer.from(diamantesData.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, 'diamantes.jpg', 
            '> ArletteBot', m)
    } else if (!hasImage && hasText) {
        // Solo texto
        conn.reply(m.chat, `${diamantesData.text}`, m)
    } else {
        throw '🛒 Los datos de diamantes están vacíos'
    }
}

handler.command = ['diamantes', 'verdiamantes']
handler.help = ['diamantes']
handler.group = true

export default handler