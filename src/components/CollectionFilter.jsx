import { useEffect, useState } from 'react';

// React island generico: filtra le card server-rendered dentro #<gridId>
// per il valore di un data-attribute (`attr`), aggiornando un contatore.
// Usato da Progetti (attr="cat") e Journal (attr="serie").
export default function CollectionFilter({
  gridId,
  attr = 'cat',
  filters = [],
  total = 0,
  nounOne = 'progetto',
  nounMany = 'progetti',
  label = 'Filtra',
}) {
  const [active, setActive] = useState(filters[0]?.key ?? 'tutti');
  const [count, setCount] = useState(total);

  useEffect(() => {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll(`[data-${attr}]`));
    let shown = 0;
    cards.forEach((c) => {
      const match = active === 'tutti' || c.dataset[attr] === active;
      c.hidden = !match;
      if (match) shown += 1;
    });
    setCount(shown);
  }, [active, gridId, attr]);

  return (
    <div className="controls">
      <div className="filters" role="group" aria-label={label}>
        {filters.map((f) => (
          <button
            key={f.key}
            type="button"
            className={active === f.key ? 'active' : undefined}
            aria-pressed={active === f.key}
            onClick={() => setActive(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="count" aria-live="polite">
        {count} {count === 1 ? nounOne : nounMany}
      </div>
    </div>
  );
}
