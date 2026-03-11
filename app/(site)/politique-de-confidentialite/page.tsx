import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politique de confidentialit\u00e9",
  description:
    "Politique de confidentialit\u00e9 de WebCresson (WCT Systems) \u2014 donn\u00e9es collect\u00e9es, utilisation, partage avec des tiers et vos droits RGPD.",
  alternates: { canonical: "/politique-de-confidentialite" },
};

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Composants r\u00e9utilisables                               */
/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

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

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-background px-3 py-2">
      <span className="font-medium text-foreground">{label}</span> : {value}
    </div>
  );
}

/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
/* Page                                                   */
/* \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */

export default function PolitiqueDeConfidentialitePage() {
  return (
    <main id="content" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50/40 via-background to-background dark:from-slate-950/15" />

      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        {/* En-t\u00eate */}
        <div className="space-y-4">
          <div className="inline-flex items-center rounded-full border border-slate-300 bg-slate-100 px-4 py-1 text-xs font-medium uppercase tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300">
            Protection des donn\u00e9es
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Politique de confidentialit\u00e9
          </h1>
          <p className="text-sm text-muted-foreground">
            Cette politique explique quelles donn\u00e9es personnelles nous
            collectons, comment nous les utilisons et les prot\u00e9geons, et
            quels sont vos droits conform\u00e9ment au RGPD (R\u00e8glement UE
            2016/679).
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {/* 1. Responsable du traitement */}
          <Section titre="1. Responsable du traitement">
            <p>
              Le responsable du traitement des donn\u00e9es personnelles
              collect\u00e9es sur le site webcresson.com est :
            </p>
            <div className="grid gap-2">
              <DataRow label="Raison sociale" value="WebCresson (WCT Systems)" />
              <DataRow label="Forme juridique" value="EI" />
              <DataRow label="Adresse" value="Rue des Sir\u00e8nes, 78180 Montigny" />
              <DataRow label="Email" value="contact@webcresson.com" />
              <DataRow label="T\u00e9l\u00e9phone" value="07 66 02 96 32" />
              <DataRow label="Responsable" value="CRESSON Alexis" />
            </div>
          </Section>

          {/* 2. Donn\u00e9es collect\u00e9es */}
          <Section titre="2. Donn\u00e9es personnelles collect\u00e9es">
            <p>
              Nous collectons uniquement les donn\u00e9es n\u00e9cessaires au
              fonctionnement de nos services. Voici le d\u00e9tail par
              cat\u00e9gorie :
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              a) Formulaire de contact
            </h3>
            <div className="grid gap-2">
              <DataRow label="Donn\u00e9es" value="Nom, pr\u00e9nom, adresse email, num\u00e9ro de t\u00e9l\u00e9phone (facultatif), nom de l&apos;entreprise (facultatif), message" />
              <DataRow label="Finalit\u00e9" value="R\u00e9pondre \u00e0 votre demande de contact ou de devis" />
              <DataRow label="Base l\u00e9gale" value="Consentement (article 6.1.a du RGPD)" />
              <DataRow label="Dur\u00e9e de conservation" value="3 ans apr\u00e8s le dernier \u00e9change" />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              b) Cr\u00e9ation de compte / Espace client
            </h3>
            <div className="grid gap-2">
              <DataRow label="Donn\u00e9es" value="Adresse email, mot de passe (stock\u00e9 sous forme hash\u00e9e, jamais en clair)" />
              <DataRow label="Finalit\u00e9" value="Authentification et acc\u00e8s \u00e0 votre tableau de bord client" />
              <DataRow label="Base l\u00e9gale" value="Ex\u00e9cution du contrat (article 6.1.b du RGPD)" />
              <DataRow label="Dur\u00e9e de conservation" value="Dur\u00e9e de la relation contractuelle + 3 ans" />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              c) Prospection B2B (espace client)
            </h3>
            <div className="grid gap-2">
              <DataRow label="Donn\u00e9es" value="Donn\u00e9es d&apos;entreprises publiques (SIREN, raison sociale, secteur d&apos;activit\u00e9, coordonn\u00e9es professionnelles)" />
              <DataRow label="Finalit\u00e9" value="Enrichissement et qualification de prospects B2B pour nos clients" />
              <DataRow label="Base l\u00e9gale" value="Int\u00e9r\u00eat l\u00e9gitime (article 6.1.f du RGPD)" />
              <DataRow label="Dur\u00e9e de conservation" value="Dur\u00e9e du contrat client. Supprim\u00e9es sur demande" />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              d) Cookies et donn\u00e9es de navigation
            </h3>
            <div className="grid gap-2">
              <DataRow label="Donn\u00e9es" value="Pages visit\u00e9es, dur\u00e9e de session, type d&apos;appareil, navigateur (donn\u00e9es anonymis\u00e9es)" />
              <DataRow label="Finalit\u00e9" value="Am\u00e9lioration de l&apos;exp\u00e9rience utilisateur et mesure d&apos;audience" />
              <DataRow label="Base l\u00e9gale" value="Consentement via la banni\u00e8re cookies (article 6.1.a du RGPD)" />
              <DataRow label="Dur\u00e9e de conservation" value="14 mois maximum" />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              e) Connexion via LinkedIn ou r\u00e9seaux sociaux
            </h3>
            <div className="grid gap-2">
              <DataRow label="Donn\u00e9es" value="Nom, pr\u00e9nom, adresse email, photo de profil (selon les autorisations accord\u00e9es)" />
              <DataRow label="Finalit\u00e9" value="Simplifier la cr\u00e9ation de compte et l&apos;authentification" />
              <DataRow label="Base l\u00e9gale" value="Consentement (article 6.1.a du RGPD)" />
              <DataRow label="Dur\u00e9e de conservation" value="Dur\u00e9e de la relation contractuelle + 3 ans" />
            </div>
          </Section>

          {/* 3. Utilisation des donn\u00e9es */}
          <Section titre="3. Comment nous utilisons vos donn\u00e9es">
            <p>Vos donn\u00e9es personnelles sont utilis\u00e9es exclusivement pour :</p>
            <ul className="grid gap-2">
              {[
                "R\u00e9pondre \u00e0 vos demandes de contact et de devis",
                "G\u00e9rer votre compte client et vous fournir acc\u00e8s \u00e0 nos services",
                "Ex\u00e9cuter les prestations command\u00e9es (prospection, automatisation, etc.)",
                "Am\u00e9liorer notre site web et nos services gr\u00e2ce aux donn\u00e9es d\u2019audience anonymis\u00e9es",
                "Vous envoyer des communications commerciales (uniquement avec votre consentement pr\u00e9alable)",
                "Respecter nos obligations l\u00e9gales et r\u00e9glementaires",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border bg-background px-3 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Nous ne proc\u00e9dons \u00e0 aucun profilage automatis\u00e9
              produisant des effets juridiques ou significatifs sur les
              personnes.
            </p>
          </Section>

          {/* 4. Partage avec des tiers */}
          <Section titre="4. Partage des donn\u00e9es avec des tiers">
            <p>
              Nous ne vendons jamais vos donn\u00e9es personnelles. Nous
              pouvons \u00eatre amen\u00e9s \u00e0 les partager uniquement avec
              les cat\u00e9gories de tiers suivantes, dans le strict cadre des
              finalit\u00e9s d\u00e9crites :
            </p>

            <div className="grid gap-2">
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">H\u00e9bergement</span>{" "}
                \u2014 Vercel Inc. (USA) pour l&apos;h\u00e9bergement du site web.
                Transfert encadr\u00e9 par les clauses contractuelles types (CCT)
                de la Commission europ\u00e9enne.
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">Base de donn\u00e9es</span>{" "}
                \u2014 Neon (PostgreSQL serverless) pour le stockage s\u00e9curis\u00e9
                des comptes utilisateurs et des donn\u00e9es de prospection.
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">Analytics</span>{" "}
                \u2014 Google Analytics (GA4) pour la mesure d&apos;audience
                anonymis\u00e9e, uniquement avec votre consentement cookies.
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">Intelligence artificielle</span>{" "}
                \u2014 Anthropic (API Claude) pour l&apos;enrichissement
                automatis\u00e9 de fiches prospects. Les donn\u00e9es
                trait\u00e9es sont des informations d&apos;entreprise publiques.
              </div>
              <div className="rounded-2xl border bg-background px-3 py-2">
                <span className="font-medium text-foreground">Emailing</span>{" "}
                \u2014 Envoi d&apos;emails transactionnels (confirmations,
                r\u00e9ponses aux demandes) via notre serveur SMTP.
              </div>
            </div>

            <p className="mt-2">
              En dehors de ces sous-traitants, nous ne communiquons vos
              donn\u00e9es \u00e0 aucun tiers, sauf obligation l\u00e9gale
              (r\u00e9quisition judiciaire, autorit\u00e9 de contr\u00f4le).
            </p>
          </Section>

          {/* 5. Transferts hors UE */}
          <Section titre="5. Transferts de donn\u00e9es hors UE">
            <p>
              Certains de nos sous-traitants (Vercel, Google, Anthropic) sont
              bas\u00e9s aux \u00c9tats-Unis. Ces transferts sont encadr\u00e9s
              par :
            </p>
            <ul className="grid gap-2">
              <li className="rounded-2xl border bg-background px-3 py-2">
                Les clauses contractuelles types (CCT) adopt\u00e9es par la
                Commission europ\u00e9enne
              </li>
              <li className="rounded-2xl border bg-background px-3 py-2">
                Le EU-US Data Privacy Framework lorsque applicable
              </li>
            </ul>
          </Section>

          {/* 6. S\u00e9curit\u00e9 */}
          <Section titre="6. S\u00e9curit\u00e9 des donn\u00e9es">
            <p>
              Nous mettons en \u0153uvre des mesures techniques et
              organisationnelles pour prot\u00e9ger vos donn\u00e9es :
            </p>
            <ul className="grid gap-2">
              {[
                "Chiffrement HTTPS (TLS) sur l\u2019ensemble du site",
                "Mots de passe hash\u00e9s avec bcrypt (jamais stock\u00e9s en clair)",
                "Acc\u00e8s aux donn\u00e9es restreint aux personnes autoris\u00e9es",
                "H\u00e9bergement s\u00e9curis\u00e9 avec sauvegardes automatiques",
                "Sessions authentifi\u00e9es par JWT avec expiration",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border bg-background px-3 py-2"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Section>

          {/* 7. Cookies */}
          <Section titre="7. Cookies">
            <p>
              Pour une information d\u00e9taill\u00e9e sur les cookies
              utilis\u00e9s sur ce site, veuillez consulter la section cookies
              de nos{" "}
              <Link
                href="/mentions-legales"
                className="underline underline-offset-2 hover:text-foreground"
              >
                mentions l\u00e9gales
              </Link>
              .
            </p>
            <p>
              Vous pouvez \u00e0 tout moment modifier vos pr\u00e9f\u00e9rences
              de cookies via la banni\u00e8re de consentement ou les
              param\u00e8tres de votre navigateur.
            </p>
          </Section>

          {/* 8. Vos droits */}
          <Section titre="8. Vos droits">
            <p>
              Conform\u00e9ment au RGPD et \u00e0 la loi Informatique et
              Libert\u00e9s, vous disposez des droits suivants sur vos
              donn\u00e9es personnelles :
            </p>
            <div className="grid gap-2">
              <DataRow label="Droit d&apos;acc\u00e8s" value="Obtenir la confirmation que vos donn\u00e9es sont trait\u00e9es et en recevoir une copie" />
              <DataRow label="Droit de rectification" value="Corriger des donn\u00e9es inexactes ou incompl\u00e8tes" />
              <DataRow label="Droit de suppression" value="Demander l&apos;effacement de vos donn\u00e9es personnelles" />
              <DataRow label="Droit \u00e0 la portabilit\u00e9" value="Recevoir vos donn\u00e9es dans un format structur\u00e9 et lisible par machine" />
              <DataRow label="Droit d&apos;opposition" value="Vous opposer au traitement de vos donn\u00e9es pour des motifs l\u00e9gitimes" />
              <DataRow label="Droit \u00e0 la limitation" value="Demander la suspension du traitement dans certains cas" />
              <DataRow label="Retrait du consentement" value="Retirer votre consentement \u00e0 tout moment, sans affecter la lic\u00e9it\u00e9 du traitement ant\u00e9rieur" />
            </div>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              Comment exercer vos droits
            </h3>
            <p>
              Envoyez votre demande par email \u00e0{" "}
              <a
                href="mailto:contact@webcresson.com"
                className="underline underline-offset-2 hover:text-foreground"
              >
                contact@webcresson.com
              </a>{" "}
              en pr\u00e9cisant votre identit\u00e9 et la nature de votre
              demande. Nous r\u00e9pondons sous 30 jours maximum.
            </p>

            <h3 className="mt-4 text-sm font-medium text-foreground">
              R\u00e9clamation aupr\u00e8s de la CNIL
            </h3>
            <p>
              Si vous estimez que le traitement de vos donn\u00e9es ne respecte
              pas la r\u00e9glementation, vous pouvez introduire une
              r\u00e9clamation aupr\u00e8s de la CNIL :{" "}
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

          {/* 9. Mineurs */}
          <Section titre="9. Donn\u00e9es des mineurs">
            <p>
              Nos services s&apos;adressent exclusivement aux professionnels
              (B2B). Nous ne collectons pas sciemment de donn\u00e9es
              personnelles de mineurs de moins de 16 ans. Si vous constatez
              qu&apos;un mineur nous a fourni des donn\u00e9es, contactez-nous
              pour que nous les supprimions.
            </p>
          </Section>

          {/* 10. Modifications */}
          <Section titre="10. Modifications de cette politique">
            <p>
              Nous pouvons mettre \u00e0 jour cette politique de
              confidentialit\u00e9 \u00e0 tout moment. La date de derni\u00e8re
              mise \u00e0 jour est indiqu\u00e9e en bas de page. En cas de
              modification substantielle, nous vous en informerons par email ou
              via une notification sur le site.
            </p>
          </Section>
        </div>

        {/* Liens utiles */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/mentions-legales"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            Mentions l\u00e9gales
          </Link>
          <Link
            href="/conditions-generales-de-vente"
            className="inline-flex items-center justify-center rounded-2xl border px-6 py-3 text-sm font-medium transition hover:bg-muted"
          >
            CGV
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-700"
          >
            Nous contacter
          </Link>
        </div>

        <p className="mt-6 text-xs text-muted-foreground">
          Derni\u00e8re mise \u00e0 jour : mars 2026
        </p>
      </div>
    </main>
  );
}
