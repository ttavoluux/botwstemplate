import fs from 'fs'
import path from 'path'

// Configuración de rutas
const CONFIG_DIR = path.join(process.cwd(), 'database')
const CONFIG_PATH = path.join(CONFIG_DIR, 'GroupConfig.json')

// Crear directorio si no existe
if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true })
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
    if (!isAdmin) return m.reply('⚠️ Solo los admins pueden configurar los datos del clan.')

    // Obtener el ID del grupo
    let groupId = m.chat

    try {
        // Leer el archivo existente (ahora garantizado que existe)
        let rawData = fs.readFileSync(CONFIG_PATH, 'utf-8')
        let groupConfig = JSON.parse(rawData)

        // Inicializar el objeto del grupo si no existe
        if (!groupConfig[groupId]) {
            groupConfig[groupId] = {}
        }

        // Procesar cada comando con if
        let fieldName = ''
        let fieldValue = text.trim()

        if (command === 'settag') {
            if (!fieldValue) return m.reply(`⚠️ Ingresa el tag del clan.\nEjemplo: ${usedPrefix}settag EXAMPLE`)
            groupConfig[groupId].tag = fieldValue
            fieldName = 'Tag del clan'
        }
        else if (command === 'setidclan') {
            if (!fieldValue) return m.reply(`⚠️ Ingresa el ID del clan.\nEjemplo: ${usedPrefix}setidclan 12345678`)
            groupConfig[groupId].idclan = fieldValue
            fieldName = 'ID del clan'
        }
        else if (command === 'setdiscord') {
            if (!fieldValue) return m.reply(`⚠️ Ingresa el enlace de Discord.\nEjemplo: ${usedPrefix}setdiscord https://discord.gg/example`)
            groupConfig[groupId].discord = fieldValue
            fieldName = 'Enlace de Discord'
        }
        else if (command === 'setigclan') {
            if (!fieldValue) return m.reply(`⚠️ Ingresa el Instagram del clan.\nEjemplo: ${usedPrefix}setigclan @exampleclan`)
            groupConfig[groupId].igclan = fieldValue
            fieldName = 'Instagram del clan'
        }
        else if (command === 'diseñof') {
           // if (!fieldValue) return m.reply(`⚠️ Ingresa diseñof/diseñom para un diseño de listas: ${usedPrefix}diseñof @diseñom`)
            groupConfig[groupId].design = 'F'
            groupConfig[groupId].angels = 'no'
            groupConfig[groupId].kbras = 'no'
            fieldName = 'Diseño de listas 🌸 Fem'
        }
        else if (command === 'diseñom') {
            //if (!fieldValue) return m.reply(`⚠️ Ingresa diseñof/diseñom para un diseño de listas: ${usedPrefix}diseñof @diseñom`)
            groupConfig[groupId].design = 'M'
            groupConfig[groupId].angels = 'no'
            groupConfig[groupId].kbras = 'no'
            fieldName = 'Diseño de listas 👹 Masc'
        }
        
         else if (command === 'desingangels') {
            //if (!fieldValue) return m.reply(`⚠️ Ingresa diseñof/diseñom para un diseño de listas: ${usedPrefix}diseñof @diseñom`)
            //groupConfig[groupId].design = 'M'
            //fieldName = 'Diseño de listas 👹 Masc'
            groupConfig[groupId].angels = 'yes'
             groupConfig[groupId].design = ''
             groupConfig[groupId].kbras = 'no'
            fieldName = '🪽 Design Angels 🪽'
        }
         else if (command === 'desingkbras') {
            //if (!fieldValue) return m.reply(`⚠️ Ingresa diseñof/diseñom para un diseño de listas: ${usedPrefix}diseñof @diseñom`)
            //groupConfig[groupId].design = 'M'
            //fieldName = 'Diseño de listas 👹 Masc'
            groupConfig[groupId].angels = ''
             groupConfig[groupId].design = ''
             groupConfig[groupId].kbras = 'yes'
            fieldName = '🐐 Design Kbras 🐐'
        }

        // Escribir en el archivo JSON
        fs.writeFileSync(CONFIG_PATH, JSON.stringify(groupConfig, null, 2))

        m.reply(`✅ *${fieldName}* configurado correctamente:\n${fieldValue}`)

    } catch (error) {
        console.error('Error en handler:', error)
        m.reply('⚠️ Ocurrió un error al guardar la configuración.')
    }
}

handler.admin = true
handler.command = /^(settag|setidclan|setdiscord|setigclan|diseñof|diseñom|desingangels|desingkbras)$/i
export default handler