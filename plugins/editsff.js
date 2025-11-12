import sharp from "sharp";

let originalImageBuffer = null;
let timer = null; // Variable para almacenar el ID del temporizador

const TIMEOUT_DURATION = 60 * 1000; // 1 minuto en milisegundos

// Función para limpiar el estado y el temporizador
const resetState = (m, conn) => {
    originalImageBuffer = null;
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    // Opcional: Notificar al usuario que la sesión expiró
    if (m && conn) {
        conn.sendMessage(m.chat, { text: "*❌ Sesión de edición de imagen expirada por inactividad. Por favor, inicia de nuevo con .addlogos*" }, { quoted: m });
    }
};

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // Si el comando no es addlogos, l1 o l2, salimos
        if (!['addlogos','plantillaff','editff','l1', 'l2'].includes(command)) return;

        // Si es un nuevo inicio (.addlogos), reseteamos el estado anterior por si acaso
        if (command === 'addlogos'||command === 'plantillaff'||command === 'editff') {
            resetState(null, null); // Limpia sin enviar mensaje de expiración
        } else {
            // Para .l1 y .l2, si no hay originalImageBuffer, significa que la sesión expiró o no se inició correctamente
            if (!originalImageBuffer) {
                throw `*❌ Sesión de edición de imagen no encontrada o expirada. Por favor, inicia de nuevo con ${usedPrefix}addlogos*. `;
            }
            // Si el comando no es addlogos, y estamos en una sesión activa, cancelamos el temporizador existente
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
        }

        if (command === 'addlogos'||command === 'plantillaff'||command === 'editff') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime || !/image\/(jpe?g|png)/.test(mime)) {
                throw `
> *Instrucciones de uso para superponer logos:*\n\n1. Responde a la **imagen original** con *${usedPrefix}addlogos*\n2. Responde a la **primera imagen (logo izquierdo)** con *${usedPrefix}l1*\n3. Responde a la **segunda imagen (logo derecho)** con *${usedPrefix}l2*
\n*Las imágenes se superpondrán con transparencia en los costados de la imagen original.*`;
            }

            originalImageBuffer = await (m.quoted ? m.quoted.download() : m.download());
            m.react("✅");
            m.reply(`*¡Imagen original recibida!* Ahora envía el primer logo con *${usedPrefix}l1*`);

            // Inicia el temporizador para la siguiente acción
            timer = setTimeout(() => resetState(m, conn), TIMEOUT_DURATION);

        } else if (command === 'l1') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime || !/image\/(jpe?g|png)/.test(mime)) throw `*Formato no compatible. Usa foto o png*`;

            const leftLogoBuffer = await (m.quoted ? m.quoted.download() : m.download());
            m.react("1️⃣");
            //m.reply(`*¡Primer logo recibido!* Procesando el lado izquierdo...`);

            const originalSharp = sharp(originalImageBuffer);
            const originalMetadata = await originalSharp.metadata();
            const originalWidth = originalMetadata.width;
            const originalHeight = originalMetadata.height;

            const leftLogoSharp = sharp(leftLogoBuffer);

            // Calcular las dimensiones objetivo: 50% del ancho y 50% del alto de la imagen original
            const targetLogoWidth = Math.max(1, Math.round(originalWidth / 2));
            const targetLogoHeight = Math.max(1, Math.round(originalHeight / 2));

            // 1. Redimensionar el logo al 50% del ancho y 50% del alto de la imagen original
            let resizedLeftLogo = leftLogoSharp
                .resize({
                    width: targetLogoWidth,
                    height: targetLogoHeight,
                    fit: sharp.fit.contain,
                    withoutEnlargement: true
                });

            // 2. Aplicar opacidad al logo redimensionado antes de componerlo
            const opacity = 0.25;
            const leftLogoWithOpacity = await resizedLeftLogo
                .png()
                .composite([{
                    input: Buffer.from([255, 255, 255, Math.floor(255 * opacity)]),
                    raw: { width: 1, height: 1, channels: 4 },
                    tile: true,
                    blend: 'dest-in'
                }])
                .toBuffer();

            const resizedLeftLogoMetadata = await sharp(leftLogoWithOpacity).metadata();

            // Calcular la posición para centrar el logo en la MITAD IZQUIERDA
            const xLeft = Math.floor(((originalWidth / 2) - resizedLeftLogoMetadata.width) / 2);
            const yLeft = Math.floor((originalHeight - resizedLeftLogoMetadata.height) / 2);

            originalImageBuffer = await originalSharp
                .composite([{ input: leftLogoWithOpacity, left: Math.max(0, xLeft), top: Math.max(0, yLeft), blend: 'over' }])
                .png()
                .toBuffer();

            //await conn.sendMessage(m.chat, { image: originalImageBuffer, caption: "*Así va quedando con el primer logo.* Envía el segundo logo con *" + usedPrefix + "l2*" }, { quoted: m });
            m.reply(`*¡Lado izquierdo agregado!* Ahora envía el segundo logo con *${usedPrefix}l2*`);

            // Reinicia el temporizador para la siguiente acción
            timer = setTimeout(() => resetState(m, conn), TIMEOUT_DURATION);

        } else if (command === 'l2') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime || !/image\/(jpe?g|png)/.test(mime)) throw `*Formato no compatible. Usa foto o png*`;

            const rightLogoBuffer = await (m.quoted ? m.quoted.download() : m.download());
            m.react("2️⃣");
            //m.reply(`*¡Segundo logo recibido!* Procesando el lado derecho y finalizando...`);

            const currentSharp = sharp(originalImageBuffer);
            const originalMetadata = await currentSharp.metadata();
            const originalWidth = originalMetadata.width;
            const originalHeight = originalMetadata.height;

            const rightLogoSharp = sharp(rightLogoBuffer);

            // Calcular las dimensiones objetivo: 50% del ancho y 50% del alto de la imagen original
            const targetLogoWidth = Math.max(1, Math.round(originalWidth / 2));
            const targetLogoHeight = Math.max(1, Math.round(originalHeight / 2));

            // 1. Redimensionar el logo al 50% del ancho y 50% del alto de la imagen original
            let resizedRightLogo = rightLogoSharp
                .resize({
                    width: targetLogoWidth,
                    height: targetLogoHeight,
                    fit: sharp.fit.contain,
                    withoutEnlargement: true
                });

            // 2. Aplicar opacidad al logo redimensionado antes de componerlo
            const opacity = 0.25;
            const rightLogoWithOpacity = await resizedRightLogo
                .png()
                .composite([{
                    input: Buffer.from([255, 255, 255, Math.floor(255 * opacity)]),
                    raw: { width: 1, height: 1, channels: 4 },
                    tile: true,
                    blend: 'dest-in'
                }])
                .toBuffer();

            const resizedRightLogoMetadata = await sharp(rightLogoWithOpacity).metadata();

            // Calcular la posición para centrar el logo en la MITAD DERECHA
            const xRight = Math.floor((originalWidth / 2) + (((originalWidth / 2) - resizedRightLogoMetadata.width) / 2));
            const yRight = Math.floor((originalHeight - resizedRightLogoMetadata.height) / 2);

            const finalBuffer = await currentSharp
                .composite([{ input: rightLogoWithOpacity, left: Math.max(0, xRight), top: Math.max(0, yRight), blend: 'over' }])
                .png()
                .toBuffer();

            const sentMsg = await conn.sendMessage(m.chat, { image: finalBuffer, caption: "> ✨ Plantilla FF" }, { quoted: m });

            await conn.sendMessage(
                m.chat,
                {
                    text: ".hd"
                },
                {
                    quoted: sentMsg  // Responde al mensaje que acabamos de enviar
                }
            );

            // Limpia el estado y el temporizador al finalizar con éxito
            resetState(null, null);

        }
    } catch (error) {
        console.error("Error en el comando addlogos/l1/l2:", error);
        m.reply(`*❌ Error al procesar tu solicitud:*\n${error.message || error}`);
        // También limpia el estado en caso de error
        resetState(null, null);
    }
};

handler.help = ["addlogos", "l1", "l2","plantillaff", "editff"];
handler.tags = ["image"];
handler.command = /^(addlogos|l1|l2|plantillaff|editff)$/i;

export default handler;