


let handler = async (m, { conn, command, usedPrefix,text}) => {
    if(text==="infinito"){
        let picture = fs.readFileSync("./media/pictures/WCZfem_inf.jpg")
        let reglas_w = `> ✨ WCZ Fem-Infinito`
        await conn.sendFile(m.chat, picture, 'lp.jpg',reglas_w)
    }else{

    }

}
handler.command = /^(wczfem)$/i
export default handler
