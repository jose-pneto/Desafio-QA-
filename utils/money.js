/** Converte textos como "Item total: $29.99" no número 29.99 */
function parseMoney(text) {
  const match = text.match(/\$([0-9]+(?:\.[0-9]{2})?)/);
  if (!match) {
    throw new Error(`Valor monetário não encontrado em: "${text}"`);
  }
  return Number(match[1]);
}

module.exports = { parseMoney };