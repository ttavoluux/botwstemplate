let handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
    // Verificar si es admin (opcional, puedes comentar estas líneas si quieres que cualquiera lo use)
    // if (!(isAdmin || isOwner)) {
    //     global.dfail('admin', m, conn)
    //     throw false
    // }

    try {
        // Determinar cuántos usuarios seleccionar según el comando
        let cantidad = 10;
        let titulo = 'TOP 10';
        let emoji = '🔟';

        if (command.toLowerCase().includes('top1') || command.toLowerCase().includes('1')) {
            cantidad = 1;
            titulo = 'TOP 1';
            emoji = '🥇';
        } else if (command.toLowerCase().includes('top3') || command.toLowerCase().includes('3')) {
            cantidad = 3;
            titulo = 'TOP 3';
            emoji = '🥉';
        } else if (command.toLowerCase().includes('top10') || command.toLowerCase().includes('top')) {
            cantidad = 10;
            titulo = 'TOP 10';
            emoji = '🔟';
        }

        // Verificar que hay suficientes participantes
        let numParticipantes = participants.length;
        if (numParticipantes < cantidad) {
            return m.reply(`⚠️ El grupo necesita al menos ${cantidad} miembros para usar este comando. Miembros actuales: ${numParticipantes}`);
        }

        // Crear una copia del array de participantes para no modificar el original
        let participantesCopia = [...participants];

        // Función para barajar array (Fisher-Yates shuffle)
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        // Barajar y tomar la cantidad necesaria
        let participantesAleatorios = shuffleArray(participantesCopia).slice(0, cantidad);

        // Guardar en variables de la 'a' a la 'j' según la cantidad
        let a, b, c, d, e, f, g, h, i, j;

        if (cantidad >= 1) a = participantesAleatorios[0];
        if (cantidad >= 2) b = participantesAleatorios[1];
        if (cantidad >= 3) c = participantesAleatorios[2];
        if (cantidad >= 4) d = participantesAleatorios[3];
        if (cantidad >= 5) e = participantesAleatorios[4];
        if (cantidad >= 6) f = participantesAleatorios[5];
        if (cantidad >= 7) g = participantesAleatorios[6];
        if (cantidad >= 8) h = participantesAleatorios[7];
        if (cantidad >= 9) i = participantesAleatorios[8];
        if (cantidad >= 10) j = participantesAleatorios[9];

        // Crear el mensaje
        let teks = '';
        //teks += `${emoji} *${titulo}* ${emoji}\n\n`;
        let text2 = ""
        if (text && text.length > 0) {
            text2 = `${text}`;
        }else{
            return m.reply(`⚠️ Agregue una cateroria Ejemplo: \n> *.top mejores*`);
        }

        // Emojis y posiciones según la cantidad
        const posiciones = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
        const letras = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

        if (cantidad === 1) {
            teks += `👑 *¡EL/LA MAS ${text2}!* 👑\n\n`;
            teks += `🥇  → *@${a.id.split('@')[0]}*\n\n`;
            teks += '✨ *¡Eres el número 1!* ✨\n';
        } else if (cantidad === 3) {
            teks += `🏆 *¡EL TRIO DE ${text2}!* 🏆\n\n`;
            teks += `🥇  → *@${a.id.split('@')[0]}*\n`;
            teks += `🥈  → *@${b.id.split('@')[0]}*\n`;
            teks += `🥉  → *@${c.id.split('@')[0]}*`;
            //teks += '✨ *¡Los 3 mejores!* ✨\n';
        } else {
            teks += `🔥 *Los 10 mas ${text2}* 🔥\n\n`;
            for (let index = 0; index < cantidad; index++) {
                teks += `${posiciones[index]}  → *@${participantesAleatorios[index].id.split('@')[0]}*\n`;
            }
            //teks += '\n✨ *¡El ranking completo!* ✨\n';
        }

        // teks += `> Total de miembros: ${numParticipantes}\n`;
        // teks += `> Seleccionados: ${cantidad} usuario${cantidad > 1 ? 's' : ''}\n\n`;
        //
        // teks += '                                    ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺';

        // Crear array de IDs para menciones
        let mentions = participantesAleatorios.map(user => user.id);

        // Enviar mensaje con menciones
        await conn.sendMessage(m.chat, {
            text: teks,
            mentions: mentions
        });

        // Variables guardadas según la cantidad (para uso posterior)
        /*
        console.log(`Variables guardadas para ${titulo}:`);
        if (a) console.log('Usuario A:', a.id);
        if (b) console.log('Usuario B:', b.id);
        if (c) console.log('Usuario C:', c.id);
        if (d) console.log('Usuario D:', d.id);
        if (e) console.log('Usuario E:', e.id);
        if (f) console.log('Usuario F:', f.id);
        if (g) console.log('Usuario G:', g.id);
        if (h) console.log('Usuario H:', h.id);
        if (i) console.log('Usuario I:', i.id);
        if (j) console.log('Usuario J:', j.id);
        */

    } catch (error) {
        console.error('Error en comando top:', error);
        m.reply('⚠️ Hubo un error al crear el ranking.');
    }
};

// Configuración del handler
handler.help = ['top', 'top1', 'top3', 'top10'];
handler.tags = ['group'];
handler.command = /^(top|top1|top3|top10)$/i;
handler.admin = false; // Cambia a true si quieres que solo admins lo usen
handler.group = true;
handler.botAdmin = false; // Cambia a true si necesitas que el bot sea admin

export default handler;