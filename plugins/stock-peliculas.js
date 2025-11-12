let handler = async (m, { conn }) => {
    const peliculasData = global.db.data.chats[m.chat].peliculas
    
    if (!peliculasData) {
        throw '🛒 No hay peliculas configurados en este grupo'
    }
    
    const hasText = peliculasData.text && peliculasData.text.trim() !== ''
    const hasImage = peliculasData.image
    
    if (hasImage && hasText) {
        // Enviar con imagen y texto
        const imageBuffer = Buffer.from(peliculasData.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, 'peliculas.jpg', 
            `\n\n${peliculasData.text}\n\n> ArletteBot`, m)
    } else if (hasImage && !hasText) {
        // Solo imagen
        const imageBuffer = Buffer.from(peliculasData.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, 'peliculas.jpg', 
            '> ArletteBot', m)
    } else if (!hasImage && hasText) {
        // Solo texto
        conn.reply(m.chat, `${peliculasData.text}`, m)
    } else {
        throw '🛒 Los datos de peliculas están vacíos'
    }
}

handler.command = ['peliculas', 'verpeliculas']
handler.help = ['peliculas']
handler.group = true

export default handler