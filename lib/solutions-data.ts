export const SERVICES_SOLUTIONS = [
  {
    slug: "prospection-ia",
    name: "Prospection IA",
    description: "Ciblage IA par secteur et zone, enrichissement automatique, scoring leads, intégration CRM.",
    serviceHref: "/services/trouver-prospects",
    price: "99",
  },
  {
    slug: "site-web",
    name: "Site Web Moderne",
    description: "Site web rapide, SEO classique + SEO IA, mobile-first, templates sectoriels, livré en 14 jours.",
    serviceHref: "/services/site-web-moderne",
    price: "99",
  },
  {
    slug: "automatisation",
    name: "Automatisation RPA",
    description: "Workflows sur mesure : relances email, CRM, facturation, reporting, dashboard KPI. 200+ intégrations.",
    serviceHref: "/services/automatiser-relances",
    price: "149",
  },
  {
    slug: "integration-ia",
    name: "Intégration IA",
    description: "Chatbot site/WhatsApp, agents IA métier, RAG sur vos données, connexion outils existants.",
    serviceHref: "/services/integration-ia",
    price: "199",
  },
] as const;

export const SECTEURS = [
  {
    slug: "cabinet-conseil",
    name: "Cabinet de conseil",
    problemType: "Prospection chronophage, dépendance au bouche-à-oreille, suivi client manuel",
    solutions: {
      "prospection-ia": "Identifiez automatiquement les entreprises qui correspondent à votre expertise. Ciblage par secteur, taille et zone géographique. Enrichissement des contacts décideurs.",
      "site-web": "Un site qui positionne votre expertise et génère des leads qualifiés. Pages par domaine de compétence, cas clients, prise de RDV intégrée.",
      "automatisation": "Automatisez le suivi de vos missions, les relances prospects, le reporting client et la facturation récurrente.",
      "integration-ia": "Un assistant IA qui qualifie vos leads entrants, répond aux questions fréquentes et prépare vos rendez-vous avec le contexte client.",
    },
    faq: [
      { q: "Comment trouver de nouveaux clients pour un cabinet de conseil ?", a: "Combinez prospection IA ciblée (par secteur et taille d'entreprise) avec un site web optimisé SEO qui positionne votre expertise. Les deux canaux alimentent un pipeline qualifié." },
      { q: "Comment automatiser le suivi des missions de conseil ?", a: "Des workflows RPA connectent votre CRM, vos outils de facturation et votre reporting. Chaque étape de mission est suivie automatiquement." },
      { q: "L'IA peut-elle aider un consultant indépendant ?", a: "Oui. Un chatbot IA qualifie vos leads 24/7, un agent IA prépare vos briefs clients, et l'automatisation gère vos tâches administratives." },
    ],
  },
  {
    slug: "agence-marketing",
    name: "Agence marketing",
    problemType: "Trop de process manuels, reporting chronophage, prospection passive",
    solutions: {
      "prospection-ia": "Prospectez les PME et ETI qui n'ont pas encore d'agence. Ciblage par secteur, CA et présence digitale. Enrichissement LinkedIn et email.",
      "site-web": "Un site portfolio qui convertit : cas clients, résultats chiffrés, formulaire de brief, SEO sur vos expertises clés.",
      "automatisation": "Automatisez vos reportings clients, vos relances de devis, la compilation de KPI multi-plateformes et la facturation.",
      "integration-ia": "Un chatbot qui qualifie les briefs entrants. Des agents IA pour la veille concurrentielle, l'analyse de données et la rédaction.",
    },
    faq: [
      { q: "Comment une agence marketing peut automatiser ses reportings ?", a: "Un workflow RPA collecte les données de vos plateformes (Google Ads, Meta, Analytics), compile les KPI et génère un rapport automatique chaque semaine." },
      { q: "Comment prospecter de nouveaux clients pour une agence ?", a: "La prospection IA identifie les entreprises sans stratégie digitale structurée, enrichit les contacts et les intègre dans votre séquence de prospection." },
      { q: "L'IA peut-elle aider à la création de contenu ?", a: "Oui. Des agents IA assistent la rédaction, la veille et l'analyse de données. Ils ne remplacent pas la créativité, ils accélèrent l'exécution." },
    ],
  },
  {
    slug: "cabinet-comptable",
    name: "Cabinet comptable",
    problemType: "Relances manuelles, deadlines serrées, collecte de pièces chronophage",
    solutions: {
      "prospection-ia": "Identifiez les TPE/PME sans expert-comptable ou insatisfaites. Ciblage par zone, secteur et taille. Enrichissement email du dirigeant.",
      "site-web": "Un site professionnel qui rassure : expertises, équipe, prise de RDV en ligne, FAQ sur les obligations comptables.",
      "automatisation": "Automatisez les relances de pièces comptables, le suivi des échéances fiscales, les rappels clients et la facturation.",
      "integration-ia": "Un chatbot qui répond aux questions comptables courantes de vos clients. Un agent IA qui pré-catégorise les pièces reçues.",
    },
    faq: [
      { q: "Comment automatiser les relances de pièces comptables ?", a: "Un workflow envoie automatiquement un email personnalisé aux clients qui n'ont pas transmis leurs pièces, avec rappels progressifs." },
      { q: "Comment trouver de nouveaux clients pour un cabinet comptable ?", a: "La prospection IA cible les entreprises récemment créées ou celles en croissance qui ont besoin de structurer leur comptabilité." },
      { q: "Un chatbot IA est-il utile pour un cabinet comptable ?", a: "Oui. Il répond aux questions fréquentes (dates limites, procédures) et libère du temps pour les missions à valeur ajoutée." },
    ],
  },
  {
    slug: "esn",
    name: "ESN / SSII",
    problemType: "Prospection massive, qualification faible, suivi des missions complexe",
    solutions: {
      "prospection-ia": "Identifiez les entreprises qui recrutent des profils tech. Ciblage par stack technique, taille et localisation. Scoring par potentiel de mission.",
      "site-web": "Un site qui met en avant vos compétences techniques, vos références et vos consultants disponibles. SEO sur les technologies clés.",
      "automatisation": "Automatisez le matching consultant/mission, les relances commerciales, le suivi d'intercontrat et le reporting d'activité.",
      "integration-ia": "Un agent IA qui analyse les appels d'offres, matche les profils consultants et prépare les réponses techniques.",
    },
    faq: [
      { q: "Comment améliorer la prospection d'une ESN ?", a: "La prospection IA identifie les entreprises avec des besoins tech actifs (offres d'emploi, projets annoncés) et enrichit les contacts décideurs IT." },
      { q: "Comment automatiser le matching consultant/mission ?", a: "Un workflow compare les compétences de vos consultants disponibles avec les besoins des missions entrantes et propose les meilleurs matchs." },
      { q: "L'IA peut-elle aider à répondre aux appels d'offres ?", a: "Oui. Un agent IA analyse le cahier des charges, identifie les points clés et pré-rédige les sections techniques de votre réponse." },
    ],
  },
  {
    slug: "coach-consultant",
    name: "Coach / Consultant",
    problemType: "Pas de système de leads, dépendance au réseau, site web basique ou absent",
    solutions: {
      "prospection-ia": "Identifiez les entreprises qui ont besoin de vos compétences. Ciblage par problématique métier, taille et secteur.",
      "site-web": "Un site qui vous positionne comme expert : page de méthode, témoignages, calendrier de RDV, blog SEO sur votre thématique.",
      "automatisation": "Automatisez votre séquence de prospection, vos relances, votre facturation et le suivi de vos clients.",
      "integration-ia": "Un chatbot qui qualifie vos visiteurs et prend des RDV. Un agent IA qui prépare vos sessions avec le contexte client.",
    },
    faq: [
      { q: "Comment un coach peut-il trouver des clients en ligne ?", a: "Un site optimisé SEO + une prospection IA ciblée créent un flux régulier de leads qualifiés, sans dépendre uniquement du bouche-à-oreille." },
      { q: "Comment automatiser la prise de RDV pour un consultant ?", a: "Un formulaire intelligent sur votre site qualifie le besoin et propose directement un créneau dans votre agenda. Les confirmations et rappels sont automatiques." },
      { q: "L'IA peut-elle aider un coach dans son activité ?", a: "Oui. Un agent IA prépare vos sessions (résumé des échanges précédents, objectifs), et un chatbot répond aux questions fréquentes de vos prospects." },
    ],
  },
  {
    slug: "artisan",
    name: "Artisan / TPE",
    problemType: "Pas de visibilité en ligne, suivi client au papier ou par SMS, pas de site web",
    solutions: {
      "prospection-ia": "Identifiez les prospects locaux qui cherchent vos services. Ciblage par zone géographique et type de besoin.",
      "site-web": "Un site vitrine professionnel avec vos réalisations, zone d'intervention, devis en ligne. Visible sur Google Maps et les recherches locales.",
      "automatisation": "Automatisez vos devis, relances, rappels de chantier et facturation. Fini les oublis et le papier.",
      "integration-ia": "Un chatbot WhatsApp qui prend les demandes de devis 24/7 et les organise automatiquement dans votre planning.",
    },
    faq: [
      { q: "Un artisan a-t-il besoin d'un site web ?", a: "Oui. 70% des clients cherchent un artisan en ligne. Un site avec vos réalisations, avis et zone d'intervention vous rend trouvable sur Google." },
      { q: "Comment un artisan peut automatiser ses devis ?", a: "Un formulaire en ligne collecte les informations du client. Un workflow génère un devis pré-rempli que vous n'avez qu'à valider et envoyer." },
      { q: "L'IA est-elle accessible pour un artisan ?", a: "Oui. Un chatbot WhatsApp simple prend les demandes 24/7. Pas besoin de compétences techniques, on configure tout pour vous." },
    ],
  },
  {
    slug: "restaurant",
    name: "Restaurant / Hôtellerie",
    problemType: "Site non trouvable, pas de réservation en ligne, avis non gérés",
    solutions: {
      "prospection-ia": "Identifiez les entreprises locales pour des partenariats B2B (événements, repas d'affaires, séminaires).",
      "site-web": "Un site avec menu, réservation en ligne, galerie photos, avis Google intégrés. Optimisé pour le référencement local.",
      "automatisation": "Automatisez les confirmations de réservation, les rappels clients, les demandes d'avis post-visite et le suivi fournisseurs.",
      "integration-ia": "Un chatbot de réservation sur votre site et WhatsApp. Un agent IA qui gère les demandes d'événements et les menus personnalisés.",
    },
    faq: [
      { q: "Comment un restaurant peut-il améliorer sa visibilité en ligne ?", a: "Un site optimisé pour le SEO local, des avis Google gérés et une fiche Google Business complète. Le site doit être rapide et mobile-first." },
      { q: "Comment automatiser les réservations d'un restaurant ?", a: "Un module de réservation en ligne sur votre site + des confirmations et rappels automatiques par email ou SMS." },
      { q: "Un chatbot est-il utile pour un restaurant ?", a: "Oui. Il prend les réservations 24/7, répond aux questions (horaires, menu, allergènes) et gère les demandes d'événements." },
    ],
  },
  {
    slug: "avocat-notaire",
    name: "Avocat / Notaire",
    problemType: "Site générique, aucun lead organique, image en ligne négligée",
    solutions: {
      "prospection-ia": "Identifiez les entreprises qui ont besoin de conseil juridique : créations, litiges, conformité. Ciblage par secteur et événements.",
      "site-web": "Un site qui reflète votre expertise : domaines de droit, équipe, publications, prise de RDV confidentielle. SEO sur vos spécialités.",
      "automatisation": "Automatisez le suivi des dossiers, les relances de pièces, les rappels d'audience et la facturation des actes.",
      "integration-ia": "Un chatbot confidentiel qui pré-qualifie les demandes de consultation et oriente vers le bon expert du cabinet.",
    },
    faq: [
      { q: "Comment un avocat peut-il trouver des clients en ligne ?", a: "Un site SEO optimisé sur vos spécialités juridiques + des articles de blog sur les questions fréquentes de vos clients cibles." },
      { q: "La confidentialité est-elle assurée avec un chatbot ?", a: "Oui. Le chatbot pré-qualifie sans collecter d'informations sensibles. Les données sont hébergées en Europe et conformes RGPD." },
      { q: "Comment automatiser le suivi des dossiers juridiques ?", a: "Un workflow suit les étapes de chaque dossier, envoie les rappels de pièces et alerte sur les échéances procédurales." },
    ],
  },
  {
    slug: "immobilier",
    name: "Agence immobilière",
    problemType: "Prospection terrain uniquement, suivi manuel des mandats, site vitrine peu performant",
    solutions: {
      "prospection-ia": "Identifiez les propriétaires susceptibles de vendre : changements de vie, successions, investisseurs. Ciblage par zone et type de bien.",
      "site-web": "Un site avec listings de biens, fiches détaillées, estimateur en ligne, formulaires de contact par bien. SEO local optimisé.",
      "automatisation": "Automatisez les alertes acquéreurs, les relances mandats, le matching biens/acheteurs et le reporting d'activité.",
      "integration-ia": "Un chatbot qui qualifie les demandes (achat/vente/location), propose les biens correspondants et prend les RDV de visite.",
    },
    faq: [
      { q: "Comment une agence immobilière peut automatiser sa prospection ?", a: "La prospection IA identifie les signaux de vente (mutations, DPE, durée de détention) et enrichit les contacts propriétaires de la zone." },
      { q: "Comment améliorer le site web d'une agence immobilière ?", a: "Listings dynamiques, fiches biens complètes, estimateur en ligne, SEO local par quartier et type de bien." },
      { q: "L'IA peut-elle aider au matching biens/acheteurs ?", a: "Oui. Un agent IA compare les critères de recherche avec votre stock de biens et propose automatiquement les meilleures correspondances." },
    ],
  },
  {
    slug: "e-commerce",
    name: "E-commerce / Boutique en ligne",
    problemType: "Trafic faible, pas de rétention client, processus manuels de gestion",
    solutions: {
      "prospection-ia": "Identifiez les partenaires B2B, revendeurs et influenceurs de votre niche. Ciblage par secteur et audience.",
      "site-web": "Un site e-commerce optimisé : fiches produits SEO, tunnel de conversion, pages catégories, blog produit.",
      "automatisation": "Automatisez le suivi de commandes, les relances panier abandonné, les emails post-achat et la gestion de stock.",
      "integration-ia": "Un chatbot qui guide l'achat, répond aux questions produit et gère le SAV. Un agent IA pour les recommandations personnalisées.",
    },
    faq: [
      { q: "Comment augmenter le trafic d'un e-commerce ?", a: "SEO produit (fiches optimisées, catégories ciblées) + blog de contenu + SEO IA pour apparaître dans les recommandations des assistants IA." },
      { q: "Comment automatiser les relances panier abandonné ?", a: "Un workflow envoie une séquence de 3 emails personnalisés dans les 24h suivant l'abandon, avec le contenu du panier et une incitation." },
      { q: "Un chatbot est-il rentable pour un e-commerce ?", a: "Oui. Il réduit les tickets SAV de 40-60%, augmente le taux de conversion de 10-15% et est disponible 24/7." },
    ],
  },
] as const;

export type ServiceSolution = (typeof SERVICES_SOLUTIONS)[number];
export type Secteur = (typeof SECTEURS)[number];
