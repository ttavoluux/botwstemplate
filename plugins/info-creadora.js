let handler = async (m, { conn }) => {
    try {
        // Definir el contacto (fkontak) que se enviará
        let fkontak = {
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
        }

        // Definir el mensaje que se enviará con el contacto
        const cat = `${packname} 
* *Versión: ${vs}*

*si deseas comprar una version o tienes duddas de ArletteBot contactame >3*


> 🖤 ArletteBot Ultimate 🖤 
🌸 *version premium*

> 🖤 ArletteBot Lite 🖤 
🌸 *version free*
`

        // Ruta de la imagen a adjuntar
        let imagePath = './media/menus/img1.jpg'; // Asegúrate de que esta ruta sea correcta en tu sistema

        // Enviar el mensaje con la imagen y el texto

        await conn.sendFile(m.chat, imagen4, 'lp.jpg', cat);

        // Enviar solo el contacto con la estructura proporcionada
        await conn.sendContactArray(m.chat, [official[3]], null, { quoted: fkontak });

    } catch (e) {
        console.log('Error:', e);
    }
}

handler.command = /^(owner|creadora|comprarbot)$/i; // Cambia el comando según tu preferencia

export default handler;

