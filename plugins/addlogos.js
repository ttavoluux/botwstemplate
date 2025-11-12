import sharp from "sharp";

let originalImageBuffer = null;
let timer = null; // Variable para almacenar el ID del temporizador
let instructionMessageKey = null; // Variable para almacenar la clave del mensaje de instrucción
// Variables para almacenar las claves de los mensajes finales a eliminar
let finalImageMessageKey = null;
let hdCommandMessageKey = null;

const TIMEOUT_DURATION = 60 * 1000; // 1 minuto en milisegundos
const FINAL_MESSAGE_DELETE_DELAY = 10 * 1000; // 10 segundos en milisegundos

// Función para limpiar el estado, el temporizador y los mensajes
const resetState = async (m, conn) => {
    originalImageBuffer = null;
    if (timer) {
        clearTimeout(timer);
        timer = null;
    }
    // Intentar eliminar el mensaje de instrucción si existe
    if (instructionMessageKey && m && conn) {
        try {
            await conn.sendMessage(m.chat, { delete: instructionMessageKey });
            instructionMessageKey = null;
        } catch (e) {
            console.error("Error al intentar eliminar mensaje de instrucción:", e);
        }
    }
    // Opcional: Notificar al usuario que la sesión expiró (si 'm' y 'conn' están disponibles)
    if (m && conn) {
        conn.sendMessage(m.chat, { text: "*❌ Sesión de edición de imagen expirada por inactividad. Por favor, inicia de nuevo con .addlogos*" }, { quoted: m });
    }
    // No eliminar los mensajes finales aquí, ya que tienen su propio temporizador
};

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        if (!['addlogos', 'plantillaff', 'editff', 'l1', 'l2'].includes(command)) return;

        if (command === 'addlogos' || command === 'plantillaff' || command === 'editff') {
            await resetState(null, null); // Limpia sin enviar mensaje de expiración
        } else {
            if (!originalImageBuffer) {
                if (instructionMessageKey && m && conn) {
                    try {
                        await conn.sendMessage(m.chat, { delete: instructionMessageKey });
                        instructionMessageKey = null;
                    } catch (e) {
                        console.error("Error al intentar eliminar mensaje de instrucción:", e);
                    }
                }
                throw `*❌ Sesión de edición de imagen no encontrada o expirada. Por favor, inicia de nuevo con ${usedPrefix}addlogos*. `;
            }
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            if (instructionMessageKey && m && conn) {
                try {
                    await conn.sendMessage(m.chat, { delete: instructionMessageKey });
                    instructionMessageKey = null;
                } catch (e) {
                    console.error("Error al intentar eliminar mensaje de instrucción anterior:", e);
                }
            }
        }

        if (command === 'addlogos' || command === 'plantillaff' || command === 'editff') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime || !/image\/(jpe?g|png)/.test(mime)) {
                throw `🌸 *Edits FF By ArlettteBot* 🖤

> Uso: 

> 1. Enviar plantilla/logo1/logo2
> 2. Responder a la plantilla .editff
> 3. Responde al primer logo con .l1
> 4. Espere a que se solicite usar .l2
> 5. Responde al segundo logo con .l2

- Logo1 Izq / Logo2 Der

Opcional puedes unir las plantillas con i1/i2
> (⚠️ Comando Experimental)
> Se recomienda enviar los 3 archivos antes de usar los comandos`;
            }

            originalImageBuffer = await (m.quoted ? m.quoted.download() : m.download());
            await m.react("✅");
            const sentMsg = await m.reply(`*¡Imagen original recibida!* Ahora envía el primer logo con *${usedPrefix}l1*`);
            instructionMessageKey = sentMsg.key;

            timer = setTimeout(() => resetState(m, conn), TIMEOUT_DURATION);

        } else if (command === 'l1') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime || !/image\/(jpe?g|png)/.test(mime)) throw `*Formato no compatible. Usa foto o png*`;

            const leftLogoBuffer = await (m.quoted ? m.quoted.download() : m.download());
            await m.react("1️⃣");

            const originalSharp = sharp(originalImageBuffer);
            const originalMetadata = await originalSharp.metadata();
            const originalWidth = originalMetadata.width;
            const originalHeight = originalMetadata.height;

            const leftLogoSharp = sharp(leftLogoBuffer);

            const targetLogoWidth = Math.max(1, Math.round(originalWidth / 2));
            const targetLogoHeight = Math.max(1, Math.round(originalHeight / 2));

            let resizedLeftLogo = leftLogoSharp
                .resize({
                    width: targetLogoWidth,
                    height: targetLogoHeight,
                    fit: sharp.fit.contain,
                    withoutEnlargement: true
                });

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

            const xLeft = Math.floor(((originalWidth / 2) - resizedLeftLogoMetadata.width) / 2);
            const yLeft = Math.floor((originalHeight - resizedLeftLogoMetadata.height) / 2);

            originalImageBuffer = await originalSharp
                .composite([{ input: leftLogoWithOpacity, left: Math.max(0, xLeft), top: Math.max(0, yLeft), blend: 'over' }])
                .png()
                .toBuffer();

            const sentMsg = await m.reply(`*¡Lado izquierdo agregado!* Ahora envía el segundo logo con *${usedPrefix}l2*`);
            instructionMessageKey = sentMsg.key;

            timer = setTimeout(() => resetState(m, conn), TIMEOUT_DURATION);

        } else if (command === 'l2') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime || !/image\/(jpe?g|png)/.test(mime)) throw `*Formato no compatible. Usa foto o png*`;

            const rightLogoBuffer = await (m.quoted ? m.quoted.download() : m.download());
            await m.react("2️⃣");

            const currentSharp = sharp(originalImageBuffer);
            const originalMetadata = await currentSharp.metadata();
            const originalWidth = originalMetadata.width;
            const originalHeight = originalMetadata.height;

            const rightLogoSharp = sharp(rightLogoBuffer);

            const targetLogoWidth = Math.max(1, Math.round(originalWidth / 2));
            const targetLogoHeight = Math.max(1, Math.round(originalHeight / 2));

            let resizedRightLogo = rightLogoSharp
                .resize({
                    width: targetLogoWidth,
                    height: targetLogoHeight,
                    fit: sharp.fit.contain,
                    withoutEnlargement: true
                });

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

            const xRight = Math.floor((originalWidth / 2) + (((originalWidth / 2) - resizedRightLogoMetadata.width) / 2));
            const yRight = Math.floor((originalHeight - resizedRightLogoMetadata.height) / 2);

            const finalBuffer = await currentSharp
                .composite([{ input: rightLogoWithOpacity, left: Math.max(0, xRight), top: Math.max(0, yRight), blend: 'over' }])
                .png()
                .toBuffer();

            // Mensaje de la imagen final
            const sentMsg = await conn.sendMessage(m.chat, { image: finalBuffer, caption: "> ✨ Plantilla FF" }, { quoted: m });
            finalImageMessageKey = sentMsg.key; // Guarda la clave del mensaje de la imagen final

            // Comando .hd respondiendo al mensaje de la imagen final
            const sentHdMsg = await conn.sendMessage(
                m.chat,
                {
                    text: ".hd"
                },
                {
                    quoted: sentMsg
                }
            );
            hdCommandMessageKey = sentHdMsg.key; // Guarda la clave del mensaje ".hd"

            // Programa la eliminación de la imagen final y el comando .hd después de 10 segundos
            setTimeout(async () => {
                if (finalImageMessageKey && m && conn) {
                    try {
                        await conn.sendMessage(m.chat, { delete: finalImageMessageKey });
                    } catch (e) {
                        console.error("Error al intentar eliminar mensaje de imagen final:", e);
                    }
                }
                if (hdCommandMessageKey && m && conn) {
                    try {
                        await conn.sendMessage(m.chat, { delete: hdCommandMessageKey });
                    } catch (e) {
                        console.error("Error al intentar eliminar mensaje de comando .hd:", e);
                    }
                }
                // Resetea las claves después de intentar la eliminación
                finalImageMessageKey = null;
                hdCommandMessageKey = null;
            }, FINAL_MESSAGE_DELETE_DELAY);

            // Elimina el último mensaje de instrucción
            if (instructionMessageKey && m && conn) {
                try {
                    await conn.sendMessage(m.chat, { delete: instructionMessageKey });
                    instructionMessageKey = null;
                } catch (e) {
                    console.error("Error al intentar eliminar el último mensaje de instrucción:", e);
                }
            }

            // Limpia el estado y el temporizador al finalizar con éxito
            await resetState(null, null);

        }
    } catch (error) {
        console.error("Error en el comando addlogos/l1/l2:", error);
        // Si hay un error, intentamos eliminar el mensaje de instrucción
        if (instructionMessageKey && m && conn) {
            try {
                await conn.sendMessage(m.chat, { delete: instructionMessageKey });
                instructionMessageKey = null;
            } catch (e) {
                console.error("Error al intentar eliminar mensaje de instrucción en caso de error:", e);
            }
        }
        await conn.sendFile(m.chat, imagen43, 'lp.jpg', error.message || error);
        // También limpia el estado en caso de error
        await resetState(null, null);
    }
};

handler.help = ["addlogos", "l1", "l2", "plantillaff", "editff"];
handler.tags = ["image"];
handler.command = /^(addlogos|l1|l2|plantillaff|editff)$/i;

export default handler;