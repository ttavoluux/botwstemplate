import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, command }) => {
  const carpeta = path.join('./data/trivias')

  // 📚 Categorías disponibles
  const categorias = [
    'anime',
    'películas',
    'series',
    'videojuegos',
    'música',
    'historia',
    'geografia',
    'ciencia',
    'culturaGeneral',
    'arte',
    'tecnología',
    'superheroes',
    'fútbol',
    'marvel',
    'dc',
    'dbz',
    'naruto',
    'onepiece',
    'attacktitan',
    'myheroacademia'
  ]

  // 🧱 Generador de preguntas base
  const generarPreguntas = (categoria) => {
    const preguntas = []
    for (let i = 1; i <= 100; i++) {
      preguntas.push({
        pregunta: `(${categoria.toUpperCase()}) Pregunta número ${i}: ¿Cuál es la respuesta correcta?`,
        opciones: [
          `Opción A de ${categoria}`,
          `Opción B de ${categoria}`,
          `Opción C de ${categoria}`,
          `Opción D de ${categoria}`
        ],
        correcta: `Opción A de ${categoria}`
      })
    }
    return preguntas
  }

  // 🧩 Crear carpeta si no existe
  if (!fs.existsSync(carpeta)) {
    fs.mkdirSync(carpeta, { recursive: true })
  }

  let creados = []
  let existentes = []

  for (const cat of categorias) {
    const filePath = path.join(carpeta, `${cat}.json`)
    if (!fs.existsSync(filePath)) {
      const contenido = generarPreguntas(cat)
      fs.writeFileSync(filePath, JSON.stringify(contenido, null, 2))
      creados.push(cat)
    } else {
      existentes.push(cat)
    }
  }

  let msg = `📚 *Creación de archivos de Trivia*\n\n`

  if (creados.length > 0) {
    msg += `✅ Archivos creados:\n${creados.map(c => `• ${c}`).join('\n')}\n\n`
  }

  if (existentes.length > 0) {
    msg += `⚠️ Ya existían:\n${existentes.map(c => `• ${c}`).join('\n')}\n\n`
  }

  msg += `🧩 Ruta: \`data/trivias/\`\n🎯 Total categorías: ${categorias.length}`

  await conn.reply(m.chat, msg, m)
}

handler.command = /^crearjson$/i
handler.tags = ['trivia']
handler.help = ['crearjson']

export default handler
