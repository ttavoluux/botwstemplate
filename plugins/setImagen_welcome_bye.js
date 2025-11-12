import fs from 'fs'
import path from 'path'

// Configuración de rutas
const CONFIG_DIR = path.join(process.cwd(), 'database')
const CONFIG_PATH = path.join(CONFIG_DIR, 'GroupConfig.json')
const IMAGES_DIR = path.join(process.cwd(), 'imagesGroups')

// Crear directorios si no existen
if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true })
}

if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true })
}

// Crear archivo JSON inicial si no existe
if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, '{}', 'utf-8')
}

let handler = async (m, { conn, usedPrefix, command, text }) => {
    // Verificar que sea un grupo
    if (!m.isGroup) return m.reply('Este comando solo funciona en grupos.')

    // Verificar que el usuario sea admin
    let participants = await conn.groupMetadata(m.chat).catch(e => null)
    if (!participants) return m.reply('Error al obtener información del grupo')

    let isAdmin = participants.participants.find(p => p.id === m.sender)?.admin || false
    if (!isAdmin) return m.reply('⚠️ Solo los admins pueden usar este comando.')

    let q = m.quoted ? m.quoted : m
    let mime = (q.msg || q).mimetype || q.mediaType || ""
    // Obtener el ID del grupo (sin @g.us)
    let groupId = m.chat.replace('@g.us', '')
try {
        // Comandos para imágenes
        if (command === 'imagenbye' || command === 'imagenwelcome') {
            // Verificar y obtener imagen (tanto adjunta como respondida)
           // let q = m.quoted ? m.quoted : m
            //let mime = (q.msg || q).mimetype || q.mediaType || ""
            
            if (!mime) throw `╰⊱❗️⊱ *USO INCORRECTO* ⊱❗️⊱╮\n\nEnvía una imagen o responde a una imagen con el comando ${usedPrefix + command}`
            if (!/image\/(jpe?g|png)/.test(mime)) throw `╰⊱⚠️⊱ *FORMATO NO SOPORTADO* ⊱⚠️⊱╮\n\nEl formato (${mime}) no es compatible, envía o responde a una imagen JPG/PNG`

            // Determinar el tipo de imagen
            const imageType = command === 'imagenbye' ? 'bye' : 'welcome'
            const imageName = `${groupId}${imageType}.jpg`
            const imagePath = path.join(IMAGES_DIR, imageName)

            // Descargar y guardar la imagen
            //m.reply('⏳ Procesando imagen...')
            let img = await q.download?.()
            if (!img) throw 'Error al descargar la imagen'
            
            fs.writeFileSync(imagePath, img)
            return m.reply(`✅ Imagen ${imageType} cargada.`)
        }
    }catch (e) {
        return m.reply(`╰⊱⚠️⊱ *FORMATO NO SOPORTADO* ⊱⚠️⊱╮\n\nEl formato (${mime}) no es compatible, envía o responde a una imagen JPG/PNG`)
    }
}

handler.admin = true
handler.command = /^(imagenbye|imagenwelcome)$/i
export default handler