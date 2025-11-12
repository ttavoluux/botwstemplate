let handler = async(m, { isOwner, isAdmin, conn, text, participants, args, command }) => {

    let user = global.db.data.users[m.sender]
    let emoji = '';
    var texto = ''
    if(command === 'niñas'){
        emoji = '👸🏻'
        texto = '💕 @Niñas 👸🏻'
    }else if(command === 'niños'){
        emoji = '👹'
        texto = '👹 @Niños 👹'
    }

    var texto2 = '✨ AVISO :'
    var texto3 = ' '
    var texto4 = ' '
    let numParticipantes = participants.length;
    
    if(text && text.length > 1){
        texto = texto
        texto3='*!'
        texto4='✨ !*'
    }
    
    let pesan = args.join` `
    let teks = ''
    
    if(numParticipantes > 100){
        teks += '❗ *El grupo supera los 100 participantes considere usar .aviso* ❗\n\n';
    }
    teks += ` *${texto}* ${texto3}${text ? text.toUpperCase() : ''}${texto4} \n\n`;
    
    // Filtrar participantes por género según el comando
    for (let mem of participants) {
        let userData = global.db.data.users[mem.id];
        
        // Verificar si el usuario existe en la base de datos y tiene género definido
        if (userData && userData.genero) {
            if ((command === 'niñas' && userData.genero.toLowerCase() === 'mujer') ||
                (command === 'niños' && userData.genero.toLowerCase() === 'hombre')) {
                teks += `${emoji} *@${mem.id.split('@')[0]}* \n`;
            }
        }
    }

    teks += `\n\n                                                     ᴬʳˡᵉᵗᵗᴮᵒᵗ⁺`
    
    // Obtener solo los IDs de los usuarios que cumplen con el criterio de género
    let mentions = participants.filter(mem => {
        let userData = global.db.data.users[mem.id];
        if (userData && userData.genero) {
            return (command === 'niñas' && userData.genero.toLowerCase() === 'mujer') ||
                   (command === 'niños' && userData.genero.toLowerCase() === 'hombre');
        }
        return false;
    }).map(a => a.id);

    conn.sendMessage(m.chat, { text: teks, mentions: mentions }, )
}
handler.command = /^(niños|niñas)$/i
handler.admin = true
handler.group = true
handler.botAdmin = true
export default handler