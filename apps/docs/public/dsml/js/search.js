/**
 * DSML Search Interaction Script
 * Manages Option 2 (Discreet search trigger button and modal dialog)
 * with shortcut keys, suggest lists, and search filtering.
 */
document.addEventListener('DOMContentLoaded', () => {
  const searchModal = document.getElementById('ml-search-modal');
  const searchTriggers = document.querySelectorAll('.ml-search-trigger');
  
  if (!searchModal) return;
  
  const searchInput = searchModal.querySelector('.ml-search-modal-input');
  const closeBtn = searchModal.querySelector('.ml-modal-close');
  const popularSection = searchModal.querySelector('.ml-search-popular-section');
  const resultsSection = searchModal.querySelector('.ml-search-results-section');
  const resultsList = searchModal.querySelector('.ml-search-modal-results-list');
    
  let searchDatabase = [];
  const isConsulatSite = window.location.pathname.includes('site-consulat');
  const isApejSite = window.location.pathname.includes('site-apej');
  const isLegacyDocs = window.location.pathname.includes('docs-legacy.html') || window.location.pathname.includes('/core/');
  
  if (isConsulatSite) {
    searchDatabase = [
      { title: 'Carte consulaire', desc: 'Pièces à fournir, création de dossier et retrait de carte NINA', url: 'demarche.html' },
      { title: 'Passeport biométrique', desc: 'Enrôlement, renouvellement, tarifs et suivi de production', url: 'index.html#passeport' },
      { title: 'Visa pour le Mali', desc: 'Conditions d\'entrée sur le territoire malien et dépôt de demande', url: 'index.html#visa' },
      { title: 'État civil & Actes', desc: 'Actes de naissance, mariage, procurations et légalisations', url: 'index.html#etat-civil' },
      { title: 'Prendre rendez-vous', desc: 'Choisir un créneau en ligne pour votre venue au consulat', url: 'rendez-vous.html' },
      { title: 'Suivre mon dossier', desc: 'Entrez votre numéro de dossier pour suivre son avancement', url: 'suivi.html' },
      { title: 'Actualités & Communiqués', desc: 'Dernières informations du consulat général du Mali à Lyon', url: 'actualites.html' },
      { title: 'Nouvelle procédure de retrait des cartes consulaires', desc: 'Article actualité : comment retirer sa carte consulaire et sa carte NINA', url: 'actualite-retrait.html' },
      { title: 'Permanence consulaire à Saint-Étienne', desc: 'Article actualité : permanence exceptionnelle le 15 août à Saint-Étienne', url: 'actualite-permanence.html' },
      { title: 'Horaires d\'été du consulat', desc: 'Article actualité : aménagement des horaires d\'accueil de 9 h à 15 h en août', url: 'actualite-horaires.html' },
      { title: 'Horaires & Contact', desc: 'Coordonnées, horaires d\'ouverture et plan d\'accès', url: 'index.html#contact' }
    ];
  } else if (isApejSite) {
    searchDatabase = [
      { title: 'Stage de qualification', desc: 'Première expérience professionnelle encadrée pour les jeunes diplômés', url: 'index.html#stages' },
      { title: 'Financement de projet', desc: 'Fonds de garantie et prêts pour les jeunes entrepreneurs', url: 'index.html#financements' },
      { title: 'Apprentissage & Métiers', desc: 'Formations pratiques en alternance dans les ateliers locaux', url: 'index.html#apprentissage' },
      { title: 'Chantiers HIMO', desc: 'Emplois à Haute Intensité de Main d\'Œuvre pour le développement local', url: 'index.html#himo' },
      { title: 'Appels à projets ouverts', desc: 'Guichets de financements en cours (Fonds Agro-Sahel, Défi Numérique)', url: 'index.html#programmes' },
      { title: 'Formations CREE', desc: 'Ateliers gratuits pour structurer votre idée en business plan', url: 'index.html#cree' },
      { title: 'Nos Antennes Régionales', desc: 'Coordonnées des antennes régionales de l\'APEJ au Mali', url: 'index.html#antennes' }
    ];
  } else if (isLegacyDocs) {
    searchDatabase = [
      { title: 'Boutons (Buttons)', desc: 'Composants de boutons primaires, secondaires et d\'icônes', url: 'index.html#buttons-section' },
      { title: 'Cartes (Cards)', desc: 'Cartes classiques, avec image, horizontales et numérotées', url: 'index.html#cards-section' },
      { title: 'Formulaires (Forms)', desc: 'Champs, sélecteurs, checkboxes, radios et validation', url: 'index.html#forms-section' },
      { title: 'Navigation', desc: 'Fil d\'Ariane, pagination, steppers et sidenav', url: 'index.html#nav-section' },
      { title: 'Accordéons (Accordions)', desc: 'Pliables progressifs pour FAQs et contenus masqués', url: 'index.html#accordions-section' },
      { title: 'Modales (Dialogs)', desc: 'Fenêtres contextuelles et boîtes de dialogue standard HTML5', url: 'index.html#rich-section' },
      { title: 'Badges & Tags', desc: 'Tags de statuts colorés (Succès, Attention, Erreur, Info)', url: 'index.html#badges-section' },
      { title: 'Typographie & Polices', desc: 'Échelles de texte, titres (Display, Titre-1) et police Archivo', url: 'index.html#typography-section' },
      { title: 'Recherche (Search)', desc: 'Barre Hero, déclencheur discret avec modale et barre documentation', url: 'index.html#search-section' }
    ];
  } else {
    searchDatabase = [
      { title: 'Introduction', desc: 'Présentation générale et philosophie du Design System Mali (DSML)', url: '/introduction/' },
      { title: 'Guide d\'installation', desc: 'Installer et intégrer le DSML via npm ou CDN dans vos projets web', url: '/installation/' },
      { title: 'Changelog', desc: 'Historique des versions, notes de mise à jour et nouveautés du DSML', url: '/changelog/' },
      { title: 'Couleurs (Palette)', desc: 'Palette officielle de couleurs du Mali (Mali Vert, Sahel Or, Rouge National, Niger River)', url: '/fondations/couleurs/' },
      { title: 'Typographie & Polices', desc: 'Styles typographiques et polices de caractères du DSML (Archivo et Atkinson Hyperlegible)', url: '/fondations/typographie/' },
      { title: 'Espacements', desc: 'Système de grille et échelle d\'espacement pour les marges et paddings', url: '/fondations/espacements/' },
      { title: 'Rayons & Ombres', desc: 'Rayons de bordure et ombres portées pour les éléments graphiques', url: '/fondations/rayons-ombres/' },
      { title: 'Pictogrammes', desc: 'Pictogrammes thématiques officiels et représentatifs de la République', url: '/fondations/pictogrammes/' },
      { title: 'Icônes', desc: 'Icônes fonctionnelles basées sur FontAwesome intégrées', url: '/fondations/icones/' },
      { title: 'Marque & Drapeau', desc: 'Identité de l\'État, drapeau du Mali, sceau et normes graphiques officielles', url: '/fondations/marque-nationale/' },
      { title: 'Boutons (Buttons)', desc: 'Composants de boutons primaires, secondaires, tertiaires et d\'icônes', url: '/composants/boutons/' },
      { title: 'Alertes & Callouts', desc: 'Messages de statut, notifications, callouts et bannières globales', url: '/composants/alertes/' },
      { title: 'Cartes (Cards)', desc: 'Composants de cartes classiques, avec image, horizontales et thématiques', url: '/composants/cartes/' },
      { title: 'Formulaires & Inputs', desc: 'Champs de saisie, sélecteurs, boutons radio, cases à cocher et validation', url: '/composants/formulaires/' },
      { title: 'Badges & Tags', desc: 'Tags de statuts colorés et badges d\'information', url: '/composants/badges/' },
      { title: 'Accordéons (Accordions)', desc: 'Composants d\'accordéon pliables progressifs pour FAQs et informations denses', url: '/composants/accordeons/' },
      { title: 'Navigation', desc: 'Fil d\'Ariane, pagination, steppers et navigation latérale', url: '/composants/navigation/' },
      { title: 'Sommaire (Table des matières)', desc: 'Composant de navigation ancrée intra-page pour les longs articles', url: '/composants/sommaire/' },
      { title: 'Recherche (Search)', desc: 'Barres de recherche et modales du DSML intégrées', url: '/composants/recherche/' },
      { title: 'Contenu & Articles', desc: 'Composants de contenu de type article et mise en page éditoriale', url: '/composants/articles/' },
      { title: 'Blocs de code', desc: 'Mise en forme des blocs de code source et coloration syntaxique', url: '/composants/blocs-de-code/' },
      { title: 'En-tête & Pied de page (Layout)', desc: 'Layouts de header et footer officiels du DSML', url: '/layouts/header-footer/' },
      { title: 'Cadrages Photo', desc: 'Règles et exemples de cadrages photo réglementaires pour le gouvernement', url: '/layouts/cadrages-photo/' },
      { title: 'Accessibilité', desc: 'Déclaration d\'accessibilité et conformité RGAA / WCAG du DSML', url: '/accessibilite' },
      { title: 'Contribuer', desc: 'Guide pour contribuer au développement et à l\'amélioration du DSML', url: '/contribuer' },
      { title: 'Mentions Légales', desc: 'Informations légales et éditoriales du Design System Mali', url: '/mentions-legales' }
    ];
  }

  const openSearch = () => {
    searchModal.showModal();
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 50);
    }
  };

  const closeSearch = () => {
    searchModal.close();
    if (searchInput) {
      searchInput.value = '';
    }
    toggleSections(false);
  };

  const toggleSections = (hasQuery) => {
    if (hasQuery) {
      if (popularSection) popularSection.style.display = 'none';
      if (resultsSection) resultsSection.style.display = 'block';
    } else {
      if (popularSection) popularSection.style.display = 'block';
      if (resultsSection) resultsSection.style.display = 'none';
    }
  };

  const performSearch = (query) => {
    if (!resultsList) return;
    
    resultsList.innerHTML = '';
    const cleanQuery = query.toLowerCase().trim();
    
    if (cleanQuery.length === 0) {
      toggleSections(false);
      return;
    }
    
    toggleSections(true);
    
    const matches = searchDatabase.filter(item => 
      item.title.toLowerCase().includes(cleanQuery) || 
      item.desc.toLowerCase().includes(cleanQuery)
    );
    
    if (matches.length === 0) {
      resultsList.innerHTML = `
        <div style="padding: var(--ml-space-4); text-align: center; color: var(--ml-color-neutral-500); font-family: var(--ml-font-body); font-size: 14px;">
          Aucun résultat trouvé pour "<strong>${query}</strong>"
        </div>
      `;
      return;
    }
    
    matches.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="${item.url}" class="ml-search-modal-item ${index === 0 ? 'active' : ''}">
          <div>
            <div class="ml-search-modal-item-title">${item.title}</div>
            <div class="ml-search-modal-item-desc">${item.desc}</div>
          </div>
          <span class="ml-search-modal-item-arrow">→</span>
        </a>
      `;
      
      li.querySelector('a').addEventListener('click', () => {
        setTimeout(closeSearch, 100);
      });
      
      resultsList.appendChild(li);
    });
  };

  searchTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearch);
  }

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) {
      closeSearch();
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });
  }

  document.addEventListener('keydown', (e) => {
    const isEditing = document.activeElement.tagName === 'INPUT' || 
                      document.activeElement.tagName === 'TEXTAREA' || 
                      document.activeElement.isContentEditable;
                      
    if (((e.ctrlKey || e.metaKey) && e.key === 'k') || (e.key === '/' && !isEditing)) {
      e.preventDefault();
      openSearch();
    }
    
    if (searchModal.open) {
      if (e.key === 'Escape') {
        closeSearch();
      }
      
      const items = resultsList ? resultsList.querySelectorAll('.ml-search-modal-item') : [];
      if (items.length > 0) {
        let activeIndex = -1;
        items.forEach((item, index) => {
          if (item.classList.contains('active')) activeIndex = index;
        });
        
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (activeIndex !== -1) items[activeIndex].classList.remove('active');
          const nextIndex = (activeIndex + 1) % items.length;
          items[nextIndex].classList.add('active');
          items[nextIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (activeIndex !== -1) items[activeIndex].classList.remove('active');
          const prevIndex = (activeIndex - 1 + items.length) % items.length;
          items[prevIndex].classList.add('active');
          items[prevIndex].scrollIntoView({ block: 'nearest' });
        } else if (e.key === 'Enter') {
          if (activeIndex !== -1) {
            e.preventDefault();
            items[activeIndex].click();
          }
        }
      }
    }
  });

  const burgerBtns = document.querySelectorAll('.ml-header-burger');
  burgerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const header = btn.closest('.ml-header');
      const nav = header ? header.querySelector('.ml-header-nav') : null;
      if (nav) {
        const isOpen = nav.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        
        const svg = btn.querySelector('svg');
        if (svg) {
          if (isOpen) {
            svg.innerHTML = '<path d="M18 6L6 18M6 6l12 12"></path>';
          } else {
            svg.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16"></path>';
          }
        }
      }
    });
  });

  const navCloseBtns = document.querySelectorAll('.ml-header-nav-close');
  navCloseBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const header = closeBtn.closest('.ml-header');
      const nav = header ? header.querySelector('.ml-header-nav') : null;
      const burger = header ? header.querySelector('.ml-header-burger') : null;
      if (nav) {
        nav.classList.remove('is-open');
      }
      if (burger) {
        burger.setAttribute('aria-expanded', 'false');
        const svg = burger.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<path d="M4 6h16M4 12h16M4 18h16"></path>';
        }
      }
    });
  });
});
