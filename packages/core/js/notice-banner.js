/**
 * DSML Notice Banner Handler
 * Automatise la fermeture des bandeaux .ml-notice-banner lors du clic sur .ml-notice-banner__close
 */
export function initNoticeBanners() {
  const banners = document.querySelectorAll('.ml-notice-banner');

  banners.forEach((banner) => {
    if (banner.getAttribute('data-ml-initialized') === 'true') return;
    banner.setAttribute('data-ml-initialized', 'true');

    const closeBtn = banner.querySelector('.ml-notice-banner__close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        banner.setAttribute('hidden', 'true');
        banner.dispatchEvent(new CustomEvent('ml:notice-closed', {
          bubbles: true,
          detail: { banner }
        }));
      });
    }
  });
}

// Auto-initialisation au chargement du DOM si en environnement navigateur
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNoticeBanners);
  } else {
    initNoticeBanners();
  }
}
