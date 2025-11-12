import path from "path";
import fs from 'fs'
import {boolean} from "mathjs";
let handler = async (m, { conn, command, usedPrefix,text}) => {

    const CONFIG_DIR = path.join(process.cwd(), 'database')
    const CONFIG_PATH = path.join(CONFIG_DIR, 'GroupConfig.json')
    let tag = '┇'
    let ismasc = false;

    let colorv = '✨𝐶𝑂𝐿𝑂𝑅 𝐷𝐸 𝑉𝐸𝑆𝑇𝐼𝑀𝐸𝑁𝑇𝐴('
    let hex = '𝐇𝐄𝐗𝐀𝐆𝐎𝐍𝐀𝐋 𝐇𝐎𝐘'
    let scrimtext = '𝐒𝐂𝐑𝐈𝐌𝐒 𝐇𝐎𝐘'
    let cuadri = '𝐂𝐔𝐀𝐃𝐑𝐈𝐋𝐀𝐓𝐄𝐑𝐎 𝐇𝐎𝐘'
    let trilatero = '𝐓𝐑𝐈𝐋𝐀𝐓𝐄𝐑𝐎 𝐇𝐎𝐘'
    let vs12 = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟏𝟐 𝐕𝐒 𝟏𝟐'
    let vs16 = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟏𝟔 𝐕𝐒 𝟏𝟔'
    let vs6vv2 = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟔 𝐕𝐒 𝟔 𝐕𝐕𝟐'
    let vs4vv2 = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟒 𝐕𝐒 𝟒 𝐕𝐕𝟐'
    let vs6 = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟔 𝐕𝐒 𝟔'
    let vs4 = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟒 𝐕𝐒 𝟒'
    let vs6inf = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟔 𝐕𝐒 𝟔 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐎'
    let vs4inf = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟒 𝐕𝐒 𝟒 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐎'
    let vs6clk = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟔 𝐕𝐒 𝟔 𝐂𝐋𝐊'
    let vs4clk = '𝐕𝐄𝐑𝐒𝐔𝐒 𝟒 𝐕𝐒 𝟒 𝐂𝐋𝐊'
    let interna = '𝐈𝐍𝐓𝐄𝐑𝐍𝐀 𝟒 𝐕𝐒 𝟒 𝐂𝐋𝐊'
    let interna6 = '𝐈𝐍𝐓𝐄𝐑𝐍𝐀 𝟔 𝐕𝐒 𝟔'
    let internaclk = '𝐈𝐍𝐓𝐄𝐑𝐍𝐀 𝟒 𝐕𝐒 𝟒 𝐂𝐋𝐊'
    let internaclk6 = '𝐈𝐍𝐓𝐄𝐑𝐍𝐀 𝟔 𝐕𝐒 𝟔 𝐂𝐋𝐊'
    let internai = '𝐈𝐍𝐓𝐄𝐑𝐍𝐀 𝟒 𝐕𝐒 𝟒 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐎'
    let internai6 = '𝐈𝐍𝐓𝐄𝐑𝐍𝐀 𝟔 𝐕𝐒 𝟔 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐎'
    let internavv2 = '𝐈𝐍𝐓𝐄𝐑𝐍𝐀 𝟒 𝐕𝐒 𝟒 𝐕𝐕𝟐'
    let internavv26 = '𝐈𝐍𝐓𝐄𝐑𝐍𝐀 𝟔 𝐕𝐒 𝟔 𝐕𝐕𝟐'
    try {
        if (fs.existsSync(CONFIG_PATH)) {
            const rawData = fs.readFileSync(CONFIG_PATH)
            const groupConfig = JSON.parse(rawData)
            tag = (groupConfig[m.chat]?.tag || '┇');
            if(groupConfig[m.chat]?.design === 'M'){
                ismasc = true;
            }
        }
    } catch (e) {
        //console.error('Error leyendo GroupConfig:', e)
    }
    let emoji1 = '🎀'
    let emoji2 = '🌷'
    let emoji3 = '✨'
    let emoji4 = '🎀'
    let emoji5 = '☁️'
    let lider = '👸🏻'
    let jugador = '🌸'
    let suplentes = '🌻'
    let suplentes2 = '❣️'

    if(ismasc){
        lider = '👑'
        jugador = '🥷🏿'
        suplentes = '👹'
        suplentes2 = '🥷🏿'
        emoji1 = '🤑'
        emoji2 = '🔥'
        emoji3 = '☠️'
        emoji4 = '👾'
        emoji5 = '☁️'
    }




    let name = await conn.getName(m.sender)
    if (command === 'ffhhh' || command === 'freefihhhre') {
        let menuff = `💗 *¡Hola!* ${name} ✨

*FF 🕹️*

> *.tag*
> *.discord*
> *.igclan*
> *.idclan*
> *.espacio*
> *.16vs16* [hora]
> *.12vs12* [hora]
> *.cuadrilatero* [hora] [color]
> *.trilatero* [hora] [color]
> *.hexagonal* [hora] [color]
> *.4vs4(i/c/v)* (hora)
> *.6vs6(i/c/v)* (hora)
> *.scrim* [hora]
> *.interna6(i/c/v)* (hora)
> *.interna4(i/c/v)* (hora)
> *.diseñoM* 
> *.diseñoF*

> i Infinito | c CLK | v VV2
> Parametro opcional ( )
> Parametro obligatorio [ ]`
        menuff += '\n\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺'
        await conn.sendFile(m.chat, imagen43, 'lp.jpg', menuff)
    }
    if (command === '16vs16') {
        if (!text) {
            return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.16vs16 9`',  quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }

        let horaMX12 ;
        let horaCO12 ;
        let horaAR12;

        if(horaMX >= 10){
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
            if(horaCO<10){
                horaCO12 = horaCO+' AM';
            }if(horaAR<10){
                horaAR12 = horaAR+' AM';
            }
        }else{
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
        }

//
//
// 🇨🇴│𝐂𝐎𝐋:
// 🇦🇷│𝐀𝐑𝐆:
        let scrims12 = `*${emoji4} ${vs16} ${emoji4}*

⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟮

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟯

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟰

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    //new
    if (command === '12vs12') {
        if (!text) {
            return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.12vs12 9`',  quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }

        let horaMX12 ;
        let horaCO12 ;
        let horaAR12;

        if(horaMX >= 10){
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
            if(horaCO<10){
                horaCO12 = horaCO+' AM';
            }if(horaAR<10){
                horaAR12 = horaAR+' AM';
            }
        }else{
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
        }

        let scrims12 = `*${emoji4} ${vs12} ${emoji4}*

⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟮

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟯

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    let pHora = '';
    let pColor = '';
    let colorVestimenta = 'Color no valido!'
    let parametros = text.split(' ');
    pHora = parametros[0];
    pColor = parametros[1];
    switch(pColor?.toLocaleUpperCase?.()) {
        case 'ROJO':
            colorVestimenta = '🔴';
            break;
        case 'BLANCO':
            colorVestimenta = '⚪';
            break;
        case 'NEGRO':
            colorVestimenta = '⚫';
            break;
        case 'AMARILLO':
            colorVestimenta = '🟡';
            break;
        default:
            colorVestimenta = 'Color no valido!';
    }

    if (command === 'cuadrilatero') {
        if (!pHora) {
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.cuadrilatero 9 blanco `', quoted: m })
        }else if(!pColor){
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona un color para la partida (blanco/negro/amarillo/rojo). Ejemplo: `.cuadrilatero 9 blanco`', quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }

        let horaMX12 ;
        let horaCO12 ;
        let horaAR12;

        if(horaMX >= 10){
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
            if(horaCO<10){
                horaCO12 = horaCO+' AM';
            }if(horaAR<10){
                horaAR12 = horaAR+' AM';
            }
        }else{
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
        }

        let cuadrilatero = `*${emoji4} ${cuadri} ${emoji4}*

⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*

${colorv}${colorVestimenta})

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟮

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟯

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:cuadrilatero, quoted: m })
    }

    if (command === 'trilatero') {
        if (!pHora) {
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.trilatero 9 blanco `', quoted: m })
        }else if(!pColor){
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona un color para la partida (blanco/negro/amarillo/rojo). Ejemplo: `.trilatero 9 blanco`', quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }

        let horaMX12 ;
        let horaCO12 ;
        let horaAR12;

        if(horaMX >= 10){
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
            if(horaCO<10){
                horaCO12 = horaCO+' AM';
            }if(horaAR<10){
                horaAR12 = horaAR+' AM';
            }
        }else{
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
        }

        let cuadrilatero = `*${emoji4} ${trilatero} ${emoji4}*

⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*

${colorv}${colorVestimenta})

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟮

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟯

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟰

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:cuadrilatero, quoted: m })
    }

    if (command === 'hexagonal') {
        if (!pHora) {
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.hexagonal 9 blanco `', quoted: m })
        }else if(!pColor){
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona un color para la partida (blanco/negro/amarillo/rojo). Ejemplo: `.hexagonal 9 blanco`', quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }

        let horaMX12 ;
        let horaCO12 ;
        let horaAR12;

        if(horaMX >= 10){
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
            if(horaCO<10){
                horaCO12 = horaCO+' AM';
            }if(horaAR<10){
                horaAR12 = horaAR+' AM';
            }
        }else{
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
        }

        let cuadrilatero = `*${emoji4} ${hex} ${emoji4}*

⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*

${colorv}${colorVestimenta})

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟮

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:cuadrilatero, quoted: m })
    }

    if (command === 'scrims' || command ==='scrim') {
        if (!text) {
            return conn.sendMessage(m.chat, {text:'> *Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.scrims 9`', quoted: m })
        }

        let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

        let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
        let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

        if (horaAR>12){
            horaAR = horaAR-12;
        }
        if (horaCO>12){
            horaCO = horaCO - 12;
        }
        let horaMX12 ;
        let horaCO12 ;
        let horaAR12;

        if(horaMX >= 10){
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
            if(horaCO<10){
                horaCO12 = horaCO+' AM';
            }if(horaAR<10){
                horaAR12 = horaAR+' AM';
            }
        }else{
            horaMX12 = horaMX+' PM';
            horaCO12 = horaCO+' PM';
            horaAR12 = horaAR+' PM';
        }

        let scrims = `*${emoji4} ${scrimtext} ${emoji4}*

⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} `
        await conn.sendMessage(m.chat, {text: scrims, quoted: m })
    }

    if (command === 'espacio') {
        let espacio = '(ㅤ) espacio compatible Android/IOS'
        await conn.sendMessage(m.chat, {text: espacio, quoted: m })
    }

    if (command === 'ffreglasmasc' || command === 'lideresmasc') {
        let espacio = '> *Aun no contamos con datos*'
        await conn.sendMessage(m.chat, {text: espacio, quoted: m })
    }
    if (command === 'interna4' || command === 'interna4c' || command === 'interna4v' || command === 'interna4i') {
        let mensaje = `*HORA: Apenas llene*`
        let tipoSala = `${interna}`
        if(command === 'interna4i'){
            tipoSala = `${internai}`
        }
        if(command === 'interna4v'){
            tipoSala = `${internavv2}`
        }
        if(command === 'interna4c'){
            tipoSala = `${internaclk}`
        }
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${tipoSala} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟮

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === 'interna6' || command === 'interna6c' || command === 'interna6v' || command === 'interna6i') {
        let mensaje = `*HORA: Apenas llene*`
        let tipoSala = `${interna6}`
        if(command === 'interna6i'){
            tipoSala = `${internai6}`
        }
        if(command === 'interna6v'){
            tipoSala = `${internavv26}`
        }
        if(command === 'interna6c'){
            tipoSala = `${internaclk6}`
        }
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${tipoSala} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟮

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === '4vs4') {
        let mensaje = `*HORA: Apenas llene*`
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${vs4} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag}  

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === '4vs4c') {
        let mensaje = `*HORA: Apenas llene*`
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${vs4clk} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === '4vs4i') {
        let mensaje = `*HORA: Apenas llene*`
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${vs4inf} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}

