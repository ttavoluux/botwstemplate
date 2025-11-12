const handler = async (m, { conn, text, args, usedPrefix, command }) => {
    const allowedNumber = '5215643476144'; // Número permitido - CAMBIA ESTE NÚMERO
    
    const senderNumber = m.sender.split('@')[0];
    // Verificamos si el número que envió el mensaje es el permitido
    if (senderNumber !== allowedNumber) {
        return m.reply(`${fg}❌ *No tienes permisos para usar este comando*`);
    }

    // Verificar si es un grupo

    // Obtener el grupo objetivo (si se especifica uno, sino usar el actual)
    const targetGroup = args[0] || m.chat;

    try {
        if (command === 'banchat') {
            console.log("intentando banear")
            // Comando BANCHAT
            global.db.data.chats[targetGroup] = global.db.data.chats[targetGroup] || {};
            global.db.data.chats[targetGroup].isBanned = true;
            
            await m.reply(`${eg}🚫 *CHAT BANEADO*\n\n✅ Grupo baneado correctamente: ${targetGroup}\n🗣️ El bot no estará disponible hasta que sea desbaneado.\n\n*ENGLISH:*\n✅ Chat successfully banned.\n🗣️ I will not be available until it is unbanned.`);
            
            // Enviar mensaje al grupo baneado si es diferente al actual
            if (targetGroup !== m.chat) {
                try {
                    await conn.sendMessage(targetGroup, { 
                        text: `${eg}🚫 *ESTE GRUPO HA SIDO BANEADO*\n\nEl bot no responderá a ningún comando hasta que sea desbaneado.` 
                    });
                } catch (e) {
                    console.log('No se pudo enviar mensaje al grupo destino');
                }
            }
            
        } else if (command === 'desbanchat') {
            console.log("intentando desbanear")
            // Comando DESBANCHAT
            global.db.data.chats[targetGroup] = global.db.data.chats[targetGroup] || {};
            global.db.data.chats[targetGroup].isBanned = false;
            
            await m.reply(`${eg}✅ *CHAT DESBANEADO*\n\n✅ Grupo desbaneado correctamente: ${targetGroup}\n🗣️ El bot ahora está disponible.\n\n*ENGLISH:*\n✅ Chat successfully unbanned.\n🗣️ Now I am available for use.`);
            
            // Enviar mensaje al grupo desbaneado si es diferente al actual
            if (targetGroup !== m.chat) {
                try {
                    await conn.sendMessage(targetGroup, { 
                        text: `${eg}✅ *ESTE GRUPO HA SIDO DESBANEADO*\n\nEl bot ahora está disponible y responderá a los comandos.` 
                    });
                } catch (e) {
                    console.log('No se pudo enviar mensaje al grupo destino');
                }
            }
        }
    } catch (error) {
        console.error('Error en comando banchat:', error);
        m.reply(`${fg}❌ *Error al ejecutar el comando*`);
    }
}

handler.help = [
    'banchat [idgrupo]', 
    'desbanchat [idgrupo]'
];
handler.tags = ['owner'];
handler.command = /^(banchat|desbanchat|bangrupo|desbangrupo|unbanchat)$/i;
//handler.group = true;

export default handler;