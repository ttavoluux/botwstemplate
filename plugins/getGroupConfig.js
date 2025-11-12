import fs from 'fs'
import path from 'path'

// Configuración de rutas
const CONFIG_DIR = path.join(process.cwd(), 'database')
const CONFIG_PATH = path.join(CONFIG_DIR, 'GroupConfig.json')

// Crear directorio y archivo si no existen
const initializeConfig = () => {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { recursive: true })
  }
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.writeFileSync(CONFIG_PATH, '{}', 'utf-8')
  }
}

// Inicializar al cargar el módulo
initializeConfig()

let handler = async (m, { conn, command }) => {
  // Verificar que sea un grupo
  if (!m.isGroup) return m.reply('Este comando solo funciona en grupos.')

  try {
    // Leer el archivo de configuración
    const rawData = fs.readFileSync(CONFIG_PATH, 'utf-8')
    const groupConfig = JSON.parse(rawData)
    const groupData = groupConfig[m.chat] || {}

    // Respuestas predefinidas para cada comando
    const responses = {
      tag: groupData.tag ? `${groupData.tag}` : 'ℹ️ No hay tag registrado para este clan.\n\n> Configure con .settag',
      idclan: groupData.idclan ? `🆔 *ID del clan:* ${groupData.idclan}` : 'ℹ️ No hay ID de clan registrado.\n\n> Configure con .setidclan',
      discord: groupData.discord ? `🎮 *Discord del clan:* ${groupData.discord}` : 'ℹ️ No hay enlace de Discord registrado.\n\n> Configure con .setdiscord',
      igclan: groupData.igclan ? `📷 *Instagram del clan:* ${groupData.igclan}` : 'ℹ️ No hay Instagram registrado para este clan.\n\n> Configure con .setigclan'
    }

    // Obtener la respuesta según el comando
    const response = responses[command.toLowerCase()] || 'Comando no reconocido'
    m.reply(response)

  } catch (error) {
    console.error('Error en handler:', error)
    
    const errorMessages = {
      ENOENT: '❌ El archivo de configuración no existe o no se puede leer.',
      default: '⚠️ Ocurrió un error al procesar la solicitud.'
    }
    
    m.reply(errorMessages[error.code] || errorMessages.default)
  }
}


handler.command = /^(tag|idclan|discord|igclan)$/i
export default handler