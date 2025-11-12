let handler = async (m) => {
  const monedas = [
    { code: 'AUD', flag: '🇦🇺', name: 'Dólar australiano', country: 'Australia' },
    { code: 'BGN', flag: '🇧🇬', name: 'Lev búlgaro', country: 'Bulgaria' },
    { code: 'BRL', flag: '🇧🇷', name: 'Real brasileño', country: 'Brasil' },
    { code: 'CAD', flag: '🇨🇦', name: 'Dólar canadiense', country: 'Canadá' },
    { code: 'CHF', flag: '🇨🇭', name: 'Franco suizo', country: 'Suiza' },
    { code: 'CNY', flag: '🇨🇳', name: 'Yuan renminbi', country: 'China' },
    { code: 'CZK', flag: '🇨🇿', name: 'Corona checa', country: 'República Checa' },
    { code: 'DKK', flag: '🇩🇰', name: 'Corona danesa', country: 'Dinamarca' },
    { code: 'EUR', flag: '🇪🇺', name: 'Euro', country: 'Unión Europea' },
    { code: 'GBP', flag: '🇬🇧', name: 'Libra esterlina', country: 'Reino Unido' },
    { code: 'HKD', flag: '🇭🇰', name: 'Dólar de Hong Kong', country: 'Hong Kong' },
    { code: 'HUF', flag: '🇭🇺', name: 'Florín húngaro', country: 'Hungría' },
    { code: 'IDR', flag: '🇮🇩', name: 'Rupia indonesia', country: 'Indonesia' },
    { code: 'ILS', flag: '🇮🇱', name: 'Nuevo séquel israelí', country: 'Israel' },
    { code: 'INR', flag: '🇮🇳', name: 'Rupia india', country: 'India' },
    { code: 'ISK', flag: '🇮🇸', name: 'Corona islandesa', country: 'Islandia' },
    { code: 'JPY', flag: '🇯🇵', name: 'Yen japonés', country: 'Japón' },
    { code: 'KRW', flag: '🇰🇷', name: 'Won surcoreano', country: 'Corea del Sur' },
    { code: 'MXN', flag: '🇲🇽', name: 'Peso mexicano', country: 'México' },
    { code: 'MYR', flag: '🇲🇾', name: 'Ringgit malayo', country: 'Malasia' },
    { code: 'NOK', flag: '🇳🇴', name: 'Corona noruega', country: 'Noruega' },
    { code: 'NZD', flag: '🇳🇿', name: 'Dólar neozelandés', country: 'Nueva Zelanda' },
    { code: 'PHP', flag: '🇵🇭', name: 'Peso filipino', country: 'Filipinas' },
    { code: 'PLN', flag: '🇵🇱', name: 'Złoty polaco', country: 'Polonia' },
    { code: 'RON', flag: '🇷🇴', name: 'Leu rumano', country: 'Rumania' },
    { code: 'SEK', flag: '🇸🇪', name: 'Corona sueca', country: 'Suecia' },
    { code: 'SGD', flag: '🇸🇬', name: 'Dólar de Singapur', country: 'Singapur' },
    { code: 'THB', flag: '🇹🇭', name: 'Baht tailandés', country: 'Tailandia' },
    { code: 'TRY', flag: '🇹🇷', name: 'Lira turca', country: 'Turquía' },
    { code: 'ZAR', flag: '🇿🇦', name: 'Rand sudafricano', country: 'Sudáfrica' },
    { code: 'USD', flag: '🇺🇸', name: 'Dólar estadounidense', country: 'Estados Unidos' }
  ]

  let msg = `🌍 *Monedas* \n`
  msg += monedas.map(m => `${m.flag} *${m.code}* - ${m.name} (${m.country})`).join('\n')
  msg += `\n\n💡 Usa comandos como: \n*.usd*, *.eur*, *.mxn*, *.jpy* o *.usd 100* para convertir montos.`

  await m.reply(msg)
}

handler.command = /^monedas|economia$/i
handler.help = ['monedas']
handler.tags = ['info']
export default handler
