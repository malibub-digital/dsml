/**
 * DSML Segmented Control Handler
 * Automatise le basculement d'état (active + aria-checked) pour tout .ml-segmented-control
 */
export function initSegmentedControls() {
  const controls = document.querySelectorAll('.ml-segmented-control');
  
  controls.forEach((control) => {
    // Éviter les doubles bindings
    if (control.getAttribute('data-ml-initialized') === 'true') return;
    control.setAttribute('data-ml-initialized', 'true');

    const buttons = control.querySelectorAll('.ml-segment-btn');

    buttons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        // désactiver tous les autres boutons du même groupe
        buttons.forEach((other) => {
          other.classList.remove('active');
          other.setAttribute('aria-checked', 'false');
        });

        // activer le bouton cliqué
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');

        // Déclencher un événement personnalisé
        control.dispatchEvent(new CustomEvent('ml:change', {
          bubbles: true,
          detail: {
            value: btn.getAttribute('data-value') || btn.innerText.trim(),
            activeButton: btn
          }
        }));
      });
    });
  });
}

// Auto-initialisation au chargement du DOM si en environnement navigateur
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSegmentedControls);
  } else {
    initSegmentedControls();
  }
}
