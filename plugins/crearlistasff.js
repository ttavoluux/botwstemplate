let handler = async (m, { conn, command, usedPrefix, text }) => {
    let name = await conn.getName(m.sender)
    const botNumber = conn.user.jid
    
    // Si el comando es CREARLISTA
    if (command === 'creardiseñolist') {
        let estado = `> Creando plantilla de lista personalizada...`
        await conn.sendMessage(m.chat, {text: estado})
        
        // Plantilla de la lista
        const plantilla = `*📋 PLANTILLA DE LISTA PERSONALIZADA*

// Nombre clan/team:
// emojiTitulo =
//⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎 =
// 🇲🇽│𝐌𝐄𝐗: =
// 🇨🇴│𝐂𝐎𝐋: =
// 🇦🇷│𝐀𝐑𝐆: =
// emojiLider =
// emojiJugador =
// emojiSuplTitulo =
// emojiSuplJugador =

_Completa esta plantilla y usa el comando ${usedPrefix}enviarlista para enviarla_`
        
        // Enviar la plantilla al chat
        await conn.sendMessage(m.chat, {text: plantilla})
        
        // Notificar al bot sobre la solicitud
        const solicitudMessage = `El grupo: ${await conn.getName(m.chat)} solicitó crear una lista personalizada\nUsuario: ${name} (@${m.sender.split('@')[0]})`
        
        try {
            await conn.sendMessage(botNumber, {
                text: solicitudMessage,
                quoted: m
            })
        } catch (e) {
            console.error('Error al enviar notificación:', e)
        }
    }
    
    // Si el comando es ENVIARLISTA
    if (command === 'enviarlista') {
        // Verificar si hay texto (la lista completada)
        if (!text) {
            return conn.sendMessage(m.chat, {
                text: `⚠️ *Debes proporcionar la lista completada*\n\nEjemplo: .enviarlista
// Nombre clan/team: Clan ff
// emojiTitulo = 👾
//⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎 = ⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
// 🇲🇽│𝐌𝐄𝐗: = 🇲🇽┇𝑴𝑬𝑿:
// 🇨🇴│𝐂𝐎𝐋: = 🇨🇴┇𝑪𝑶𝑳:
// 🇦🇷│𝐀𝐑𝐆: = 🇦🇷│𝐀𝐑𝐆:
// emojiLider = 👑
// emojiJugador = 🥷🏿
// emojiSuplTitulo = 👹
// emojiSuplJugador = 🥷🏿`
            })
        }
        
        let estado = `> Enviando lista personalizada al bot...`
        await conn.sendMessage(m.chat, {text: estado})
        
        // Mensaje con la lista completada para el bot
        const listaCompleta = `*📋 LISTA PERSONALIZADA RECIBIDA*

*Grupo:* ${await conn.getName(m.chat)}
*Usuario:* ${name} (@${m.sender.split('@')[0]})

*Contenido de la lista:*
${text}

────────────────────`
        
        try {
            // Enviar la lista al número del bot
            await conn.sendMessage(botNumber, {
                text: listaCompleta,
                quoted: m
            })
            
            // Confirmar al usuario
            await conn.sendMessage(m.chat, {
                text: `✅ *Lista enviada correctamente*\n\nTu lista personalizada ha sido enviada para su revisión.`
            })
        } catch (e) {
            console.error('Error al enviar lista:', e)
            await conn.sendMessage(m.chat, {
                text: `❌ *Error al enviar la lista*\n\nOcurrió un error al procesar tu solicitud. Intenta nuevamente.`
            })
        }
    }
}

handler.command = /^(enviarlista|creardiseñolist)$/i
export default handler