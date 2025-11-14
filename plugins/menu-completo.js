/**
 POR FAVOR TENGAN LA AMABILIDAD Y BONDAD DE NO CAMBIAR MÍNIMAMENTE LOS CRÉDITOS DE GATABOT-MD,
 SI VAS A AÑADIR TUS DATOS O CRÉDITOS, ESTA BIEN. PERO NO QUITEN LOS QUE YA ESTAN DE GATABOT-MD, GRACIAS
 **/

/** PLEASE BE KIND AND KINDNESS NOT TO MINIMALLY CHANGE GATABOT-MD CREDITS,
 IF YOU ARE GOING TO ADD YOUR DATA OR CREDITS, IT'S OK. BUT DO NOT REMOVE THOSE THAT ARE ALREADY FROM GATABOT-MD, THANK YOU **/
let handler = async (m, { conn, command, usedPrefix }) => {
    let picture = './media/menus/img1.jpg'
    let name = await conn.getName(m.sender)
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) { process.send('uptime')
        _muptime = await new Promise(resolve => { process.once('message', resolve)
            setTimeout(resolve, 1000) }) * 1000}
    let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }
    let uptime = clockString(_uptime)
    //𝑨 𝑩 𝑪 𝑫 𝑬 𝑭 𝑮 𝑯 𝑰 𝑱 𝑲 𝑳 𝑴 𝑵 𝑶 𝑷 𝑸 𝑹 𝑺 𝑻 𝑼 𝑽 𝑾 𝑿 𝒀 𝒁 𝑼𝑷𝑫𝑨𝑻𝑬
    //
    // 𝒂 𝒃 𝒄 𝒅 𝒆 𝒇 𝒈 𝒉 𝒊 𝒋 𝒌 𝒍 𝒎 𝒏 𝑜 𝒑 𝒒 𝒓 𝒔 𝒕 𝒖 𝒗 𝒘 𝒙 𝒚 𝒛
    let estado = `💗 *¡Hola!* ${name} ✨


📌
> *prefix: @ . !*
> *.menucompleto*
> *.notas | notasdelaversion*


💬 𝑮𝒓𝒖𝒑𝒐𝒔

> *.grupos*
> *.on/.off (Activar y desactivar funciones)*
> *.todos / .todas*
> *.aviso / notify*
> *.n*
> *.spam*
> *.ban / .kick [@]*
> *.abrir / .cerrar*
> *.promote / .demote [@]*
> *.resetlink*
> *.link*
> *.fantasmas*
> *.on antidelete*
> *.newnombre*
> *.newdesc*
> *+|1|6|12|2| 1/24hrs*
> *.changegroup | cambiargrupo*
> *.mute*
> *.unmute*
> *.afk*


⚙️ 𝑨𝒋𝒖𝒔𝒕𝒆𝒔
> *.on|.off welcome*
> *.on|.off detect*
> *.on|.off juegos*
> *.on|.off game2*
> *.on|.off modoadmin*
> *.on|.off stickers*
> *.on|.off autosticker*
> *.on|.off reaction*
> *.on|.off audios*
> *.on|.off chatgpt*
> *.on|.off chatbot*
> *.on|.off antitoxic*
> *.on|.off modocaliente*
> *.on|.off antiver*
> *.on|.off antidelete*
> *.on|.off antifake*
> *.on|.off antitraba*
> *.on|.off antiLink*
> *.on|.off antiLink2*
> *.on|.off antiTiktok*
> *.on|.off antiYoutube*
> *.on|.off antiTelegram*
> *.on|.off antiFacebook*
> *.on|.off antiInstagram*
> *.on|.off antiTwitter*


🌸 𝑾𝒆𝒍𝒄𝑜𝒎𝒆

> *.welcome*
> *.on welcome*
> *.setwelcome*
> *.setbye*
> *.imagenbye* [imagen]
> *.imagenwelcome* [imagen]


🎵 𝑴𝒖𝒔𝒊𝒄

> *.music*
> *.play1 | spotify*
> *.play2*
> *.play3*
> *.play4*


🎨 𝑨𝒓𝒍𝒆𝒕𝒕𝒆𝑩𝒐𝒕 𝑯𝑫+ 🎨

> *.photoshop*
> *.hd / hdv1 (resolution 4k)*
> *.hd2 / hdv2 (resolution hd)*
> *.hd3 / mejorarcolor*
> *.borrarfondo*
> *@arlettehd*


🛠️ 𝙐𝙩𝙞𝙡𝙨

> *.utils*
> *.ping*
> *.img [sticker]*
> *.tts [audio]*
> *.tovideo [sticker]*
> *.morse codificar texto*
> *.morse decodificar morse*
> *.calc*


🕹️ 𝑱𝒖𝒆𝒈𝒐𝒔

> *.juegos*
> *.matematicas*
> *.ppt*
> *.ttt*
> *.doxxear*
> *.follar*
> *.caracolamagica [pregunta]*
> *.top [text]*
> *.topparejas*
> *.ship [@ , @]*
> *.top1 [text]*
> *.topgays*
> *.formarpareja*
> *.formarpareja (@)* 
> *.formarpareja (@) (@)* 
> *.pelicula*
> *.adivinanza*
> *.gay [@]*
> *.lesbiana [@]*
> *.chiste*
> *.piropo*
> *.rata*
> *.pelicula*
> *.love [@]*
> *.manco / .manca*
> *.dado*
> *.trivia*
> *.trivia anime*
> *.trivia películas*
> *.trivia series*
> *.trivia videojuegos*
> *.trivia música*
> *.trivia historia*
> *.trivia geografia*
> *.trivia ciencia*
> *.trivia culturaGeneral*
> *.trivia arte*
> *.trivia tecnología*
> *.trivia superheroes*
> *.trivia fútbol*
> *.trivia marvel*
> *.trivia dc*
> *.trivia dbz*
> *.trivia naruto*
> *.trivia onepiece*
> *.trivia attacktitan*
> *.trivia myheroacademia*


🕹️ 𝑱𝒖𝒆𝒈𝒐𝒔 (Free Fire)

> *.freefire | ff*
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
> *.interna6* (hora)
> *.interna4* (hora)
> *.diseñoM* 
> *.diseñoF*
> *.creardiseñolist*

> i Infinito | c CLK | v VV2
> Parametro opcional ( )
> Parametro obligatorio [ ]

(Free Fire Edits)
> *.editff*

*Plantillas*
> *.i1* 
> *.i2*

*Añadir Logos*
> *.addlogos*
> *.l1* 
> *.l2*

🤖 𝑰𝑨

> *.ia*
> *.chatgpt*
> *.gemini*
> *.deepseek*


🌐 𝑫𝒆𝒔𝒄𝒂𝒓𝒈𝒂𝒔

> *.descargas*
> *.tiktok*
> *.instagram*
> *.mediafire*


🫧 𝑺𝒕𝒊𝒄𝒌𝒆𝒓𝒔

> *.sticker | s*
> *.brat*
> *.bratvid*
> *.st*
> *.besar @tag*
> *.golpear @tag*
> *.bofetada @tag*
> *.emojimix 😺+😆*
> *.scircle*
> *.wm *packname|author*
> *.wm *texto1|texto2*


🎭 𝑭𝒊𝒍𝒕𝒓𝒐𝒔/𝑬𝒇𝒆𝒄𝒕𝒐𝒔

> *.simpcard *@tag*
> *.hornycard *@tag*
> *.lolice *@tag*
> *.ytcomment *texto*
> *.itssostupid*
> *.blur*
> *.bass audio*
> *.blown audio*
> *.deep audio*
> *.earrape audio*
> *.fast audio*
> *.fat audio*
> *.nightcore audio*
> *.reverse audio*
> *.robot audio*
> *.slow audio*
> *.smooth audio*
> *.tupai audio*


🎨 𝑾𝒂𝒍𝒍𝒑𝒂𝒑𝒆𝒓𝒔

> *.wallpapers*
> *.wallpaper type*
> *.jamesweb*
> *.chica*
> *.chico*
> *.cristianoronaldo*
> *.messi*
> *.meme*
> *.meme2*
> *.itzy*
> *.blackpink*
> *.kpop* *blackpink, o exo, o bts*
> *.lolivid*
> *.loli*
> *.navidad*
> *.ppcouple*
> *.neko*
> *.waifu*
> *.akira*
> *.akiyama*
> *.anna*
> *.asuna*
> *.ayuzawa*
> *.boruto*
> *.chiho*
> *.chitoge*
> *.deidara*
> *.erza*
> *.elaina*
> *.eba*
> *.emilia*
> *.hestia*
> *.hinata*
> *.inori*
> *.isuzu*
> *.itachi*
> *.itori*
> *.kaga*
> *.kagura*
> *.kaori*
> *.keneki*
> *.kotori*
> *.kurumi*
> *.madara*
> *.mikasa*
> *.miku*
> *.minato*
> *.naruto*
> *.nezuko*
> *.sagiri*
> *.sasuke*
> *.sakura*
> *.cosplay*


💰 𝑬𝒄𝒐𝒏𝒐𝒎í𝒂

> *.economia*
*USD 🇺🇸 (base)*
> *.AUD 🇦🇺*  
> *.BGN 🇧🇬*  
> *.BRL 🇧🇷*  
> *.CAD 🇨🇦*  
> *.CHF 🇨🇭*  
> *.CNY 🇨🇳*  
> *.CZK 🇨🇿*  
> *.DKK 🇩🇰*  
> *.EUR 🇪🇺*  
> *.GBP 🇬🇧*  
> *.HKD 🇭🇰*  
> *.HUF 🇭🇺*  
> *.IDR 🇮🇩*  
> *.ILS 🇮🇱*  
> *.INR 🇮🇳*  
> *.ISK 🇮🇸*  
> *.JPY 🇯🇵*  
> *.KRW 🇰🇷*  
> *.MXN 🇲🇽*  
> *.MYR 🇲🇾*  
> *.NOK 🇳🇴*  
> *.NZD 🇳🇿*  
> *.PHP 🇵🇭*  
> *.PLN 🇵🇱*  
> *.RON 🇷🇴*  
> *.SEK 🇸🇪*  
> *.SGD 🇸🇬*  
> *.THB 🇹🇭*  
> *.TRY 🇹🇷*  
> *.ZAR 🇿🇦*  

> estos comandos de usan sin bandera ejemplo .mxn

*toUSD 🇺🇸*

> *.[moneda] [cantidad]*


🛒 𝑽𝒆𝒏𝒕𝒂𝒔

> *.crearstock [name]*
> *.stock*
> *.setstock*
> *.libros*
> *.setlibros*
> *.peliculas*
> *.setpeliculas*
> *.diamantes*
> *.setdiamantes*


🔞 *xxx*

> *.xxx*
> *.vidx*
> *.vidxlesbi*
> *.pack*
> *.packmen+*


📍 𝑰𝒏𝒇𝒐
> *.info*
> *.creadora*
> *.owner*
> *.comprarbot*
> *.ultimate*
> *.estado*
> *.arlettebotlite*


> (Server auto maintenance for 5 minutes every 1AM UTC-7)



*Versión:* ${vs}
*Tiempo Activo:* ${uptime}`


let randomImage = [imagen10, imagen11, imagen12, imagen13, imagen14, imagen15][Math.floor(Math.random() * 6)];

    await conn.sendFile(m.chat, randomImage, 'lp.jpg',estado)
}
handler.help = ['estado']
handler.tags = ['main']
handler.command = /^(menuall|menucompleto)$/i
export default handler

function clockString(ms) {
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
    return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}