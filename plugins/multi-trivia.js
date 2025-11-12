import fs from 'fs'
import path from 'path'

let handler = async (m, { conn, text, command }) => {
  conn.trivia = conn.trivia || {}

  // Evitar que un jugador participe en más de una trivia activa
  if (Object.values(conn.trivia).find(room => room.id.startsWith('trivia') && room.players.includes(m.sender))) {
    return m.reply(`⚠️ Ya estás participando en una trivia activa. Espera a que termine antes de empezar otra.`)
  }

  // Categorías disponibles
  const categoriasDisponibles = [
    'anime', 'películas', 'series', 'videojuegos', 'música', 'historia', 'geografia',
    'ciencia', 'culturaGeneral', 'arte', 'tecnología', 'superheroes',
    'fútbol', 'marvel', 'dc', 'dbz', 'naruto', 'onepiece', 'attacktitan', 'myheroacademia'
  ]

  // Categoría elegida (o random si no se especifica)
  let categoria = text?.toLowerCase().trim()
  if (!categoriasDisponibles.includes(categoria)) {
    categoria = categoriasDisponibles[Math.floor(Math.random() * categoriasDisponibles.length)]
  }

  // Cargar archivo de preguntas de la categoría
  let filePath = path.join('./data/trivias', `${categoria}.json`)
  if (!fs.existsSync(filePath)) {
    return m.reply(`🚫 No hay preguntas registradas para la categoría *${categoria}*.`)
  }

  let preguntas = JSON.parse(fs.readFileSync(filePath))
  let trivia = preguntas[Math.floor(Math.random() * preguntas.length)]

  let id = 'trivia-' + Date.now()
  conn.trivia[id] = {
    id,
    categoria,
    pregunta: trivia.pregunta,
    opciones: trivia.opciones,
    correcta: trivia.correcta,
    chat: m.chat,
    players: [m.sender],
    respuestas: {},
    estado: 'PLAYING',
    timeout: null
  }

  let texto = `╭──» 𝙏𝙍𝙄𝙑𝙄𝘼 (${categoria.toUpperCase()}) «───✦
┊ 🧠 *${await conn.getName(m.sender)}* inició una trivia
╰────────────✦
🎯 *${trivia.pregunta}*

${trivia.opciones.map((v, i) => `  ${i + 1}. ${v}`).join('\n')}

⏰ Tienes *30 segundos* para responder.
Responde con el número o el texto.`

  await conn.reply(m.chat, texto, m)

  // Temporizador de 30 segundos
  conn.trivia[id].timeout = setTimeout(async () => {
    let data = conn.trivia[id]
    if (!data) return
    if (data.estado === 'ENDED') return

    await conn.reply(data.chat, ` *⌛ El tiempo ha expirado.*\n*Nadie respondió correctamente 😞*`, m)
    delete conn.trivia[id]
  }, 30000)
}

handler.before = async (m, { conn }) => {
  if (!m.text || m.fromMe) return

  let active = Object.values(conn.trivia || {}).find(triv => triv.chat === m.chat && triv.estado === 'PLAYING')
  if (!active) return

  let respuesta = m.text.trim()
  let correcta = active.correcta.toLowerCase()
  let jugador = m.sender

  // Evita que el mismo jugador repita respuestas iguales
  if (active.respuestas[jugador] === respuesta) return

  active.respuestas[jugador] = respuesta

  // Comprobar si es correcta (por número o texto)
  let opcionCorrectaIndex = active.opciones.findIndex(o => o.toLowerCase() === correcta)
  let respuestaEsCorrecta =
    respuesta.toLowerCase() === correcta ||
    respuesta === String(opcionCorrectaIndex + 1)

  if (respuestaEsCorrecta) {
    active.estado = 'ENDED'
    clearTimeout(active.timeout)
    await conn.reply(active.chat, `🎉 ¡Respuesta correcta!\n👑 *${await conn.getName(jugador)}* acertó.\nLa respuesta era: *${active.correcta}*`, m)
    delete conn.trivia[active.id]
  } else {
    // Reacciona ❌ si es incorrecta pero sigue el juego
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
  }
}

handler.command = /^trivia(\s+\w+)?$/i
export default handler
