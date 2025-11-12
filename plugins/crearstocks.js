import { writeFileSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn, text, isROwner, isOwner }) => {
    
    if (!text) throw '💗 *Uso: .crearstock [nombre]*\n\nEjemplo: .crearstock diamantes'
    
    const name = text.toLowerCase().trim()
    
    // Validar nombre
    if (!/^[a-z0-9]+$/.test(name)) {
        throw '🛒 *El nombre solo puede contener letras minúsculas y números*'
    }
    
    // Código del archivo SET
    const setFileContent = `let handler = async (m, { conn, text, isROwner, isOwner }) => {
    // Verificar que haya al menos imagen O texto
    if (!text && !m.quoted && !m.msg.imageMessage) {
        throw \`🛒 *Envía una imagen O texto O ambos*\\n\\nEjemplos:\\n• .set${name} texto\`
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
    global.db.data.chats[m.chat].${name} = {
        text: finalText,
        image: imageBuffer ? imageBuffer.toString('base64') : null,
        timestamp: new Date().getTime()
    }
    
    // Mensaje de confirmación según lo que se guardó
    let responseMsg = ''
    if (finalText && imageBuffer) {
        responseMsg = '🛒 *¡${name.charAt(0).toUpperCase() + name.slice(1)} actualizados!🛒*'
    } else if (finalText && !imageBuffer) {
        responseMsg = '🛒 *¡${name.charAt(0).toUpperCase() + name.slice(1)} actualizados!🛒*'
    } else if (!finalText && imageBuffer) {
        responseMsg = '🛒 *¡${name.charAt(0).toUpperCase() + name.slice(1)} actualizados!🛒*'
    }
    
    conn.reply(m.chat, responseMsg, m)
}

handler.command = ['set${name}']
handler.help = ['set${name}']
handler.admin = true
handler.group = true

export default handler`

    // Código del archivo VER
    const verFileContent = `let handler = async (m, { conn }) => {
    const ${name}Data = global.db.data.chats[m.chat].${name}
    
    if (!${name}Data) {
        throw '🛒 No hay ${name} configurados en este grupo'
    }
    
    const hasText = ${name}Data.text && ${name}Data.text.trim() !== ''
    const hasImage = ${name}Data.image
    
    if (hasImage && hasText) {
        // Enviar con imagen y texto
        const imageBuffer = Buffer.from(${name}Data.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, '${name}.jpg', 
            \`\\n\\n\${${name}Data.text}\\n\\n> ArletteBot\`, m)
    } else if (hasImage && !hasText) {
        // Solo imagen
        const imageBuffer = Buffer.from(${name}Data.image, 'base64')
        await conn.sendFile(m.chat, imageBuffer, '${name}.jpg', 
            '> ArletteBot', m)
    } else if (!hasImage && hasText) {
        // Solo texto
        conn.reply(m.chat, \`\${${name}Data.text}\`, m)
    } else {
        throw '🛒 Los datos de ${name} están vacíos'
    }
}

handler.command = ['${name}', 'ver${name}']
handler.help = ['${name}']
handler.group = true

export default handler`

    try {
        // Crear archivos
        const pluginsPath = './plugins'
        
        writeFileSync(
            join(pluginsPath, `stock-set-${name}.js`),
            setFileContent,
            'utf8'
        )
        
        writeFileSync(
            join(pluginsPath, `stock-${name}.js`),
            verFileContent,
            'utf8'
        )
        
        conn.reply(m.chat, 
            `🛒 *¡Stock "${name}" creado exitosamente!*\n\n` +
            `📁 Archivos generados:\n` +
            `• stock-set-${name}.js\n` +
            `• stock-${name}.js\n\n` +
            `📝 Comandos disponibles:\n` +
            `• .set${name} - Configurar ${name}\n` +
            `• .${name} - Ver ${name}\n\n` +
            `> ArletteBot`, 
            m
        )
    } catch (e) {
        throw `*Error al crear archivos:* ${e.message}`
    }
}

handler.command = ['crearstock']
handler.help = ['crearstock <nombre>']
handler.admin = true

export default handler