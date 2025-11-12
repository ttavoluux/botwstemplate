import { sticker } from '../lib/sticker.js';
import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchSticker = async (text, attempt = 1) => {
    try {
        const res = await axios.get('https://kepolu-brat.hf.space/brat', {
            params: { q: text },
            responseType: 'arraybuffer',
        });
        return res.data;
    } catch (err) {
        if (err.response?.status === 429 && attempt <= 3) {
            const retryAfter = err.response.headers['retry-after'] || 5;
            await delay(retryAfter * 1000);
            return fetchSticker(text, attempt + 1);
        }
        throw err;
    }
};

let handler = async (m, { conn, text }) => {
    if (!text) {
        //await m.react('⌛')
        return conn.sendMessage(m.chat, {
            text: `𝐍𝐞𝐜𝐞𝐬𝐢𝐭𝐨 𝐩𝐚𝐥𝐚𝐛𝐫𝐚𝐬 𝐩𝐚𝐫𝐚 𝐩𝐫𝐨𝐜𝐞𝐬𝐚𝐫 𝐥𝐚 𝐚𝐜𝐜𝐢ó𝐧.\𝐧\𝐧> 🌸 *𝐄𝐣𝐞𝐦𝐩𝐥𝐨:* .𝐛𝐫𝐚𝐭 𝐀𝐫𝐥𝐞𝐭𝐭𝐞𝐁𝐨𝐭𝐋𝐢𝐭𝐞 - 𝐌𝐃 𝐞𝐬 𝐢𝐧𝐜𝐫𝐞í𝐛𝐥𝐞`,
        }, { quoted: m });
    }

    // Reacciona con ⏳ al iniciar el procesamiento
    //await m.react('⏳')

    try {
        const buffer = await fetchSticker(text);
        const stiker = await sticker(buffer, false,
'ArletteBotLite - MD\n\n', global.botname, '\n\n', global.autor);

        if (stiker) {
            // Reacciona con ✅ al enviar el sticker exitosamente
            //await m.react('✅')
            return conn.sendFile(m.chat, stiker, 'brat.webp', '', m);
        } else {
            throw new Error(global.msgError);
        }
    } catch (err) {
        // Reacciona con 💀 si hay error
        //await m.react('💀')
        console.error(err);
        return conn.sendMessage(m.chat, {
            text: msgError,
        }, { quoted: m });
    }
};

handler.command = ['brat'];
handler.tags = ['sticker'];
handler.help = ['brat *<texto>*'];

export default handler;