/**
 * Table de transcodification des codes NAF (APE) – rev. 2
 * Source : INSEE – Nomenclature d'Activités Française
 *
 * Contient les codes les plus utilisés pour la prospection B2B.
 * Format : { code: string, label: string, section: string }
 */

export type NafEntry = {
  code: string
  label: string
  section: string
}

export const NAF_CODES: NafEntry[] = [
  // ── A — Agriculture, sylviculture et pêche ──────────────────────
  { code: '0111Z', label: 'Culture de céréales', section: 'Agriculture' },
  { code: '0113Z', label: 'Culture de légumes, melons, racines et tubercules', section: 'Agriculture' },
  { code: '0121Z', label: 'Culture de la vigne', section: 'Agriculture' },
  { code: '0141Z', label: 'Élevage de vaches laitières', section: 'Agriculture' },
  { code: '0150Z', label: 'Culture et élevage associés', section: 'Agriculture' },
  { code: '0161Z', label: 'Activités de soutien aux cultures', section: 'Agriculture' },

  // ── C — Industrie manufacturière ────────────────────────────────
  { code: '1013A', label: 'Préparation industrielle de produits à base de viande', section: 'Industrie' },
  { code: '1071A', label: 'Fabrication industrielle de pain', section: 'Industrie' },
  { code: '1071C', label: 'Boulangerie et boulangerie-pâtisserie', section: 'Industrie' },
  { code: '1101Z', label: 'Production de boissons alcooliques distillées', section: 'Industrie' },
  { code: '1102A', label: 'Fabrication de vins effervescents', section: 'Industrie' },
  { code: '1102B', label: 'Vinification', section: 'Industrie' },
  { code: '2229A', label: 'Fabrication de pièces techniques en plastique', section: 'Industrie' },
  { code: '2511Z', label: 'Fabrication de structures métalliques', section: 'Industrie' },
  { code: '2562B', label: 'Mécanique industrielle', section: 'Industrie' },
  { code: '2599A', label: 'Fabrication d\'articles métalliques ménagers', section: 'Industrie' },
  { code: '2611Z', label: 'Fabrication de composants électroniques', section: 'Industrie' },
  { code: '2620Z', label: 'Fabrication d\'ordinateurs', section: 'Industrie' },
  { code: '2630Z', label: 'Fabrication d\'équipements de communication', section: 'Industrie' },
  { code: '2651A', label: 'Fabrication d\'équipements d\'aide à la navigation', section: 'Industrie' },
  { code: '2712Z', label: 'Fabrication de matériel de distribution d\'électricité', section: 'Industrie' },
  { code: '2892Z', label: 'Fabrication de machines pour les industries extractives', section: 'Industrie' },
  { code: '2932Z', label: 'Fabrication d\'autres équipements automobiles', section: 'Industrie' },

  // ── F — Construction ────────────────────────────────────────────
  { code: '4110A', label: 'Promotion immobilière de logements', section: 'Construction' },
  { code: '4110B', label: 'Promotion immobilière de bureaux', section: 'Construction' },
  { code: '4110C', label: 'Promotion immobilière d\'autres bâtiments', section: 'Construction' },
  { code: '4120A', label: 'Construction de maisons individuelles', section: 'Construction' },
  { code: '4120B', label: 'Construction d\'autres bâtiments', section: 'Construction' },
  { code: '4211Z', label: 'Construction de routes et autoroutes', section: 'Construction' },
  { code: '4221Z', label: 'Construction de réseaux pour fluides', section: 'Construction' },
  { code: '4222Z', label: 'Construction de réseaux électriques et de télécommunications', section: 'Construction' },
  { code: '4311Z', label: 'Travaux de démolition', section: 'Construction' },
  { code: '4312A', label: 'Travaux de terrassement courants', section: 'Construction' },
  { code: '4321A', label: 'Travaux d\'installation électrique', section: 'Construction' },
  { code: '4322A', label: 'Travaux d\'installation d\'eau et de gaz', section: 'Construction' },
  { code: '4322B', label: 'Travaux d\'installation d\'équipements thermiques', section: 'Construction' },
  { code: '4329A', label: 'Travaux d\'isolation', section: 'Construction' },
  { code: '4331Z', label: 'Travaux de plâtrerie', section: 'Construction' },
  { code: '4332A', label: 'Travaux de menuiserie bois et PVC', section: 'Construction' },
  { code: '4332B', label: 'Travaux de menuiserie métallique et serrurerie', section: 'Construction' },
  { code: '4333Z', label: 'Travaux de revêtement des sols et des murs', section: 'Construction' },
  { code: '4334Z', label: 'Travaux de peinture et vitrerie', section: 'Construction' },
  { code: '4339Z', label: 'Autres travaux de finition', section: 'Construction' },
  { code: '4391A', label: 'Travaux de charpente', section: 'Construction' },
  { code: '4391B', label: 'Travaux de couverture par éléments', section: 'Construction' },
  { code: '4399C', label: 'Travaux de maçonnerie générale et gros œuvre', section: 'Construction' },

  // ── G — Commerce ────────────────────────────────────────────────
  { code: '4511Z', label: 'Commerce de voitures et de véhicules légers', section: 'Commerce' },
  { code: '4519Z', label: 'Commerce d\'autres véhicules automobiles', section: 'Commerce' },
  { code: '4520A', label: 'Entretien et réparation de véhicules légers', section: 'Commerce' },
  { code: '4532Z', label: 'Commerce de détail d\'équipements automobiles', section: 'Commerce' },
  { code: '4611Z', label: 'Intermédiaires du commerce en matières premières', section: 'Commerce' },
  { code: '4619B', label: 'Autres intermédiaires du commerce en produits divers', section: 'Commerce' },
  { code: '4641Z', label: 'Commerce de gros de textiles', section: 'Commerce' },
  { code: '4669B', label: 'Commerce de gros de fournitures et équipements industriels', section: 'Commerce' },
  { code: '4669C', label: 'Commerce de gros de fournitures pour plomberie et chauffage', section: 'Commerce' },
  { code: '4673A', label: 'Commerce de gros de bois et de matériaux de construction', section: 'Commerce' },
  { code: '4690Z', label: 'Commerce de gros non spécialisé', section: 'Commerce' },
  { code: '4711A', label: 'Commerce de détail de produits surgelés', section: 'Commerce' },
  { code: '4711B', label: 'Commerce d\'alimentation générale', section: 'Commerce' },
  { code: '4711C', label: 'Supérettes', section: 'Commerce' },
  { code: '4711D', label: 'Supermarchés', section: 'Commerce' },
  { code: '4711F', label: 'Hypermarchés', section: 'Commerce' },
  { code: '4719B', label: 'Autres commerces de détail en magasin non spécialisé', section: 'Commerce' },
  { code: '4741Z', label: 'Commerce de détail d\'ordinateurs et de périphériques', section: 'Commerce' },
  { code: '4759B', label: 'Commerce de détail d\'autres équipements du foyer', section: 'Commerce' },
  { code: '4771Z', label: 'Commerce de détail d\'habillement', section: 'Commerce' },
  { code: '4778C', label: 'Autres commerces de détail spécialisés divers', section: 'Commerce' },
  { code: '4791B', label: 'Vente à distance sur catalogue spécialisé', section: 'Commerce' },

  // ── H — Transports et entreposage ───────────────────────────────
  { code: '4920Z', label: 'Transports ferroviaires de fret', section: 'Transport' },
  { code: '4932Z', label: 'Transports de voyageurs par taxis', section: 'Transport' },
  { code: '4941A', label: 'Transports routiers de fret interurbains', section: 'Transport' },
  { code: '4941B', label: 'Transports routiers de fret de proximité', section: 'Transport' },
  { code: '4942Z', label: 'Services de déménagement', section: 'Transport' },
  { code: '5210B', label: 'Entreposage et stockage non frigorifique', section: 'Transport' },
  { code: '5229A', label: 'Messagerie, fret express', section: 'Transport' },
  { code: '5229B', label: 'Affrètement et organisation des transports', section: 'Transport' },

  // ── I — Hébergement et restauration ─────────────────────────────
  { code: '5510Z', label: 'Hôtels et hébergement similaire', section: 'Hébergement & Restauration' },
  { code: '5520Z', label: 'Hébergement touristique et autre court séjour', section: 'Hébergement & Restauration' },
  { code: '5530Z', label: 'Terrains de camping et parcs pour véhicules', section: 'Hébergement & Restauration' },
  { code: '5610A', label: 'Restauration traditionnelle', section: 'Hébergement & Restauration' },
  { code: '5610C', label: 'Restauration de type rapide', section: 'Hébergement & Restauration' },
  { code: '5621Z', label: 'Services des traiteurs', section: 'Hébergement & Restauration' },
  { code: '5630Z', label: 'Débits de boissons', section: 'Hébergement & Restauration' },

  // ── J — Information et communication ────────────────────────────
  { code: '5811Z', label: 'Édition de livres', section: 'Information & Communication' },
  { code: '5813Z', label: 'Édition de journaux', section: 'Information & Communication' },
  { code: '5821Z', label: 'Édition de jeux électroniques', section: 'Information & Communication' },
  { code: '5829A', label: 'Édition de logiciels système et de réseau', section: 'Information & Communication' },
  { code: '5829B', label: 'Édition de logiciels outils de développement', section: 'Information & Communication' },
  { code: '5829C', label: 'Édition de logiciels applicatifs', section: 'Information & Communication' },
  { code: '5911A', label: 'Production de films et de programmes TV', section: 'Information & Communication' },
  { code: '5912Z', label: 'Post-production cinéma, vidéo et TV', section: 'Information & Communication' },
  { code: '6010Z', label: 'Édition et diffusion de programmes radio', section: 'Information & Communication' },
  { code: '6020A', label: 'Édition de chaînes généralistes', section: 'Information & Communication' },
  { code: '6110Z', label: 'Télécommunications filaires', section: 'Information & Communication' },
  { code: '6120Z', label: 'Télécommunications sans fil', section: 'Information & Communication' },
  { code: '6190Z', label: 'Autres activités de télécommunication', section: 'Information & Communication' },
  { code: '6201Z', label: 'Programmation informatique', section: 'Information & Communication' },
  { code: '6202A', label: 'Conseil en systèmes et logiciels informatiques', section: 'Information & Communication' },
  { code: '6202B', label: 'Tierce maintenance de systèmes informatiques', section: 'Information & Communication' },
  { code: '6203Z', label: 'Gestion d\'installations informatiques', section: 'Information & Communication' },
  { code: '6209Z', label: 'Autres activités informatiques', section: 'Information & Communication' },
  { code: '6311Z', label: 'Traitement de données, hébergement', section: 'Information & Communication' },
  { code: '6312Z', label: 'Portails Internet', section: 'Information & Communication' },
  { code: '6391Z', label: 'Activités des agences de presse', section: 'Information & Communication' },
  { code: '6399Z', label: 'Autres services d\'information', section: 'Information & Communication' },

  // ── K — Activités financières et d'assurance ────────────────────
  { code: '6419Z', label: 'Autres intermédiations monétaires', section: 'Finance & Assurance' },
  { code: '6420Z', label: 'Activités des sociétés holding', section: 'Finance & Assurance' },
  { code: '6430Z', label: 'Fonds de placement et entités financières', section: 'Finance & Assurance' },
  { code: '6492Z', label: 'Autre distribution de crédit', section: 'Finance & Assurance' },
  { code: '6499Z', label: 'Autres activités des services financiers', section: 'Finance & Assurance' },
  { code: '6511Z', label: 'Assurance vie', section: 'Finance & Assurance' },
  { code: '6512Z', label: 'Autres assurances', section: 'Finance & Assurance' },
  { code: '6520Z', label: 'Réassurance', section: 'Finance & Assurance' },
  { code: '6622Z', label: 'Activités des agents et courtiers d\'assurance', section: 'Finance & Assurance' },
  { code: '6630Z', label: 'Gestion de fonds', section: 'Finance & Assurance' },

  // ── L — Activités immobilières ──────────────────────────────────
  { code: '6810Z', label: 'Activités des marchands de biens immobiliers', section: 'Immobilier' },
  { code: '6820A', label: 'Location de logements', section: 'Immobilier' },
  { code: '6820B', label: 'Location de terrains et d\'autres biens immobiliers', section: 'Immobilier' },
  { code: '6831Z', label: 'Agences immobilières', section: 'Immobilier' },
  { code: '6832A', label: 'Administration d\'immeubles et autres biens immobiliers', section: 'Immobilier' },
  { code: '6832B', label: 'Supports juridiques de gestion de patrimoine immobilier', section: 'Immobilier' },

  // ── M — Activités spécialisées, scientifiques et techniques ─────
  { code: '6910Z', label: 'Activités juridiques', section: 'Services spécialisés' },
  { code: '6920Z', label: 'Activités comptables', section: 'Services spécialisés' },
  { code: '7010Z', label: 'Activités des sièges sociaux', section: 'Services spécialisés' },
  { code: '7021Z', label: 'Conseil en relations publiques et communication', section: 'Services spécialisés' },
  { code: '7022Z', label: 'Conseil pour les affaires et autres conseils de gestion', section: 'Services spécialisés' },
  { code: '7111Z', label: 'Activités d\'architecture', section: 'Services spécialisés' },
  { code: '7112A', label: 'Activité des géomètres', section: 'Services spécialisés' },
  { code: '7112B', label: 'Ingénierie, études techniques', section: 'Services spécialisés' },
  { code: '7120A', label: 'Contrôle technique automobile', section: 'Services spécialisés' },
  { code: '7120B', label: 'Analyses, essais et inspections techniques', section: 'Services spécialisés' },
  { code: '7211Z', label: 'Recherche-développement en biotechnologie', section: 'Services spécialisés' },
  { code: '7219Z', label: 'Recherche-développement en sciences physiques et naturelles', section: 'Services spécialisés' },
  { code: '7220Z', label: 'Recherche-développement en sciences humaines et sociales', section: 'Services spécialisés' },
  { code: '7311Z', label: 'Activités des agences de publicité', section: 'Services spécialisés' },
  { code: '7312Z', label: 'Régie publicitaire de médias', section: 'Services spécialisés' },
  { code: '7320Z', label: 'Études de marché et sondages', section: 'Services spécialisés' },
  { code: '7410Z', label: 'Activités spécialisées de design', section: 'Services spécialisés' },
  { code: '7420Z', label: 'Activités photographiques', section: 'Services spécialisés' },
  { code: '7430Z', label: 'Traduction et interprétation', section: 'Services spécialisés' },
  { code: '7490A', label: 'Activité des économistes de la construction', section: 'Services spécialisés' },
  { code: '7490B', label: 'Activités spécialisées, scientifiques et techniques diverses', section: 'Services spécialisés' },
  { code: '7500Z', label: 'Activités vétérinaires', section: 'Services spécialisés' },

  // ── N — Activités de services administratifs et de soutien ──────
  { code: '7711A', label: 'Location de courte durée de voitures', section: 'Services administratifs' },
  { code: '7712Z', label: 'Location de camions', section: 'Services administratifs' },
  { code: '7810Z', label: 'Activités des agences de placement de main-d\'œuvre', section: 'Services administratifs' },
  { code: '7820Z', label: 'Activités des agences de travail temporaire', section: 'Services administratifs' },
  { code: '7830Z', label: 'Autre mise à disposition de ressources humaines', section: 'Services administratifs' },
  { code: '7911Z', label: 'Activités des agences de voyage', section: 'Services administratifs' },
  { code: '7912Z', label: 'Activités des voyagistes', section: 'Services administratifs' },
  { code: '8010Z', label: 'Activités de sécurité privée', section: 'Services administratifs' },
  { code: '8020Z', label: 'Activités liées aux systèmes de sécurité', section: 'Services administratifs' },
  { code: '8110Z', label: 'Activités combinées de soutien lié aux bâtiments', section: 'Services administratifs' },
  { code: '8121Z', label: 'Nettoyage courant des bâtiments', section: 'Services administratifs' },
  { code: '8122Z', label: 'Autres activités de nettoyage', section: 'Services administratifs' },
  { code: '8130Z', label: 'Services d\'aménagement paysager', section: 'Services administratifs' },
  { code: '8211Z', label: 'Services administratifs combinés de bureau', section: 'Services administratifs' },
  { code: '8219Z', label: 'Photocopie, préparation de documents', section: 'Services administratifs' },
  { code: '8220Z', label: 'Activités de centres d\'appels', section: 'Services administratifs' },
  { code: '8230Z', label: 'Organisation de foires, salons et congrès', section: 'Services administratifs' },
  { code: '8291Z', label: 'Activités des agences de recouvrement et des sociétés d\'information financière', section: 'Services administratifs' },
  { code: '8299Z', label: 'Autres activités de soutien aux entreprises', section: 'Services administratifs' },

  // ── P — Enseignement ────────────────────────────────────────────
  { code: '8510Z', label: 'Enseignement pré-primaire', section: 'Enseignement' },
  { code: '8520Z', label: 'Enseignement primaire', section: 'Enseignement' },
  { code: '8531Z', label: 'Enseignement secondaire général', section: 'Enseignement' },
  { code: '8532Z', label: 'Enseignement secondaire technique ou professionnel', section: 'Enseignement' },
  { code: '8541Z', label: 'Enseignement post-secondaire non supérieur', section: 'Enseignement' },
  { code: '8542Z', label: 'Enseignement supérieur', section: 'Enseignement' },
  { code: '8551Z', label: 'Enseignement de disciplines sportives et d\'activités de loisirs', section: 'Enseignement' },
  { code: '8552Z', label: 'Enseignement culturel', section: 'Enseignement' },
  { code: '8553Z', label: 'Enseignement de la conduite', section: 'Enseignement' },
  { code: '8559A', label: 'Formation continue d\'adultes', section: 'Enseignement' },
  { code: '8559B', label: 'Autres enseignements', section: 'Enseignement' },

  // ── Q — Santé humaine et action sociale ─────────────────────────
  { code: '8610Z', label: 'Activités hospitalières', section: 'Santé & Social' },
  { code: '8621Z', label: 'Activité des médecins généralistes', section: 'Santé & Social' },
  { code: '8622A', label: 'Activités de radiodiagnostic et de radiothérapie', section: 'Santé & Social' },
  { code: '8622B', label: 'Activités chirurgicales', section: 'Santé & Social' },
  { code: '8622C', label: 'Autres activités des médecins spécialistes', section: 'Santé & Social' },
  { code: '8623Z', label: 'Pratique dentaire', section: 'Santé & Social' },
  { code: '8690A', label: 'Ambulances', section: 'Santé & Social' },
  { code: '8690B', label: 'Laboratoires d\'analyses médicales', section: 'Santé & Social' },
  { code: '8690D', label: 'Activités des infirmiers et des sages-femmes', section: 'Santé & Social' },
  { code: '8690E', label: 'Activités des professionnels de la rééducation', section: 'Santé & Social' },
  { code: '8690F', label: 'Activités de santé humaine non classées ailleurs', section: 'Santé & Social' },
  { code: '8710A', label: 'Hébergement médicalisé pour personnes âgées', section: 'Santé & Social' },
  { code: '8710C', label: 'Hébergement médicalisé pour enfants handicapés', section: 'Santé & Social' },
  { code: '8720A', label: 'Hébergement social pour handicapés mentaux', section: 'Santé & Social' },
  { code: '8730A', label: 'Hébergement social pour personnes âgées', section: 'Santé & Social' },
  { code: '8810A', label: 'Aide à domicile', section: 'Santé & Social' },
  { code: '8810B', label: 'Accueil ou accompagnement sans hébergement d\'adultes handicapés', section: 'Santé & Social' },
  { code: '8810C', label: 'Aide par le travail', section: 'Santé & Social' },
  { code: '8891A', label: 'Accueil de jeunes enfants', section: 'Santé & Social' },
  { code: '8891B', label: 'Accueil ou accompagnement d\'enfants et d\'adolescents', section: 'Santé & Social' },
  { code: '8899B', label: 'Action sociale sans hébergement', section: 'Santé & Social' },

  // ── R — Arts, spectacles et activités récréatives ───────────────
  { code: '9001Z', label: 'Arts du spectacle vivant', section: 'Arts & Loisirs' },
  { code: '9002Z', label: 'Activités de soutien au spectacle vivant', section: 'Arts & Loisirs' },
  { code: '9003A', label: 'Création artistique relevant des arts plastiques', section: 'Arts & Loisirs' },
  { code: '9003B', label: 'Autre création artistique', section: 'Arts & Loisirs' },
  { code: '9004Z', label: 'Gestion de salles de spectacles', section: 'Arts & Loisirs' },
  { code: '9311Z', label: 'Gestion d\'installations sportives', section: 'Arts & Loisirs' },
  { code: '9312Z', label: 'Activités de clubs de sports', section: 'Arts & Loisirs' },
  { code: '9313Z', label: 'Activités des centres de culture physique', section: 'Arts & Loisirs' },
  { code: '9321Z', label: 'Activités des parcs d\'attractions et parcs à thèmes', section: 'Arts & Loisirs' },
  { code: '9329Z', label: 'Autres activités récréatives et de loisirs', section: 'Arts & Loisirs' },

  // ── S — Autres activités de services ────────────────────────────
  { code: '9411Z', label: 'Activités des organisations patronales et consulaires', section: 'Autres services' },
  { code: '9412Z', label: 'Activités des organisations professionnelles', section: 'Autres services' },
  { code: '9420Z', label: 'Activités des syndicats de salariés', section: 'Autres services' },
  { code: '9499Z', label: 'Autres organisations fonctionnant par adhésion volontaire', section: 'Autres services' },
  { code: '9511Z', label: 'Réparation d\'ordinateurs et de périphériques', section: 'Autres services' },
  { code: '9521Z', label: 'Réparation de produits électroniques grand public', section: 'Autres services' },
  { code: '9522Z', label: 'Réparation d\'appareils électroménagers', section: 'Autres services' },
  { code: '9601A', label: 'Blanchisserie-teinturerie de gros', section: 'Autres services' },
  { code: '9601B', label: 'Blanchisserie-teinturerie de détail', section: 'Autres services' },
  { code: '9602A', label: 'Coiffure', section: 'Autres services' },
  { code: '9602B', label: 'Soins de beauté', section: 'Autres services' },
  { code: '9603Z', label: 'Services funéraires', section: 'Autres services' },
  { code: '9604Z', label: 'Entretien corporel', section: 'Autres services' },
  { code: '9609Z', label: 'Autres services personnels', section: 'Autres services' },

  // ── D/E — Énergie et eau ────────────────────────────────────────
  { code: '3511Z', label: 'Production d\'électricité', section: 'Énergie & Eau' },
  { code: '3512Z', label: 'Transport d\'électricité', section: 'Énergie & Eau' },
  { code: '3513Z', label: 'Distribution d\'électricit��', section: 'Énergie & Eau' },
  { code: '3514Z', label: 'Commerce d\'électricité', section: 'Énergie & Eau' },
  { code: '3521Z', label: 'Production de combustibles gazeux', section: 'Énergie & Eau' },
  { code: '3522Z', label: 'Distribution de combustibles gazeux', section: 'Énergie & Eau' },
  { code: '3530Z', label: 'Production et distribution de vapeur et d\'air conditionné', section: 'Énergie & Eau' },
  { code: '3600Z', label: 'Captage, traitement et distribution d\'eau', section: 'Énergie & Eau' },
  { code: '3700Z', label: 'Collecte et traitement des eaux usées', section: 'Énergie & Eau' },
  { code: '3811Z', label: 'Collecte des déchets non dangereux', section: 'Énergie & Eau' },
  { code: '3812Z', label: 'Collecte des déchets dangereux', section: 'Énergie & Eau' },
  { code: '3821Z', label: 'Traitement et élimination des déchets non dangereux', section: 'Énergie & Eau' },
  { code: '3822Z', label: 'Traitement et élimination des déchets dangereux', section: 'Énergie & Eau' },
  { code: '3900Z', label: 'Dépollution et autres services de gestion des déchets', section: 'Énergie & Eau' },
]

/** Recherche par code ou libellé (insensible à la casse, accents ignorés). */
export function searchNafCodes(query: string, limit = 10): NafEntry[] {
  if (!query.trim()) return []
  const normalized = query.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

  return NAF_CODES.filter((entry) => {
    const code = entry.code.toLowerCase()
    const label = entry.label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const section = entry.section.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    return code.startsWith(normalized) || label.includes(normalized) || section.includes(normalized)
  }).slice(0, limit)
}

/** Trouve le libellé d'un code NAF exact. */
export function getNafLabel(code: string): string | null {
  const entry = NAF_CODES.find((e) => e.code.toUpperCase() === code.toUpperCase())
  return entry?.label ?? null
}
