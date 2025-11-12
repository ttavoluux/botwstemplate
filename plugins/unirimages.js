import sharp from "sharp";

let img1Buffer = null; // Usaremos 'Buffer' para Sharp
let img2Buffer = null; // Usaremos 'Buffer' para Sharp

const handler = async (m, { conn, usedPrefix, command }) => {
    try {
        // Comando i1 para la primera imagen
        if (command === 'i1') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime || !/image\/(jpe?g|png)/.test(mime)) {
                throw `
> Instrucciones de uso:\n\n1. Enviar las dos imágenes\n2. Responder (.i1) [primera imagen]\n3. Responder (.i2) [segunda imagen]\n\nPara mejores resultados envíe imágenes del mismo tamaño 🖤`;
            }

            // Descargar la primera imagen
            img1Buffer = await (m.quoted ? m.quoted.download() : m.download());
            m.react("1⃣");
            m.reply(`> Primera imagen recibida. Ahora envía la segunda imagen con *${usedPrefix}i2*`);
        }

        // Comando i2 para la segunda imagen
        else if (command === 'i2') {
            let mime = (m.quoted ? m.quoted : m).mimetype || m.mediaType || "";
            if (!mime || !/image\/(jpe?g|png)/.test(mime)) {
                throw `╰⊱⚠️⊱ *ADVERTENCIA | WARNING* ⊱⚠️⊱╮\n\nEL FORMATO DEL ARCHIVO (${mime}) NO ES COMPATIBLE, ENVÍA O RESPONDE A UNA FOTO`;
            }

            // Descargar la segunda imagen
            img2Buffer = await (m.quoted ? m.quoted.download() : m.download());

            // Verificar si ya se recibió la primera imagen
            if (!img1Buffer) {
                throw "*❌ No has enviado una primera imagen. Usa el comando .i1 para enviar la primera imagen*";
            }

            m.react("2⃣");
            m.reply(`> Intentando unir las imágenes...`);

            // Usar Sharp para combinar las imágenes verticalmente
            const image1Sharp = sharp(img1Buffer);
            const image2Sharp = sharp(img2Buffer);

            const metadata1 = await image1Sharp.metadata();
            const metadata2 = await image2Sharp.metadata();

            // El ancho combinado será el MÍNIMO de los anchos de ambas imágenes
            const combinedWidth = Math.min(metadata1.width, metadata2.width);
            // La altura total será la SUMA de las alturas de ambas imágenes
            const combinedHeight = metadata1.height + metadata2.height;

            // Redimensionar y/o recortar ambas imágenes para que tengan el 'combinedWidth'
            // Sharp puede redimensionar y recortar automáticamente con 'cover' si las dimensiones no coinciden
            const resizedImage1Buffer = await image1Sharp
                .resize({ width: combinedWidth, fit: sharp.fit.cover, position: sharp.strategy.attention }) // Recortar para cubrir el ancho, centrado en el punto de atención
                .toBuffer();

            const resizedImage2Buffer = await image2Sharp
                .resize({ width: combinedWidth, fit: sharp.fit.cover, position: sharp.strategy.attention }) // Recortar para cubrir el ancho, centrado en el punto de atención
                .toBuffer();

            // Recalcular metadatos después de redimensionar/recortar para asegurar las alturas correctas
            const finalMetadata1 = await sharp(resizedImage1Buffer).metadata();
            const finalMetadata2 = await sharp(resizedImage2Buffer).metadata();

            // Crear una nueva imagen (lienzo) con el tamaño combinado
            const combinedSharp = sharp({
                create: {
                    width: combinedWidth,
                    height: combinedHeight,
                    channels: 4, // 4 canales para RGBA (para posible transparencia si se necesita)
                    background: { r: 0, g: 0, b: 0, alpha: 0 } // Fondo transparente por defecto
                }
            });

            // Componer las imágenes en el lienzo
            const finalBuffer = await combinedSharp
                .composite([
                    { input: resizedImage1Buffer, top: 0, left: 0 }, // Primera imagen en la parte superior
                    { input: resizedImage2Buffer, top: finalMetadata1.height, left: 0 } // Segunda imagen debajo de la primera
                ])
                .png() // Salida como PNG para mantener la calidad y posible transparencia
                .toBuffer();

            const sentMsg = await conn.sendMessage(m.chat, { image: finalBuffer, caption: "> ✨ Plantilla FF" }, { quoted: m });

            // Opcional: Si quieres ejecutar .hd en la imagen recién enviada


            // Limpiar los buffers para liberar memoria
            img1Buffer = null;
            img2Buffer = null;
        }
    } catch (error) {
        console.error("Error al unir imágenes con Sharp:", error);
        m.reply(`*❌ Error al procesar tu solicitud:*\n${error.message || error}`);
        // Limpiar buffers en caso de error
        img1Buffer = null;
        img2Buffer = null;
    }
};

handler.help = ["i1", "i2"];
handler.tags = ["image"];
handler.command = /^(i1|i2)$/i;

export default handler;