import type { Metadata } from "next";
import Link from "next/link";
import { ResetCookiesButton } from "./reset-cookies-button";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales, politique de confidentialité et gestion des cookies du site webcresson.com — WCT Systems.",
  alternates: { canonical: "/mentions-legales" },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/* ────────────────────────────────────────────────────── */
/* Sections réutilisables                                 */
/* ────────────────────────────────────────────────────── */

function Section({
  titre,
  children,
}: {
  titre: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border bg-background/70 p-6 shadow-sm backdrop-blur sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.04]">
      <h2 className="font-display text-lg font-semibold tracking-tight">{titre}</h2>
      <div className="mt-4 space-y-3 text-sm text-muted-foreground">
        {children}
      </div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-background px-3 py-2">
      <span className="font-medium text-foreground">{label}</span> : {value}
    </div>
  );
}

/* ────────────────────────────────────────────────────── */
/* Page                                                   */
/* ────────────────────────────────────────────────────── */

export default function MentionsLegalesPage() {
  return (
    <main id="content" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/40 via-background to-background dark:from-slate-950/15" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* En-tête */}
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
            Informations légales
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Mentions légales
          </h1>
          <p className="text-sm text-muted-foreground">
            Conformément aux articles 6-III et 19 de la Loi n° 2004-575 du 21
            juin 2004 pour la Confiance dans l&apos;économie numérique (LCEN).
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {/* 1. Éditeur du site */}
          <Section titre="1. Éditeur du site">
            <div className="grid gap-2">
              <Row label="Raison sociale" value="WebCresson" />
              <Row label="Forme juridique" value="EI" />
              <Row label="Capital social" value="[MONTANT] €" />
              <Row label="SIREN" value="[NUMÉRO SIREN]" />
              <Row label="SIRET" value="[NUMÉRO SIRET]" />
              <Row label="RCS" value="[VILLE] — n° [NUMÉRO]" />
              <Row label="N° TVA intracommunautaire" value="[NUMÉRO TVA]" />
              <Row label="Siège social" value="Rue des Sirènes, 78180 Montigny" />
              <Row label="Téléphone" value="0766029632" />
              <Row label="Email" value="contact@webcresson.com" />
              <Row label="Directeur de la publication" value="CRESSON Alexis" />
            </div>
          </Section>

          {/* 2. Hébergeur */}
          <Section titre="2. Hébergeur">
            <div className="grid gap-2">
              <Row label="Raison sociale" value="Vercel Inc." />
              <Row label="Adresse" value="440 N Barranca Ave #4133, Covina, CA 91723, États-Unis" />
              <Row label="Site web" value="vercel.com" />
            </div>
          </Section>

          {/* 3. Propriété intellectuelle */}
          <Section titre="3. Propriété intellectuelle">
            <p>
              L&apos;ensemble du contenu du site {SITE_URL} (textes, images,
              graphismes, logo, icônes, code source) est la propriété exclusive
              de WCT Systems ou de ses partenaires et est protégé par les lois
              françaises et internationales relatives à la propriété
              intellectuelle.
            </p>
            <p>
              Toute reproduction, représentation, modification, publication ou
              adaptation totale ou partielle est interdite sans accord préalable
              écrit de WCT Systems.
            </p>
          </Section>

          {/* 4. Données personnelles */}
          <Section titre="4. Protection des données personnelles (RGPD)">
            <p>
              Conformément au Règlement Général sur la Protection des Données
              (UE 2016/679) et à la loi Informatique et Libertés du 6 janvier
              1978 modifiée, vous disposez de droits sur vos données
              personnelles.
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              Responsable du traitement
            </h3>
            <p>WCT Systems — contact@webcresson.com</p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              Données collectées et finalités
            </h3>
            <div className="grid gap-2">
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  Formulaire de contact
                </span>{" "}
                — nom, email, entreprise, téléphone, message. Finalité : répondre
                à votre demande. Base légale : consentement.
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  Cookies analytics
                </span>{" "}
                — données de navigation anonymisées (pages vues, durée). Finalité
                : améliorer le site. Base légale : consentement (bannière
                cookies).
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  Espace client
                </span>{" "}
                — email, mot de passe (hashé). Finalité : authentification et
                accès au tableau de bord. Base légale : exécution du contrat.
              </div>
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              Durée de conservation
            </h3>
            <p>
              Données de contact : 3 ans après le dernier échange. Données
              analytics : 14 mois. Données de compte client : durée de la
              relation contractuelle + 3 ans.
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              Vos droits
            </h3>
            <p>
              Vous pouvez exercer vos droits d&apos;accès, de rectification, de
              suppression, de portabilité et d&apos;opposition en écrivant à{" "}
              <a
                href="mailto:contact@webcresson.com"
                className="underline underline-offset-2 hover:text-foreground"
              >
                contact@webcresson.com
              </a>
              . Réponse sous 30 jours.
            </p>
            <p>
              En cas de litige, vous pouvez introduire une réclamation auprès de
              la CNIL :{" "}
              <a
                href="https://www.cnil.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-foreground"
              >
                www.cnil.fr
              </a>
            </p>
          </Section>

          {/* 5. Cookies */}
          <Section titre="5. Cookies">
            <p>
              Ce site utilise des cookies strictement nécessaires et des cookies
              d&apos;analyse soumis à votre consentement.
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              Cookies essentiels (toujours actifs)
            </h3>
            <div className="grid gap-2">
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  Session / authentification
                </span>{" "}
                — nécessaire au fonctionnement de l&apos;espace client.
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  cookie-consent
                </span>{" "}
                — enregistre votre choix de cookies. Durée : 6 mois.
              </div>
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              Cookies analytics (soumis à consentement)
            </h3>
            <div className="grid gap-2">
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">
                  Google Tag Manager / Google Analytics (GA4)
                </span>{" "}
                — mesure d&apos;audience anonymisée. Durée : 14 mois max.
              </div>
            </div>

            <p className="mt-4">
              Vous pouvez modifier votre choix à tout moment en supprimant le
              cookie &quot;cookie-consent&quot; dans les paramètres de votre
              navigateur, ou en cliquant ci-dessous.
            </p>
            <ResetCookiesButton />
          </Section>

          {/* 6. Crédits */}
          <Section titre="6. Crédits">
            <p>
              Site conçu et développé par WCT Systems. Hébergé sur Vercel.
              Construit avec Next.js, Tailwind CSS et TypeScript.
            </p>
          </Section>
        </div>

        {/* Liens utiles */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/conditions-generales-de-vente"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            Conditions générales de vente
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
