let handler = async (m, { conn, participants, command, usedPrefix }) => {
    try {
        const kickText = `${lenguajeGB['smskick1']()}${usedPrefix + command} @${global.owner[0][0]}*`;
        const fkontak = {
            "key": {
                "participants": "0@s.whatsapp.net",
                "remoteJid": "status@broadcast",
                "fromMe": false,
                "id": "Halo"
            },
            "message": {
                "contactMessage": {
                    "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            },
            "participant": "0@s.whatsapp.net"
        };

        // Verificar si las restricciones están habilitadas
        if (!global.db.data.settings[conn.user.jid].restrict) {
            return conn.sendButton(
                m.chat,
                wm,
                `${lenguajeGB['smsAvisoAG']()}${lenguajeGB['smsSoloOwner']()}`,
                null,
                [[lenguajeGB.smsEncender(), `${usedPrefix}on restringir`]],
                fkontak,
                m
            );
        }

        // Verificar si se mencionó a alguien o se respondió a un mensaje
        if (!m.mentionedJid[0] && !m.quoted) {
            return m.reply(kickText, m.chat, { mentions: conn.parseMention(kickText) });
        }

        // Obtener el usuario objetivo
        let targetUser = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;
        let targetUsername = targetUser.split("@")[0];

        // Verificar si se está intentando expulsar al bot
        if (conn.user.jid.includes(targetUser)) {
            return conn.reply(
                m.chat,
                `${lenguajeGB['smskick1']()}${usedPrefix + command} @${global.owner[0][0]}*`,
                fkontak,
                m
            );
        }

        // Verificar si el usuario objetivo es administrador


        const savageDeleteMessages = [
            `*¡@${targetUsername} eliminad@! ¿Siguiente? 🎯*`,
            `*Se fue @${targetUsername} "Y nunca más fue vist@... afortunadamente 🍀*"`,
            `*@${targetUsername} un binari@ menos 📈*"`,
                `*@${targetUsername} ¡Mamaste 💀!*`
        ];

        function getRandomSavageDelete() {
            return savageDeleteMessages[Math.floor(Math.random() * savageDeleteMessages.length)];
        }
        // Mensaje antes de expulsar
        const kickWarningMessage = getRandomSavageDelete();

        // Enviar mensaje de advertencia
        await conn.reply(
            m.chat,
            kickWarningMessage,
            m,
            { mentions: [targetUser, m.sender] }
        );

        // Esperar 3 segundos antes de expulsar
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Intentar expulsar al usuario
        const eliminar = await conn.groupParticipantsUpdate(m.chat, [targetUser], 'remove');

        // Manejar la respuesta de la expulsión
        if (eliminar && eliminar[0]) {
            const status = eliminar[0].status;
            let responseMessage = '';

            switch (status) {
                case "200":
                    //responseMessage = `${lenguajeGB['smsAvisoEG']()}*@${targetUsername} ${lenguajeGB['smskick2']()}*`;
                    break;
                case "406":
                    responseMessage = `${lenguajeGB['smsAvisoFG']()}*@${targetUsername} ${lenguajeGB['smskick3']()}*`;
                    break;
                case "404":
                    responseMessage = `${lenguajeGB['smsAvisoAG']()}*@${targetUsername} ${lenguajeGB['smskick4']()}*`;
                    break;
                default:
                    responseMessage = `❌ Error desconocido al intentar expulsar a @${targetUsername}. Código: ${status}`;
            }

            if(status !== "200"){
                await m.reply(responseMessage, m.chat, { mentions: conn.parseMention(responseMessage) });
            }
        } else {
            // Si no hay respuesta de eliminación
            
        }

    } catch (error) {
        console.log(`❗❗ ${lenguajeGB['smsMensError2']()} ${usedPrefix + command} ❗❗`);
        console.error('Error en comando kick:', error);

        await conn.reply(
            m.chat,
            `${lenguajeGB['smsMalError3']()}#report ${lenguajeGB['smsMensError2']()} ${usedPrefix + command}\n\n${wm}`,
            fkontak,
            m
        );
    }
};

handler.help = ['kick'];
handler.tags = ['group'];
handler.command = /^(kick|echar|hechar|sacar|ban)$/i;
handler.admin = handler.group = handler.botAdmin = true;

export default handler;