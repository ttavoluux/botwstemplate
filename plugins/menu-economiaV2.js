import fetch from "node-fetch"

let handler = async (m, { command, text }) => {
  let base = command.replace('.', '').toUpperCase()
  let cantidad = parseFloat(text) || 1

  const banderas = {
    USD: "🇺🇸", MXN: "🇲🇽", EUR: "🇪🇺", GBP: "🇬🇧", JPY: "🇯🇵", BRL: "🇧🇷",
    ARS: "🇦🇷", CLP: "🇨🇱", CAD: "🇨🇦", CNY: "🇨🇳", KRW: "🇰🇷", INR: "🇮🇳",
    CHF: "🇨🇭", ZAR: "🇿🇦", SEK: "🇸🇪", NOK: "🇳🇴", AUD: "🇦🇺", NZD: "🇳🇿",
    BGN: "🇧🇬", CZK: "🇨🇿", DKK: "🇩🇰", HUF: "🇭🇺", PHP: "🇵🇭",
    PLN: "🇵🇱", RON: "🇷🇴", ISK: "🇮🇸", MYR: "🇲🇾", THB: "🇹🇭",
    HKD: "🇭🇰", IDR: "🇮🇩", ILS: "🇮🇱", TRY: "🇹🇷"
  }

  try {
    // Obtener tasas base USD
    let res = await fetch(`https://api.frankfurter.dev/v1/latest?base=USD`)
    let data = await res.json()

    if (!data.rates) throw new Error('No se encontraron tasas de cambio.')

    const rates = data.rates
    const fecha = data.date

    if (!rates[base]) return m.reply(`🇺🇸 *${base}* es la moneda base.`)

    // Calcular tasas invertidas (basadas en la moneda elegida)
    const tasaBase = rates[base]
    const tasasInvertidas = {}
    for (let moneda in rates) {
      tasasInvertidas[moneda] = rates[moneda] / tasaBase
    }

    // Si el usuario ingresa una cantidad, realizar conversión
    if (!isNaN(cantidad) && cantidad !== 1) {
      let valorEnUSD = cantidad / rates[base]
      let respuesta = `💱 *Conversión de ${cantidad} ${base} ${banderas[base] || ''}*\n\n`
      respuesta += `${banderas.USD} *USD:* ${valorEnUSD.toFixed(2)}\n`
      respuesta += `${banderas.EUR} *EUR:* ${(valorEnUSD * rates.EUR).toFixed(2)}\n`
      respuesta += `${banderas.GBP} *GBP:* ${(valorEnUSD * rates.GBP).toFixed(2)}\n`
      respuesta += `${banderas.MXN} *MXN:* ${(valorEnUSD * rates.MXN).toFixed(2)}\n`
      respuesta += `\n📅 Fecha: ${fecha}`
      return await m.reply(respuesta)
    }

    // Mostrar tasas comunes (incluyendo USD siempre)
    let texto = `🌍 *Tasas de cambio basadas en ${base}* (${banderas[base] || ''})\n📅 Fecha: ${fecha}\n\n`
    const comunes = ["USD", "EUR", "GBP", "JPY", "BRL", "CAD", "CNY"]

    for (let moneda of comunes) {
      if (moneda === "USD") {
        // Mostrar siempre USD (1 si base es USD)
        if (base === "USD") {
          texto += `${banderas[moneda]} *${moneda}:* 1.00\n`
        } else {
          texto += `${banderas[moneda]} *${moneda}:* ${(1 / rates[base]).toFixed(2)}\n`
        }
      } else if (tasasInvertidas[moneda]) {
        texto += `${banderas[moneda]} *${moneda}:* ${tasasInvertidas[moneda].toFixed(2)}\n`
      }
    }

    // Línea resumen USD ↔ base
    texto += `\n💵 *1 ${banderas.USD} = ${(rates[base]).toFixed(4)} ${banderas[base]}*`

    await m.reply(texto)
  } catch (err) {
    console.error(err)
    await m.reply(`❌ Error al obtener las tasas de cambio.`)
  }
}

handler.command = /^(usd|eur|mxn|jpy|gbp|brl|cad|cny|aud|chf|inr|krw|zar|try|sek|sgd|bgn|czk|dkk|huf|nok|nzd|php|pln|ron|isk|myr|thb|hkd|idr|ils)$/i
handler.help = ["divisa", "<moneda> <cantidad>"]
handler.tags = ["economia"]

export default handler
