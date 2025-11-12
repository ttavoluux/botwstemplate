export async function before(m, { conn }) {
  if (!conn.trivia) return

  // Buscar trivia activa en este chat
  let triv = Object.values(conn.trivia).find(t => t.chat === m.chat && t.estado === 'PLAYING')
  if (!triv) return

  // Ignorar mensajes del bot
  if (m.fromMe) return
  if (!m.text) return

  let respuesta = m.text.trim().toLowerCase()
  let correcta = triv.correcta.toLowerCase()

  // Si ya terminó, ignorar
  if (triv.estado === 'ENDED') return

  // Verificar si la respuesta es correcta (texto o número)
  let indiceCorrecto = triv.opciones.findIndex(v => v.toLowerCase() === correcta)
  let esCorrecta = respuesta === correcta || parseInt(respuesta) === indiceCorrecto + 1

  if (esCorrecta) {
    triv.estado = 'ENDED'
    clearTimeout(triv.timeout)

    await conn.reply(triv.chat, `🎉 ¡Respuesta correcta!\n👑 *${await conn.getName(m.sender)}* acertó.\nLa respuesta era: *${triv.correcta}*`, m)
    delete conn.trivia[triv.id]
  } else {
    // ❌ reaccionar si está mal
    try {
      await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    } catch {}
  }
}
