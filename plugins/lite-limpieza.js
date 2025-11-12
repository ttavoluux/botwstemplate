import { exec } from 'child_process'

const handler = async (m, { conn, isOwner, usedPrefix, command, text }) => {
 

  await m.reply('🧹 Limpiando memoria RAM...')

  // Función para formatear bytes
  const format = (bytes) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    if (bytes === 0) return '0 Bytes'
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
  }

  const initialMemory = process.memoryUsage()

  // Forzar la recolección de basura
  if (global.gc) {
    global.gc()
  } else {
    m.reply('La recolección de basura no está expuesta. Inicia el bot con `node --expose-gc main.js` para un mejor rendimiento de este comando.')
  }

  const finalMemory = process.memoryUsage()

  const memoryFreed = {
    rss: initialMemory.rss - finalMemory.rss,
    heapTotal: initialMemory.heapTotal - finalMemory.heapTotal,
    heapUsed: initialMemory.heapUsed - finalMemory.heapUsed,
    external: initialMemory.external - finalMemory.external,
  }

  let response = `*Limpieza de RAM completada* ✅\n\n`
  response += `*Memoria Liberada:*\n`
  response += `- RSS: ${format(memoryFreed.rss)}\n`
  response += `- Heap Total: ${format(memoryFreed.heapTotal)}\n`
  response += `- Heap Usado: ${format(memoryFreed.heapUsed)}\n`
  response += `- Externa: ${format(memoryFreed.external)}\n\n`
  response += `*Uso de Memoria Actual:*\n`
  response += `- RSS: ${format(finalMemory.rss)}\n`
  response += `- Heap Total: ${format(finalMemory.heapTotal)}\n`
  response += `- Heap Usado: ${format(finalMemory.heapUsed)}\n`
  response += `- Externa: ${format(finalMemory.external)}`

  await m.reply(response)
}

handler.help = ['clearram']
handler.tags = ['owner']
handler.command = /^(clearram|limpiarram|ram)$/i

export default handler
