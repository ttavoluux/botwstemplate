// import { fileURLToPath } from 'url';
// import path from 'path';
// import fs from 'fs';
// import { Readable } from 'stream';
// import { Innertube } from 'youtubei.js';
// import yts from 'yt-search';
//
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
//
// const handler = async (m, { conn, args, text, usedPrefix, command }) => {
//     if (!text) return conn.reply(m.chat, `Ejemplo: *${usedPrefix + command} Billie Eilish - Bellyache*`, m);
//
//     try {
//         // Buscar video
//         const searchResults = await yts(text);
//         if (!searchResults.videos.length) return conn.reply(m.chat, '❌ No se encontraron resultados', m);
//
//         const video = searchResults.videos[0];
//         const videoId = video.videoId;
//         // Alcatrazz - Double Man 🖤
//         await conn.reply(m.chat, `🎶 *${video.title}* 🖤 ...`, m);
//
//         // Configurar rutas
//         const musicDir = path.join(__dirname, '../musica');
//         if (!fs.existsSync(musicDir)) fs.mkdirSync(musicDir, { recursive: true });
//
//         const fileName = `${video.title.replace(/[<>:"/\\|?*]/g, '')}.mp3`;
//         const filePath = path.join(musicDir, fileName);
//
//         // Descargar con youtubei.js
//         const youtube = await Innertube.create({cookie:'LOGIN_INFO=AFmmF2swRQIgER6576KXYqMo6_r23NLxhgt3mAAHxf3ErxTVjuhpSjkCIQDqhLy4-i_3s036SpeV1DB1M9-Xxh5rCFA0ihyMDRSFrw:QUQ3MjNmd0hJRkRNOEw1THNHa2s5ZTFySHZRRUVIeXhrRVRsTWJOMUdRRmo0RlhxNERaSU9NcjR1TTEyb09nbnR5cGtuT1VDd3dfMEhtQkVITkxuVFpTSUVSNTNLOGl3aUZLVjVyTlJXQ0ZDV0N1SE1lOV9uUE9uODFYVkVVdW15alZvckJYdHJidzY1dDRNTkVLR29RbjJuX2U5RE05dVhR; VISITOR_INFO1_LIVE=xwxCLEzTkP8; VISITOR_PRIVACY_METADATA=CgJNWBIEGgAgaA%3D%3D; PREF=f6=40000000&tz=America.Mexico_City&f7=100; HSID=AnTj2EnLY1oeptkUj; SSID=Aa2C5FOwP4zl8X6n2; APISID=IqvV-SQjZkiMRueM/A7kyU_RtEqCshvt6I; SAPISID=A51N1bRVHeagJsxV/AqL3I-hRflvNAdB4j; __Secure-1PAPISID=A51N1bRVHeagJsxV/AqL3I-hRflvNAdB4j; __Secure-3PAPISID=A51N1bRVHeagJsxV/AqL3I-hRflvNAdB4j; SID=g.a0000AhSymS6mpJN-jDN5pSlXzx2tdHgZG2A_JhPY82Ry2JOXCtjaMoi5sIi8_kt03P87u5ibgACgYKAecSARYSFQHGX2MiABprzacjUfgxzBWlbZLhSxoVAUF8yKqfvztnOZoVBnHmvEGFW7iv0076; __Secure-1PSID=g.a0000AhSymS6mpJN-jDN5pSlXzx2tdHgZG2A_JhPY82Ry2JOXCtjNfAghDTZ65bWv-jgoGZePAACgYKARESARYSFQHGX2Mim4bKa_1BGar5AwAYbZ1i5BoVAUF8yKphSfclR84jm06ODJKrv3FQ0076; __Secure-3PSID=g.a0000AhSymS6mpJN-jDN5pSlXzx2tdHgZG2A_JhPY82Ry2JOXCtjLBqFstqZlGPcIjGngo1yVgACgYKAYMSARYSFQHGX2MiLdI-CRcZCngobd3f0QwcuxoVAUF8yKqgzkFtxEgnNXmTt1bE8IY50076; __Secure-ROLLOUT_TOKEN=CMSvrvy15c7-lgEQw82DybKTjQMYl7qB5Ln8jgM%3D; YSC=zt5B-EjA7zk; __Secure-1PSIDTS=sidts-CjQB5H03P4db65SHUe-LV9PZAb7vYTPSYaKG4hI9wd39_-4HOxvd32tYwm5pvS5uajHS8rwuEAA; __Secure-3PSIDTS=sidts-CjQB5H03P4db65SHUe-LV9PZAb7vYTPSYaKG4hI9wd39_-4HOxvd32tYwm5pvS5uajHS8rwuEAA; SIDCC=AKEyXzXFBWDmVYBPoimSpIElmG8F8V9n5qF4v5FLX92r7NFW7a1a8uREcVKLYBqyB7HmIq-k8g; __Secure-1PSIDCC=AKEyXzUuzbPvfLMvS66sQTK6pbLYmE2wrBadYV8Y1hYDyq6wehBX_tdez6apaphdNZMLyOCNckA; __Secure-3PSIDCC=AKEyXzWgo_kMqZQJJiR3C4_prrHxQWngmp82NEE3Gu7-OeFqqbLtYUq7R_h_DJyQlTlbxQ-R7HY'});
//         const webStream = await youtube.download(videoId, {
//             quality: 'bestefficiency',
//             //client: "WEB"
//             client: "YTMUSIC"
//         });
//
//         // Convertir y guardar
//         const fileStream = fs.createWriteStream(filePath);
//         await Readable.fromWeb(webStream).pipe(fileStream);
//
//         await new Promise((resolve, reject) => {
//             fileStream.on('finish', resolve);
//             fileStream.on('error', reject);
//         });
//
//         // Enviar como archivo (no como audio)
//
//
//         await conn.sendMessage(m.chat, {
//             audio: fs.readFileSync(filePath),
//             mimetype: 'audio/mpeg',
//             fileName: fileName,
//             ptt: false // No es mensaje de voz
//         }, { quoted: m });
//
//         // Opcional: Eliminar después de enviar
//         fs.unlinkSync(filePath);
//
//     } catch (error) {
//         console.error(error);
//         conn.reply(m.chat, `❌ Error: ${error.message}`, m);
//     }
// };
//
// handler.command = /^(audio|play|musica|spotify)$/i;
// handler.desc = "Descargar música de YouTube";
// handler.help = ["audio <búsqueda>", "play <búsqueda>"];
// export default handler;