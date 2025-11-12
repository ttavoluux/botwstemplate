import FormData from 'form-data';
import axios from 'axios';
import fs from 'fs';
import Jimp from "jimp";// Lo importamos aunque no lo usemos directamente para ser consistentes con tu ejemplo

// Variable para controlar si una operación está en curso
let isProcessing = false;

const handler = async (m, { conn, usedPrefix, command }) => {
    if (isProcessing) {
        return m.reply("> ⏳ *Por favor, espera a que la operación anterior termine.*");
    }

    isProcessing = true;
    try {
        // Verificar y obtener la imagen
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 𝙄𝙈𝘼𝙌𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`;
        if (!/image\/(jpe?g|png)/.test(mime)) throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;

        m.reply("> *By ArletteBot 🖤* ... \n\n*(Borrando Fondo, podría tardar hasta 1 min.)*");
        let img = await q.download?.();

        let enhancedImage;
        let attempts = 0;
        const maxAttempts = 3;

        while (attempts < maxAttempts) {
            attempts++;
            try {
                enhancedImage = await enhanceImageAxios(img, 60000); // Timeout de 60 segundos
                break; // Si la llamada tiene éxito, sal del bucle
            } catch (error) {
                console.error(`Intento ${attempts} fallido:`, error);
                if (attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 5000)); // Esperar 5 segundos antes de reintentar
                    //m.reply(`> Intentando de nuevo (${attempts}/${maxAttempts})...`);
                } else {
                    throw error; // Si todos los intentos fallan, lanza el error original
                }
            }
        }

//         await conn.sendMessage(m.chat, {
//             image: enhancedImage,
//             caption: `*> ✅ By ArletteBot 🖤*
//
// > 🌸Recuerda usar correctamente *ArletteBot Commutity Edition* ✨`
//         }, { quoted: m });

        const jimpImage = await Jimp.read(enhancedImage);
        const pngBuffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);

        await conn.sendMessage(m.chat, {
            document: pngBuffer,
            fileName: "Logo.png",
            mimetype: "image/png",
            caption: `> *Logo sin Fondo*`
        });

    } catch (e) {
        console.error(e);
        m.reply("> Comando en mantenimiento <3 .... ");
    } finally {
        isProcessing = false;
    }
};

handler.tags = ["ai", "tools"];
handler.command = ["removef", "borrarfondo", "removefondo","quitarfondo"];
export default handler;

async function enhanceImageAxios(imageData, timeout = 30000) {
    const formData = new FormData();
    formData.append('image', imageData, {
        filename: 'image.jpg',
        contentType: 'image/jpeg'
    });

    const config = {
        method: 'post',
        url: 'https://api.vyro.ai/v2/image/background/remover',
        headers: {
            'Authorization': 'Bearer vk-Jsm8IwZLEf7uCSyt4DiUieTxDGqL8iQ0yJ63pU26lWDzD', // Reemplaza con tu API key real
            ...formData.getHeaders(),
        },
        data: formData,
        timeout: timeout,
        responseType: 'arraybuffer' // Importante para recibir la imagen como buffer
    };

    try {
        const response = await axios(config);
        if (response.status !== 200) {
            console.error('API request failed:', response.status, response.data);
            throw new Error(`API request failed with status ${response.status}`);
        }
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error in enhanceImageAxios:', error);
        throw error;
    }
}