${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === '4vs4v') {
        let mensaje = `*HORA: Apenas llene*`
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${vs4vv2} ${emoji4}

${mensaje}

*${await conn.getName(m.chat)}*

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}
 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === '6vs6') {
        let mensaje = `*HORA: Apenas llene*`
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${vs6} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}
 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === '6vs6c') {
        let mensaje = `*HORA: Apenas llene*`
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${vs6clk} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}
 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === '6vs6i') {
        let mensaje = `*HORA: Apenas llene*`
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${vs6inf} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}
 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (command === '6vs6v') {
        let mensaje = `*HORA: Apenas llene*`
        if (!text) {
            //return conn.sendMessage(m.chat, {text:'*Por favor, proporciona una hora para la partida (hora de México). Ejemplo: `.ff4vs4 9`',  quoted: m })
        }else{
            let horaMX = parseInt(text);  // Extraemos la hora (sin minutos)

            let horaCO = (horaMX + 1) % 24;  // Colombia está una hora adelante de México
            let horaAR = (horaMX + 3) % 24;  // Argentina está tres horas adelante de México

            if (horaAR>12){
                horaAR = horaAR-12;
            }
            if (horaCO>12){
                horaCO = horaCO - 12;
            }

            let horaMX12 ;
            let horaCO12 ;
            let horaAR12;

            if(horaMX >= 10){
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
                if(horaCO<10){
                    horaCO12 = horaCO+' AM';
                }if(horaAR<10){
                    horaAR12 = horaAR+' AM';
                }
            }else{
                horaMX12 = horaMX+' PM';
                horaCO12 = horaCO+' PM';
                horaAR12 = horaAR+' PM';
            }
            mensaje = `⏰│𝐇𝐎𝐑𝐀𝐑𝐈𝐎
🇲🇽│𝐌𝐄𝐗: *${horaMX12}*
🇨🇴│𝐂𝐎𝐋: *${horaCO12}*
🇦🇷│𝐀𝐑𝐆: *${horaAR12}*`
        }

        let scrims12 = `${emoji4} ${vs6vv2} ${emoji4}

${mensaje}

ㅤ𝗘𝗦𝗖𝗨𝗔𝗗𝗥𝗔 𝟭

${lider} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 
${jugador} ${tag} 

${suplentes} •𝐒𝐔𝐏𝐋𝐄𝐍𝐓𝐄𝐒• ${suplentes}
 
${suplentes2} ${tag} 
${suplentes2} ${tag} `
        await conn.sendMessage(m.chat, {text:scrims12, quoted: m })
    }

    if (tag === '┇') {
        setTimeout(() => {
            conn.sendMessage(m.chat,{text: '> *Puedes configurar el tag con .settag!*'});
        }, 7000);
    }

}

handler.help = ['ff', 'ff12vs12', 'ff16vs16', 'ffcuadrilatero', 'ffscrims','ff4vs4','ff6vs6','ff8vs8']
handler.tags = ['funff']
handler.command = /^(ffewfgf|freefdfsfire|12vs12|16vs16|cuadrilatero|trilatero|hexagonal|scrims|espacio|reglasmasc|lideresmasc|4vs4|6vs6|interna4|interna4v|interna4c|interna4i|interna6|interna6i|interna6v|interna6c|4vs4i|6vs6i|4vs4c|6vs6c|4vs4v|6vs6v|scrim)$/i
export default handler

