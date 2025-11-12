let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {
    //if (!(isAdmin || isOwner)) {
    // global.dfail('admin', m, conn)
    //  throw false
    //}

    //var texto = '📍 @todoos ✨'
    var texto = '🎃 @todoos 🎃'
    var texto2 = '✨ AVISO :'
    var texto3 = ' '
    var texto4 = ' '
    let numParticipantes = participants.length;
    if(text.length>1){
        texto = texto2
        texto3='*!'
        texto4='✨ !*'
        //*🎄 Holis :3🎄*
        //
        // *@⁨> Arlette Bot ;⁩* *@⁨✨    Arlennysssssss    ❤️⁩*
        //
        //                                                      ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺
    }
    let pesan = args.join` `
    let teks = ''
    //teks += '> 🖤Editar PlantillaFF✨\n> (editff/plantillaff/addlogos)\n\n';

    if(numParticipantes > 100){
        teks += '❗ *El grupo supera los 100 participantes considere usar .aviso* ❗\n\n';
    }
    teks += ` *${texto}* ${texto3}${text.toUpperCase()}${texto4} \n\n`;
    
    //teks += '> *.st [color] (text -> sticker)*\n\n'

    //teks += '> Menu FF: .freefire\n\n';





    //teks += '\n> HD v2 Comandos: @hd @4k\n> +(mejora) Detección de texto\n> +(mejora) Super-resolución\n> +(mejora) Reducción de ruido\n> +Procesamiento 2x\n> +Doc PNG\n\n';



//let oi = `ღ ${lenguajeGB['smsAddB5']()} ${pesan}`
//teks += ` *${texto}* ${texto3}${text.toUpperCase()}${texto4} \n\n`
    for (let mem of participants) {
        teks += `*@${mem.id.split('@')[0]}* `}

    teks += `\n\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺`
//teks += '\n *𝓑𝔂: 𝓐𝓻𝓵𝓮𝓽𝓼𝓲𝓽𝓪 𝓫𝓸𝓽 💕* '
//teks += '\n\n*💜 Nuevos comandos ⚠️*\n     *.aviso*\n     *.todosprem*'
    conn.sendMessage(m.chat, { text: teks, mentions: participants.map(a => a.id) }, )
}
handler.command = /^(invocar|invocacion|todos|invocación)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler