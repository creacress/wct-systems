import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description:
    "Conditions générales de vente de WCT Systems — prestations IA & automatisation pour PME.",
  alternates: { canonical: "/conditions-generales-de-vente" },
};

/* ────────────────────────────────────────────────────── */
/* Composants réutilisables                               */
/* ────────────────────────────────────────────────────── */

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur sm:p-8">
      <h2 className="text-lg font-semibold tracking-tight">{titre}</h2>
      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────── */
/* Page                                                   */
/* ────────────────────────────────────────────────────── */

export default function CGVPage() {
  return (
    <main id="content" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        {/* En-tête */}
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Conditions commerciales
          </div>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Conditions générales de vente
          </h1>
          <p className="text-sm text-muted-foreground">
            Applicables à l&apos;ensemble des prestations proposées par WCT
            Systems ([RAISON SOCIALE]) aux clients professionnels (B2B).
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {/* Article 1 */}
          <Section titre="Article 1 — Objet">
            <p>
              Les présentes Conditions Générales de Vente (CGV) régissent les
              relations contractuelles entre WCT Systems, ci-après « le
              Prestataire », et tout client professionnel, ci-après « le
              Client », dans le cadre de prestations de services en
              intelligence artificielle, automatisation et développement
              numérique.
            </p>
            <p>
              Toute commande implique l&apos;acceptation pleine et entière des
              présentes CGV, qui prévalent sur tout autre document du Client.
            </p>
          </Section>

          {/* Article 2 */}
          <Section titre="Article 2 — Services proposés">
            <p>Le Prestataire propose les services suivants :</p>
            <ul className="grid gap-2">
              {[
                "Recherche et qualification de prospects B2B",
                "Automatisation des relances et séquences commerciales",
                "Mise en place de CRM et gestion de rendez-vous",
                "Création de dashboards KPI et reporting",
                "Conception de sites web orientés génération de leads",
                "Conseil et audit en stratégie digitale",
              ].map((s) => (
                <li
                  key={s}
                  className="rounded-2xl border bg-background px-3 py-2"
                >
                  {s}
                </li>
              ))}
            </ul>
            <p>
              Le périmètre exact de chaque prestation est défini dans le devis
              ou la proposition commerciale acceptée par le Client.
            </p>
          </Section>

          {/* Article 3 */}
          <Section titre="Article 3 — Tarifs et modalités">
            <p>
              Les prestations sont facturées selon deux modalités, combinables :
            </p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Forfait initial
            </h3>
            <p>
              Un montant fixe couvre la conception, le développement et la
              livraison de la V1 du système commandé. Le montant est défini dans
              le devis signé.
            </p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Abonnement mensuel
            </h3>
            <p>
              Un montant récurrent couvre la maintenance, les mises à jour,
              l&apos;hébergement et le support continu. Le montant et la
              périodicité sont précisés dans le devis.
            </p>

            <p className="mt-3">
              Tous les prix sont indiqués en euros et hors taxes (HT). La TVA
              applicable est ajoutée au taux en vigueur au jour de la
              facturation.
            </p>
            <p>
              Le Prestataire se réserve le droit de modifier ses tarifs. Les
              nouveaux tarifs s&apos;appliquent aux commandes passées après la
              date de modification. Pour les abonnements en cours, tout
              changement tarifaire sera notifié avec un préavis de 30 jours.
            </p>
          </Section>

          {/* Article 4 */}
          <Section titre="Article 4 — Conditions de paiement">
            <p>Les factures sont payables à 30 jours date de facture.</p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Forfait initial
            </h3>
            <p>
              Sauf accord contraire : 50 % à la commande, 50 % à la livraison
              de la V1.
            </p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Abonnement
            </h3>
            <p>
              Facturé mensuellement, payable par virement ou prélèvement
              automatique.
            </p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Retards de paiement
            </h3>
            <p>
              Conformément aux articles L.441-10 et suivants du Code de
              commerce, tout retard de paiement entraîne de plein droit :
            </p>
            <ul className="grid gap-2">
              <li className="rounded-2xl border bg-background px-3 py-2">
                Des pénalités de retard au taux directeur de la BCE majoré de 10
                points, appliquées sur le montant TTC
              </li>
              <li className="rounded-2xl border bg-background px-3 py-2">
                Une indemnité forfaitaire de 40 € pour frais de recouvrement
              </li>
            </ul>
          </Section>

          {/* Article 5 */}
          <Section titre="Article 5 — Exécution des prestations">
            <p>
              Les délais de livraison sont indicatifs et communiqués dans le
              devis. Le Prestataire s&apos;engage à mettre en œuvre tous les
              moyens nécessaires pour respecter les délais convenus.
            </p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Obligations du Prestataire
            </h3>
            <p>
              Fournir les prestations conformément au devis accepté, informer le
              Client de l&apos;avancement, et livrer les livrables dans les
              délais convenus.
            </p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Obligations du Client
            </h3>
            <p>
              Fournir les informations et accès nécessaires à la réalisation des
              prestations, valider les livrables dans un délai de 10 jours
              ouvrés après livraison, et régler les factures aux échéances
              convenues.
            </p>
          </Section>

          {/* Article 6 */}
          <Section titre="Article 6 — Propriété intellectuelle">
            <p>
              Le Client reste propriétaire de ses données (listes de prospects,
              contenus fournis, données CRM).
            </p>
            <p>
              Le Prestataire conserve la propriété intellectuelle des outils,
              scripts, workflows et systèmes développés, sauf cession
              expressément prévue dans le devis. Le Client bénéficie
              d&apos;un droit d&apos;utilisation non exclusif pour la durée du contrat.
            </p>
            <p>
              Les développements spécifiques réalisés sur mesure pour le Client
              lui sont cédés à la livraison et au paiement intégral, sauf
              mention contraire.
            </p>
          </Section>

          {/* Article 7 */}
          <Section titre="Article 7 — Responsabilité">
            <p>
              Le Prestataire est soumis à une obligation de moyens. Sa
              responsabilité ne peut être engagée qu&apos;en cas de faute prouvée.
            </p>
            <p>
              En tout état de cause, la responsabilité du Prestataire est
              limitée au montant total des sommes effectivement perçues au
              titre du contrat concerné au cours des 12 derniers mois.
            </p>
            <p>
              Le Prestataire ne saurait être tenu responsable des dommages
              indirects, pertes de données, pertes de chiffre d&apos;affaires ou
              manque à gagner.
            </p>
          </Section>

          {/* Article 8 */}
          <Section titre="Article 8 — Résiliation">
            <h3 className="text-sm font-medium text-foreground">
              Forfait
            </h3>
            <p>
              Le Client peut résilier avant la livraison moyennant le paiement
              des prestations déjà réalisées.
            </p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Abonnement
            </h3>
            <p>
              Chaque partie peut résilier l&apos;abonnement avec un préavis de
              30 jours avant la prochaine échéance mensuelle, par email à
              contact@webcresson.com.
            </p>

            <h3 className="mt-3 text-sm font-medium text-foreground">
              Conséquences
            </h3>
            <p>
              En cas de résiliation, le Prestataire fournit au Client un export
              de ses données dans un format standard (CSV, JSON) dans un délai
              de 15 jours. L&apos;accès aux services est maintenu jusqu&apos;à
              la fin de la période payée.
            </p>
          </Section>

          {/* Article 9 */}
          <Section titre="Article 9 — Données personnelles">
            <p>
              Le Prestataire traite des données personnelles dans le cadre de
              l&apos;exécution des prestations, en qualité de sous-traitant au
              sens du RGPD.
            </p>
            <p>
              Les modalités de traitement, les droits des personnes concernées
              et les engagements du Prestataire sont détaillés dans les{" "}
              <Link
                href="/mentions-legales"
                className="underline underline-offset-2 hover:text-foreground"
              >
                mentions légales et politique de confidentialité
              </Link>
              .
            </p>
          </Section>

          {/* Article 10 */}
          <Section titre="Article 10 — Force majeure">
            <p>
              Aucune des parties ne pourra être tenue responsable d&apos;un
              manquement à ses obligations contractuelles en cas de force
              majeure telle que définie par l&apos;article 1218 du Code civil
              (événement imprévisible, irrésistible et extérieur).
            </p>
            <p>
              En cas de force majeure supérieure à 60 jours, chaque partie
              pourra résilier le contrat sans indemnité.
            </p>
          </Section>

          {/* Article 11 */}
          <Section titre="Article 11 — Droit applicable et litiges">
            <p>
              Les présentes CGV sont régies par le droit français. En cas de
              litige, les parties s&apos;engagent à rechercher une solution
              amiable avant toute action judiciaire.
            </p>
            <p>
              À défaut d&apos;accord amiable dans un délai de 30 jours, le
              litige sera porté devant les tribunaux compétents du ressort du
              siège social du Prestataire.
            </p>
          </Section>
        </div>

        {/* Liens utiles */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/mentions-legales"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            Mentions légales
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
          >
            Nous contacter
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Dernière mise à jour : mars 2026
        </p>
      </div>
    </main>
  );
}
