let handler = async (m, { conn }) => {
    const librosData = global.db.data.chats[m.chat].libros
    
    if (!librosData) {
        throw '🛒 No hay libros configurados en este grupo'
    }
    
    const hasText = librosData.text && librosData.text.trim() !== ''
    const hasImage = librosData.image
    
    if (hasImage && hasText) {
        // Enviar con imagen y texto
        const imageBuffer = Buffer.from(librosData.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, 'libros.jpg', 
            `\n\n${librosData.text}\n\n> MxdeBot`, m)
    } else if (hasImage && !hasText) {
        // Solo imagen
        const imageBuffer = Buffer.from(librosData.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, 'libros.jpg', 
            '> MxdeBot', m)
    } else if (!hasImage && hasText) {
        // Solo texto
        conn.reply(m.chat, `${librosData.text}`, m)
    } else {
        throw '🛒 Los datos de libros están vacíos'
    }
}

handler.command = ['libros', 'verlibros']
handler.help = ['libros']
handler.group = true

export default handler