let handler = async (m, { conn, command, usedPrefix,text}) => {
    let name = await conn.getName(m.sender)

    const allowedNumber = '169578613198863';
    const senderNumber = m.sender.split('@')[0];
    if (command === 'sally') {
        if (!text) {
            return
        }else if(text === "cump"){
            let number = "593980305804@s.whatsapp.net"
            const message = {
                text: `¡Feliz cumpleaños @593980305804, te queremos muchísimo gracias por ser parte de esto! 💗`,
                mentions: [number], // Esto hace que la mención sea interactiva
            };

            await conn.sendMessage(m.chat, message, { quoted: m });
        }

    }else if(command === 'niña') {
        if (!text) {
            return
        }else if(text === "linda"){
            if (senderNumber !== allowedNumber) {
                return
            }
            let number = "593980305804@s.whatsapp.net"
            const message = {
                text: `@593980305804 Hola, cariño se que hoy es un día especial para  tí, y más que desearte quiero agradecerte por estar siempre conmigo y apoyarme en los momentos más difíciles, no quiero sonar muy cursi porque sabes que no me gusta, aún así no me importa escribirte algo que me salga del corazón, ten un hermoso Felíz cumpleaños y que lo disfrutes con todas las personas que te quieren a tu alrededor, recuerda que siempre estaré contigo así tengamos muchos problemas, pásala bien mi niña linda, te quiero con el alma ❤️`,
                mentions: [number], // Esto hace que la mención sea interactiva
            };

            await conn.sendMessage(m.chat, message, { quoted: m });
        }
    }

}

handler.help = ['funcumple']
handler.tags = ['funcumple']
handler.command = /^(niña|sally)$/i
export default handler

