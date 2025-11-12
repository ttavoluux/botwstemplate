import FormData from 'form-data';
import axios from 'axios';
import Jimp from 'jimp';
import fs from 'fs';
import path from 'path';

// Configuración
// const DAILY_LIMIT = 2;
// const USAGE_FILE = './dailyUsage.json';
//
// // Cargar o inicializar datos de uso
// let dailyUsage = {};
// try {
//     dailyUsage = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf-8'));
// } catch (e) {
//     dailyUsage = {};
//     fs.writeFileSync(USAGE_FILE, JSON.stringify(dailyUsage, null, 2));
// }
//
let isProcessing = false;

const handler = async (m, { conn, usedPrefix, command }) => {
    // const userId = m.sender;
    // const currentDate = new Date().toDateString();

    // Inicializar o resetear contador si es un nuevo día
    // if (!dailyUsage[userId] || dailyUsage[userId].lastDate !== currentDate) {
    //     dailyUsage[userId] = {
    //         count: 0,
    //         lastDate: currentDate
    //     };
    //     saveUsageData();
    // }

    // Verificar límite
    // if (dailyUsage[userId].count >= DAILY_LIMIT) {
    //     return m.reply(`> ⚠️ *Has alcanzado el límite de ${DAILY_LIMIT} usos diarios*.\n> Por favor, vuelve mañana.`);
    // }

    if (isProcessing) {
        return m.reply("> ⏳ *Por favor, espera a que la operación anterior termine.*");
    }

    isProcessing = true;
    try {
        // Verificar y obtener imagen
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || q.mediaType || "";
        if (!mime) throw `╰⊱❗️⊱ *𝙇𝙊 𝙐𝙎𝙊́ 𝙈𝘼𝙇 | 𝙐𝙎𝙀𝘿 𝙄𝙏 𝙒𝙍𝙊𝙉𝙂* ⊱❗️⊱╮\n\n𝙀𝙉𝙑𝙄𝙀 𝙐𝙉𝘼 �𝙄𝙈𝘼𝙂𝙀𝙉 𝙊 𝙍𝙀𝙎𝙋𝙊𝙉𝘿𝘼 𝘼 𝙐𝙉𝘼 𝙄𝙈𝘼𝙂𝙀𝙉 𝘾𝙊𝙉 𝙀𝙇 𝘾𝙊𝙈𝘼𝙉𝘿𝙊 ${usedPrefix + command}`;
        if (!/image\/(jpe?g|png)/.test(mime)) throw `╰⊱⚠️⊱ *𝘼𝘿𝙑𝙀𝙍𝙏𝙀𝙉𝘾𝙄𝘼 | 𝙒𝘼𝙍𝙉𝙄𝙉𝙂* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;

        m.reply("> *HD+ By ArletteBot 🖤* ... \n\n*(Mejorando imagen, podría tardar hasta 1 min.)*");
        let img = await q.download?.();

        let enhancedImage;
        let attempts = 0;
        const maxAttempts = 6;

        while (attempts < maxAttempts) {
            attempts++;
            try {
                enhancedImage = await enhanceImageAxios(img, 60000);
                break;
            } catch (error) {
                console.error(`Intento ${attempts} fallido:`, error);
                if (attempts < maxAttempts) {
                    await new Promise(resolve => setTimeout(resolve, 5000));
                } else {
                    throw error;
                }
            }
        }

        // Incrementar contador y guardar
        // dailyUsage[userId].count++;
        // saveUsageData();

        // Convertir a PNG
        const jimpImage = await Jimp.read(enhancedImage);
        const pngBuffer = await jimpImage.getBufferAsync(Jimp.MIME_PNG);

        // Enviar resultados
        await conn.sendMessage(m.chat, {
            image: enhancedImage,
            caption: `> By ArletteBot++ 🖤`
        }, { quoted: m });

        await conn.sendMessage(m.chat, {
            document: pngBuffer,
            fileName: "imagen_mejorada.png",
            mimetype: "image/png",
            caption: `> *PNG*`
        });

    } catch (e) {
        console.error(e);
        m.reply("> ❌ Algo falló. Envía la imagen e intenta nuevamente.");
    } finally {
        isProcessing = false;
    }
};

// Función para guardar los datos de uso
function saveUsageData() {
    fs.writeFile(USAGE_FILE, JSON.stringify(dailyUsage, null, 2), (err) => {
        if (err) console.error('Error guardando datos de uso:', err);
    });
}

// Función para mejorar la imagen (sin cambios)
async function enhanceImageAxios(imageData, timeout = 30000) {
    const formData = new FormData();
    formData.append('image', imageData, {
        filename: 'image.jpg',
        contentType: 'image/jpeg'
    });

    const config = {
        method: 'post',
        url: 'https://api.vyro.ai/v1/imagine/api/upscale/',
        headers: {
            'Authorization': 'Bearer vk-mwfvyUQ2D1mC7OGlNP7T5ZPC6YlFk30fVMyDNhMQB92FNM',
            ...formData.getHeaders(),
        },
        data: formData,
        timeout: timeout,
        responseType: 'arraybuffer'
    };

    try {
        const response = await axios(config);
        if (response.status !== 200) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        return Buffer.from(response.data, 'binary');
    } catch (error) {
        console.error('Error en enhanceImageAxios:', error);
        throw error;
    }
}

handler.help = ["remini", "hd", "enhance"];
handler.tags = ["ai", "tools"];
handler.command = ["hd", "hd+", "4k"];
export default handler;