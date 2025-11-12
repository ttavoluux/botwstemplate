let handler = async (m, { conn }) => {
    const stockData = global.db.data.chats[m.chat].stock
    
    if (!stockData) {
        throw '🛒 No hay stock configurados en este grupo'
    }
    
    const hasText = stockData.text && stockData.text.trim() !== ''
    const hasImage = stockData.image
    
    if (hasImage && hasText) {
        // Enviar con imagen y texto
        const imageBuffer = Buffer.from(stockData.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, 'stock.jpg', 
            `\n\n${stockData.text}\n\n> ArletteBot`, m)
    } else if (hasImage && !hasText) {
        // Solo imagen
        const imageBuffer = Buffer.from(stockData.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, 'stock.jpg', 
            '> ArletteBot', m)
    } else if (!hasImage && hasText) {
        // Solo texto
        conn.reply(m.chat, `${stockData.text}`, m)
    } else {
        throw '🛒 Los datos de stock están vacíos'
    }
}

handler.command = ['stock', 'verstock']
handler.help = ['stock']
handler.group = true

export default handler