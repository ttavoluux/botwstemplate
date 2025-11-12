import sharp from 'sharp';
import fs from 'fs';
import axios from 'axios';
import path from 'path';

let handler = async (m, { conn, command, usedPrefix, text, groupMetadata }) => {
    let tempFiles = []; // Array para rastrear archivos temporales
    
    try {
        const mentioned = m.mentionedJid || [];
        let participants = groupMetadata.participants.map(p => p.id).filter(id => id !== conn.user.jid);
        
        if (participants.length < 2) {
            return m.reply('⚠️ Se necesitan al menos 2 personas en el grupo para formar una pareja.');
        }

        let jid1, jid2;

        // Si se mencionaron exactamente 2 usuarios, usar esos
        if (mentioned.length === 2) {
            jid1 = mentioned[0];
            jid2 = mentioned[1];
            
            // Verificar que ambos usuarios estén en el grupo
            if (!participants.includes(jid1) || !participants.includes(jid2)) {
                return m.reply('⚠️ Ambos usuarios deben estar en el grupo para formar una pareja.');
            }
        } 
        // Si se mencionó solo 1 usuario, emparejar con alguien aleatorio
        else if (mentioned.length === 1) {
            jid1 = mentioned[0];
            if (!participants.includes(jid1)) {
                return m.reply('⚠️ El usuario mencionado debe estar en el grupo.');
            }
            
            // Filtrar al usuario mencionado y seleccionar otro aleatoriamente
            const availableUsers = participants.filter(id => id !== jid1);
            if (availableUsers.length === 0) {
                return m.reply('⚠️ No hay otros usuarios disponibles para emparejar.');
            }
            jid2 = availableUsers[Math.floor(Math.random() * availableUsers.length)];
        }
        // Si no se mencionó a nadie, seleccionar dos usuarios aleatorios
        else if (mentioned.length === 0) {
            jid1 = participants[Math.floor(Math.random() * participants.length)];
            const availableUsers = participants.filter(id => id !== jid1);
            jid2 = availableUsers[Math.floor(Math.random() * availableUsers.length)];
        }
        // Si se mencionaron más de 2 usuarios
        else {
            return m.reply(`⚠️ Solo puedes mencionar máximo 2 usuarios.\n\n*Uso:*\n• \`${usedPrefix + command}\` - Pareja aleatoria\n• \`${usedPrefix + command} @usuario\` - Emparejar con usuario aleatorio\n• \`${usedPrefix + command} @usuario1 @usuario2\` - Emparejar usuarios específicos`);
        }

        let name1;
        let name2;
        try{
            name1 = await conn.getName(jid1);
            name2 = await conn.getName(jid2);
        }catch(e){
            if (!name1 || !name2) {
                return m.reply('⚠️ No se pudo obtener el nombre de una o ambas personas. Verifica que estén en el grupo.');
            }
        }

        // Descargar fotos de perfil
        const pp1 = await conn.profilePictureUrl(jid1, 'image').catch(_ => null);
        const pp2 = await conn.profilePictureUrl(jid2, 'image').catch(_ => null);

        const foto1 = pp1 ? Buffer.from((await axios.get(pp1, { responseType: 'arraybuffer' })).data) : fs.readFileSync('./media/menus/imagenlove1.jpg');
        const foto2 = pp2 ? Buffer.from((await axios.get(pp2, { responseType: 'arraybuffer' })).data) : fs.readFileSync('./media/menus/imagenlove2.jpg');

        // Seleccionar imagen base aleatoria o fija (puedes agregar más opciones)
        const baseImages = [
            './media/amor1.jpg', // 2944x980 (ejemplo)
            './media/amor2.jpg', // Otra resolución
            './media/amor3.jpg'  // Otra más
        ];
        //const selectedBase = baseImages[Math.floor(Math.random() * baseImages.length)];
        const selectedBase = imagen44;

        // Obtener dimensiones de la imagen base
        const metadata = await sharp(selectedBase).metadata();
        const baseWidth = metadata.width;
        const baseHeight = metadata.height;

        // Tamaño de las imágenes de perfil (20% del ancho de la imagen base)
        const profileSize = Math.floor(baseWidth * 0.2); // 20% del ancho base

        // Función para hacer imagen circular
        function escapeXml(text) {
            return text.replace(/[&<>'"]/g,
                char => ({
                    '&': '&amp;',
                    '<': '&lt;',
                    '>': '&gt;',
                    "'": '&apos;',
                    '"': '&quot;'
                }[char])
            );
        }

        async function circularImage(buffer) {
            const circleSvg = Buffer.from(
                `<svg width="${profileSize}" height="${profileSize}">
                <circle cx="${profileSize / 2}" cy="${profileSize / 2}" r="${profileSize / 2}" fill="#fff"/>
            </svg>`
            );

            const resized = await sharp(buffer)
                .resize(profileSize, profileSize)
                .toBuffer();

            const circular = await sharp(resized)
                .composite([{ input: circleSvg, blend: 'dest-in' }])
                .png()
                .toBuffer();

            return circular;
        }

        const resizedFoto1 = await circularImage(foto1);
        const resizedFoto2 = await circularImage(foto2);

        // Generar porcentaje de amor (aleatorio)
        const porcentaje = Math.floor(Math.random() * 100);
        let loveText = "";
        let infoporcentage = "";

        // Mensajes personalizados por rangos de 10% + especial para 95%-100%
        if (porcentaje >= 95) {
            loveText = `💘 *¡INCREÍBLE!* 💘\n_*${name1}* y *${name2}* tienen un *${porcentaje}%* de compatibilidad. 🌟\n¡Es un amor de película! 🎬\n**"El universo conspiró para unirlos"** 🌌✨`;
            infoporcentage = '❤ ¡INCREÍBLE! :3';
        } else if (porcentaje >= 90) {
            loveText = `🏆 *¡ALMA GEMELA!* 🏆\n_*${name1}* y *${name2}* vibran al *${porcentaje}%*. 💞\n¡Juntos son magia pura! ✨`;
            infoporcentage = '¡ALMA GEMELA! UwU';
        } else if (porcentaje >= 80) {
            loveText = `🔥 *¡CHISPAZOS!* 🔥\n_*${name1}* y *${name2}* tienen un *${porcentaje}%* de química. 💥\n¡Podrían prender fuego al mundo! 🌎❤️‍🔥`;
            infoporcentage = '¡CHISPAZOS! :D';
        } else if (porcentaje >= 70) {
            loveText = `💫 *¡BUENA ONDA!* 💫\n_*${name1}* y *${name2}* conectan en un *${porcentaje}%*. 🤝\n¿Una cita? ¡Podría funcionar! 🍷`;
            infoporcentage = '💫 ¡BUENA ONDA! 💫';
        } else if (porcentaje >= 60) {
            loveText = `🌻 *¡TIENEN POTENCIAL!* 🌻\n_*${name1}* y *${name2}*: *${porcentaje}%* de compatibilidad. 🌱\nCon paciencia, algo bonito puede crecer... 🌼`;
            infoporcentage = '¡TIENEN POTENCIAL! :O';
        } else if (porcentaje >= 50) {
            loveText = `🤔 *¿AMIGOS O ALGO MÁS?* 🤔\n_*${name1}* y *${name2}*: *${porcentaje}%*. 🧐\nQuizás necesiten un par de citas más. 🎭`;
            infoporcentage = ' ¿AMIGOS O ALGO MÁS? ';
        } else if (porcentaje >= 40) {
            loveText = `🌧️ *¡HMM... NO PROMETE!* 🌧️\n_*${name1}* y *${name2}*: solo *${porcentaje}%*. 😐\n¿Seguro que hay chispa? 🕯️`;
            infoporcentage = '🌧¡HMM... NO PROMETE! 🌧';
        } else if (porcentaje >= 30) {
            loveText = `🚧 *¡ZONA DE PELIGRO!* 🚧\n_*${name1}* y *${name2}*: *${porcentaje}%*. ⚠️\nMejor quédense como amigos. 🙅‍♂️`;
            infoporcentage = '¡ZONA DE PELIGRO! :/';
        } else if (porcentaje >= 20) {
            loveText = `💣 *¡DESASTRE NUCLEAR!* 💣\n_*${name1}* y *${name2}*: *${porcentaje}%*. 💥\n¡Aléjense para siempre! 🏃‍♂️💨`;
            infoporcentage = '¡DESASTRE NUCLEAR!';
        } else {
            loveText = `🪦 *R.I.P. EL AMOR* 🪦\n_*${name1}* y *${name2}*: *${porcentaje}%*. ☠️\n¡Hasta el algoritmo llora por ustedes! 😭`;
            infoporcentage = ':/  R.I.P. EL AMOR :/';
        }

        // Texto SVG (ajustado dinámicamente)
        const fontSizeTitle = Math.floor(baseWidth * 0.03); // 3% del ancho base
        const fontSizePercentage = Math.floor(baseWidth * 0.05); // 5% del ancho base

        const svgText = Buffer.from(`
        <svg width="${baseWidth}" height="${baseHeight}">
            <style>
                .title { 
                    fill: #ef9cf6; 
                    font-size: ${fontSizeTitle}px; 
                    font-weight: bold; 
                    font-family: Arial, sans-serif;
                    text-anchor: middle;
                }
                .percentage {
                    fill: #ff0000;
                    font-size: ${fontSizePercentage}px;
                    font-weight: bold;
                    font-family: fantasy, sans-serif;
                    text-anchor: middle;
                }
            </style>
            <text x="50%" y="${baseHeight * 0.2}" class="title">${infoporcentage}</text>
            <text x="50%" y="${baseHeight * 0.90}" class="percentage">${porcentaje}%</text>
        </svg>
    `);

        // Generar nombre único para el archivo temporal
        const timestamp = Date.now();
        const randomId = Math.random().toString(36).substring(7);
        const salida = `./media/resultado_${timestamp}_${randomId}.jpg`;
        tempFiles.push(salida);

        // Procesar la imagen final
        await sharp(selectedBase)
            .composite([
                {
                    input: resizedFoto1,
                    top: Math.floor((baseHeight - profileSize) / 2), // Centrado vertical
                    left: Math.floor(baseWidth * 0.05) // 15% desde la izquierda
                },
                {
                    input: resizedFoto2,
                    top: Math.floor((baseHeight - profileSize) / 2), // Centrado vertical
                    left: Math.floor(baseWidth * 0.75) // 65% desde la izquierda (para dejar espacio al texto)
                },
                {
                    input: svgText,
                    top: 0,
                    left: 0
                }
            ])
            .jpeg({ quality: 90 })
            .toFile(salida);

        await conn.sendFile(m.chat, salida, 'resultado.jpg', loveText, m, {
            mentions: [jid1, jid2]
        });

    } catch (e) {
        console.error('Error en formar pareja:', e);
        m.reply('⚠️ Ocurrió un error inesperado. Intenta nuevamente.');
    } finally {
        // Limpiar archivos temporales
        tempFiles.forEach(file => {
            try {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            } catch (e) {
                console.error(`Error eliminando archivo temporal ${file}:`, e);
            }
        });
    }
};

handler.help = ['medidoramor'];
handler.tags = ['fun'];
handler.command = /^(formarpareja|crearship|formarship|nuevoship)$/i;
export default handler;