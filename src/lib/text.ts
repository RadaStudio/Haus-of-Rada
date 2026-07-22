// Helper per accenti inline nei testi editabili da Keystatic.
// Convenzione: la parola accentata si scrive tra asterischi.
//   "Raccontami il *tuo* spazio."  ->  <i>tuo</i>  (colore dato dal CSS della sezione)
// Per il manifesto (due colori) si usano due marcatori:
//   *verde*  -> accento verde  |  ~ambra~ -> accento ambra

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** `*parola*` -> `<i>parola</i>` (accento singolo, colore dalla sezione). */
export function accent(input = ''): string {
  return escapeHtml(input).replace(/\*(.+?)\*/g, '<i>$1</i>');
}

/** `*verde*` -> span verde, `~ambra~` -> span ambra (usato nel manifesto). */
export function accentDuo(input = ''): string {
  return escapeHtml(input)
    .replace(/~(.+?)~/g, '<span class="amberhl">$1</span>')
    .replace(/\*(.+?)\*/g, '<span class="hl">$1</span>');
}
