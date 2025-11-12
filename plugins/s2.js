import { sticker } from '../lib/sticker.js'
import sharp from 'sharp' // Asegúrate de tener sharp instalado

let handler = async (m, { conn, usedPrefix, command, text: args }) => {
  let stiker = false
  
  try {
    // Verificar si el mensaje es una respuesta a otro mensaje
    if (!m.quoted) {
      return conn.sendMessage(m.chat, {
        text: `╔══════════════════════╗
║  🎨 *STICKER ST* 🎨  ║
╚══════════════════════╝

┌─⊷ *USO CORRECTO*
│ • Respuesta: _.st_ + color
│ • Ejemplo: _.st azul_
│
├─⊷ *COLORES DISPONIBLES*
│ • rojo, azul, verde, amarillo
│ • rosa, morado, naranja, negro
│ • blanco, gris, café
│
├─⊷ *LÍMITE DE TEXTO*
│ • Máximo 180 caracteres
│
├─⊷ *EJEMPLOS*
│ • _.st azul_ → Fondo azul
│ • _.st_ → (fondo blanco por defecto)
│
└─⊷ *NOTA*
   • Si no especificas color, se usará fondo blanco
   
╰⊹ Realizado por: ${global.author}`,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            title: "st sticker",
            body: "Responde a un texto con .ss [color]",
            thumbnail: await (await fetch('https://imgbox.com/w68CFJvH')).buffer(),
            sourceUrl: "https://imgbox.com/w68CFJvH"
          }
        }
      }, { quoted: m });
    }
    
    let q = m.quoted
    let text = q.text || q.caption || ''
    
    if (!text) {
      throw `❌ *RESPONDE A UN TEXTO VÁLIDO*\n\nResponde a un mensaje de texto con el comando *.st* seguido de un color opcional.\n\nEjemplo: *.st azul*`;
    }
      
      if (text.length > 180) {
      throw `❌ *TEXTO DEMASIADO LARGO*\n\nEl texto no puede exceder los 180 caracteres.\n\nLongitud actual: ${text.length} caracteres.`;
    }
    
    // Procesar el color de fondo
    let backgroundColor = 'white';
    let textColor = 'black';
    
    // Si se proporcionaron argumentos, tomar el primero como color
    if (args) {
      const colorArgs = args.trim().toLowerCase().split(' ');
      const colorName = colorArgs[0];
      
      const colorMap = {
        'rojo': '#FF0000', 'red': '#FF0000',
        'azul': '#0000FF', 'blue': '#0000FF',
        'verde': '#008000', 'green': '#008000',
        'amarillo': '#FFFF00', 'yellow': '#FFFF00',
        'rosa': '#FFC0CB', 'pink': '#FFC0CB',
        'morado': '#800080', 'purple': '#800080',
        'naranja': '#FFA500', 'orange': '#FFA500',
        'negro': '#000000', 'black': '#000000',
        'blanco': '#FFFFFF', 'white': '#FFFFFF',
        'gris': '#808080', 'gray': '#808080',
        'café': '#A52A2A', 'brown': '#A52A2A',
        'marron': '#A52A2A'
      };
      
      if (colorMap[colorName]) {
        backgroundColor = colorMap[colorName];
        // Si el fondo es oscuro, usar texto blanco
        const isDark = ['rojo', 'azul', 'verde', 'morado', 'naranja', 'negro', 'café', 'marron', 
                        'red', 'blue', 'green', 'purple', 'orange', 'black', 'brown'].includes(colorName);
        textColor = isDark ? 'white' : 'black';
      } else {
        throw `❌ *COLOR NO VÁLIDO*\n\nColor "${colorName}" no reconocido. Usa uno de estos:\n• rojo, azul, verde, amarillo\n• rosa, morado, naranja, negro\n• blanco, gris, café`;
      }
    }
    
    // Función para calcular el tamaño de fuente según la longitud del texto
    function calculateFontSize(text) {
      const textLength = text.length;
      
      if (textLength <= 5) return 120;
      if (textLength <= 10) return 100;
      if (textLength <= 20) return 80;
      if (textLength <= 30) return 60;
      return 42;
    }
    
    // Función para dividir texto en múltiples líneas con límite de ancho
    function splitTextIntoLines(text, fontSize, maxWidth = 492) {
      const approxCharWidth = fontSize * 0.6;
      const maxCharsPerLine = Math.floor(maxWidth / approxCharWidth);
      
      const words = text.split(' ')
      const lines = []
      let currentLine = ''
      
      for (const word of words) {
        if ((currentLine + word).length > maxCharsPerLine) {
          if (currentLine.length > 0) {
            lines.push(currentLine.trim())
          }
          currentLine = word + ' '
        } else {
          currentLine += word + ' '
        }
      }
      
      if (currentLine.length > 0) {
        lines.push(currentLine.trim())
      }
      
      return lines
    }
    
    // Calcular tamaño de fuente según la longitud del texto
    const fontSize = calculateFontSize(text);
    
    // Dividir el texto en líneas considerando el padding
    const textLines = splitTextIntoLines(text, fontSize);
    
    // Configuración de la imagen
    const width = 512
    const height = 512
    const padding = 10
    const lineHeight = fontSize * 1.2;
    
    // Calcular altura total del texto
    const textHeight = textLines.length * lineHeight
    const startY = (height - textHeight) / 2 + fontSize
    
    // Crear SVG con múltiples líneas de texto y padding
    let svgText = `
      <svg width="${width}" height="${height}">
        <rect width="100%" height="100%" fill="${backgroundColor}"/>
    `
    
    // Añadir cada línea de texto
    textLines.forEach((line, index) => {
      const y = startY + (index * lineHeight)
      if (y > padding && y < height - padding) {
        svgText += `
          <text x="50%" y="${y}" font-family="Arial" font-size="${fontSize}px" fill="${textColor}" text-anchor="middle" font-weight="bold">${line}</text>
        `
      }
    })
    
    svgText += `</svg>`
    
    // Convertir SVG a PNG
    const imageBuffer = await sharp(Buffer.from(svgText))
      .resize(width, height)
      .png()
      .toBuffer()
    
    // Crear sticker a partir de la imagen generada
    stiker = await sticker(imageBuffer, false, global.packname, global.author)
    
    // Enviar el sticker
    conn.sendFile(m.chat, stiker, 'sticker.webp', '', m, true)
    
  } catch (error) {
    console.error(error)
    conn.sendMessage(m.chat, { 
      text: `❌ *ERROR AL CREAR STICKER*\n\n${error.message || error}\n\nUsa el comando *${usedPrefix}st* sin argumentos para ver las instrucciones.` 
    }, { quoted: m })
  }
}

handler.help = ['st [color]']
handler.tags = ['sticker']
handler.command = ['st']

export default handler