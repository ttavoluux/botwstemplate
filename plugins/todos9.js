let handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command }) => {


    var texto = '📍 @todoos ✨'
    var texto2 = '✨ AVISO :'
    var texto3 = ' '
    var texto4 = ' '
    let numParticipantes = participants.length;

    if (text.length > 1) {
        texto = texto2
        texto3 = '*!'
        texto4 = '!*'
    }

    let pesan = args.join` `
    let teks = ''

    if (participants.length <= 5) {
        teks += "> Se encontraron problemas de compatibilidad (.estado)\n\n";
    }

    if (numParticipantes > 100) {
        teks += '❗ *El grupo supera los 100 participantes considere usar .aviso* ❗\n\n';
    }

    teks += ` *${texto}* ${texto3}${text.toUpperCase()}${texto4} \n\n`;
    teks += '🎨 *REDISEÑO*🎨\n\n> .ship @user1 @user2\n> .formarpareja | .nuevoship\n\n🎨 *Nuevo diseño de bienvenidas (activar .on welcome)*\n\n';

    if (numParticipantes <= 20) {
        const americaCountries = {
            "1": "🇺🇸", // Estados Unidos/Canadá
            "52": "🇲🇽", // México
            // ... (resto de códigos de país)
        };

        let groupedParticipants = {};

        for (let mem of participants) {
            let userId = mem.id;
            let phoneNumber = userId.includes('@') ? userId.split('@')[0] : userId;
            let displayId = phoneNumber; // Parte numérica (para la mención)
            let fullId = userId.replace('@s.whatsapp.net', ''); // ID completo (para debug)

            // Detección de bandera (solo si es numérico)
            let flag = "🌍";
            if (!isNaN(phoneNumber)) {
                let lada = phoneNumber.slice(0, 3);
                flag = americaCountries[lada] || americaCountries[phoneNumber.slice(0, 2)] ||
                    (phoneNumber.startsWith('1') ? americaCountries['1'] : "🌍");
            }

            if (!groupedParticipants[flag]) {
                groupedParticipants[flag] = [];
            }

            groupedParticipants[flag].push({...mem, displayId, fullId});
        }

        for (let flag in groupedParticipants) {
            groupedParticipants[flag].forEach(mem => {
                teks += `${flag} *@${mem.displayId}*\n`; // Formato original (bandera + mención numérica)
                teks += `> ID real: ${mem.fullId}\n\n`; // Línea adicional con el ID completo
            });
        }

        teks += `\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ`;
        conn.sendMessage(m.chat, {
            text: teks,
            mentions: participants.map(a => a.id)
        });
    } else {
        for (let mem of participants) {
            let phoneNumber = mem.id.split('@')[0];
            let fullId = mem.id.replace('@s.whatsapp.net', '');
            teks += `*@${phoneNumber}*\n`; // Formato original (solo mención numérica)
            teks += `> ID real: ${fullId}\n\n`; // Línea adicional con el ID completo
        }

        teks += `\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ`;
        conn.sendMessage(m.chat, {
            text: teks,
            mentions: participants.map(a => a.id)
        });
    }
}

handler.command = /^(todos9)$/i
handler.admin = false
handler.group = true
handler.botAdmin = false
export default handler