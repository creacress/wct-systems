import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Merci — Votre demande a été envoyée | WCT Systems",
  description:
    "Votre demande a bien été reçue. Nous revenons vers vous sous 24 à 48h ouvrées avec un plan clair.",
  robots: { index: false, follow: false },
};

const ETAPES = [
  {
    step: "1",
    titre: "Confirmation reçue",
    desc: "Votre message est bien arrivé. Vous recevrez un email de confirmation sous quelques minutes.",
  },
  {
    step: "2",
    titre: "Analyse de votre demande",
    desc: "On étudie votre contexte et on prépare 3 priorités concrètes adaptées à votre situation.",
  },
  {
    step: "3",
    titre: "Retour sous 24–48h",
    desc: "On vous recontacte avec un plan clair : priorités, V1, et KPI à suivre.",
  },
] as const;

export default function MerciPage() {
  return (
    <main id="content" className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-linear-to-b from-violet-50/70 via-background to-background dark:from-violet-950/30" />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        {/* HERO */}
        <section className="mx-auto max-w-2xl space-y-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-violet-200 bg-violet-50 px-4 py-1 text-xs uppercase tracking-wide text-violet-700 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-300">
            Demande envoyée
          </div>

          {/* Icône check animée */}
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-100 dark:bg-violet-950/50">
            <svg
              className="h-10 w-10 text-violet-600 dark:text-violet-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Merci pour votre demande
            <span className="block bg-linear-to-r from-violet-600 to-indigo-500 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-400">
              On s&apos;en occupe.
            </span>
          </h1>

          <p className="text-lg text-muted-foreground">
            Votre message a bien été envoyé. On revient vers vous sous{" "}
            <strong>24 à 48h ouvrées</strong> avec un plan adapté à votre
            situation.
          </p>
        </section>

        {/* Étapes suivantes */}
        <section className="mt-14">
          <h2 className="text-center text-xl font-semibold tracking-tight">
            La suite en 3 étapes
          </h2>

          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {ETAPES.map((e) => (
              <li
                key={e.step}
                className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700 dark:bg-violet-950/50 dark:text-violet-300">
                  {e.step}
                </div>
                <p className="mt-3 font-medium">{e.titre}</p>
                <p className="mt-2 text-sm text-muted-foreground">{e.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Conseils */}
        <section className="mt-14 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border bg-background/60 p-6 shadow-sm backdrop-blur sm:p-8">
            <p className="text-sm font-medium">
              En attendant, vous pouvez…
            </p>
            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
              {[
                "Consulter nos cas clients pour voir des exemples concrets",
                "Explorer nos services pour affiner votre besoin",
                "Préparer les accès à vos outils actuels (CRM, fichiers…)",
                "Lister vos 3 priorités business du moment",
              ].map((x) => (
                <li
                  key={x}
                  className="rounded-2xl border bg-background px-3 py-2"
                >
                  {x}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border bg-linear-to-r from-muted to-muted/60 p-6 shadow-sm sm:p-8">
            <p className="text-sm font-medium">Besoin urgent ?</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Si votre demande est critique, renvoyez un message en précisant
              l&apos;urgence — on priorise les demandes qui l&apos;indiquent
              clairement.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border bg-background px-4 py-3 text-sm font-medium transition hover:bg-muted"
            >
              Renvoyer un message
            </Link>
          </div>
        </section>

        {/* CTA final */}
        <section className="mt-14">
          <div className="rounded-3xl border bg-linear-to-br from-violet-50 to-indigo-50/80 p-10 text-center shadow-sm dark:from-violet-950/40 dark:to-indigo-950/30">
            <h2 className="text-2xl font-semibold tracking-tight">
              En attendant notre retour
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Découvrez comment on aide les PME à générer plus de clients avec
              des systèmes simples.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/cas-clients"
                className="inline-flex items-center justify-center rounded-2xl bg-violet-600 px-8 py-3 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:bg-violet-700"
              >
                Voir les cas clients
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-2xl border px-8 py-3 text-sm font-medium transition hover:bg-muted"
              >
                Explorer les services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
