const handler = async (m, { conn, usedPrefix }) => {
    // Verificar si es el propietario del bot
    // if (!global.db.data.settings[conn.user.jid]?.restrict) {
    //     return m.reply('⚠️ Este comando solo puede ser usado por el propietario del bot');
    // }

    // Función para normalizar IDs (soporta @lid)
    const normalizeId = (jid) => {
        if (!jid) return jid;
        const decoded = conn.decodeJid(jid);
        // Mapeo manual de @lid a IDs reales (¡ACTUALIZA CON TUS VALORES!)
        const LID_TO_NUMBER = {
            '256586262044708@lid': '5217731632400@s.whatsapp.net', // Ejemplo
            // Añade más mapeos según necesites
        };
        if (decoded in LID_TO_NUMBER) return LID_TO_NUMBER[decoded];
        return decoded;
    };

    try {
        const sender = m.sender; // Número que ejecutó el comando
        const groups = Object.entries(conn.chats)
            .filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats)
            .map(([jid]) => jid);

        await m.reply(`📊 Escaneando ${groups.length} grupos...\n*Intervalo:* 30 segundos/grupo`);

        for (let i = 0; i < groups.length; i++) {
            const jid = groups[i];

            try {
                // Obtener metadatos del grupo
                const groupMetadata = await conn.groupMetadata(jid).catch(_ => null);
                if (!groupMetadata) continue;

                const participants = groupMetadata.participants || [];

                // Verificación INFALIBLE del bot como admin
                const botAdmin = participants.some(p => {
                    const participantId = normalizeId(p.id);
                    const botId = normalizeId(conn.user.jid);
                    return participantId === botId && p.admin;
                });

                // Filtrar admins (superadmin y admin)
                const admins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin');

                // Construir mensaje
                let infoMsg = `*📌 Grupo ${i + 1}/${groups.length}*\n` +
                    `*Nombre:* ${groupMetadata.subject || 'Sin nombre'}\n` +
                    `*ID:* ${jid}\n` +
                    `*Miembros:* ${participants.length}\n` +
                    `*Bot admin:* ${botAdmin ? '✅ Sí' : '❌ No'}\n` +
                    `*Admins (${admins.length}):*\n`;

                // Listar admins con menciones
                admins.forEach((admin, index) => {
                    const number = conn.decodeJid(admin.id).replace(/@.+/, '');
                    infoMsg += `${index + 1}. @${number}\n`;
                });

                // Enviar información al remitente
                await conn.sendMessage(sender, {
                    text: infoMsg,
                    mentions: admins.map(a => conn.decodeJid(a.id))
                });

                // Esperar 30 segundos (excepto en el último grupo)
                if (i < groups.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 30000));
                }

            } catch (e) {
                console.error(`Error en grupo ${jid}:`, e);
                await conn.sendMessage(sender, {
                    text: `❌ Error en grupo ${jid}\n${e.message}`
                });
            }
        }

        await conn.sendMessage(sender, {
            text: `✅ Escaneo completado\n*Total grupos:* ${groups.length}`
        });

    } catch (error) {
        console.error('Error general:', error);
        m.reply('❌ Error crítico: ' + error.message);
    }
};

handler.help = ['listaradmins'];
handler.tags = ['owner'];
handler.command = /^(listaradmins|adminsgrupos|veradmins)$/i;
handler.owner = true;
handler.exp = 0;

export default handler;