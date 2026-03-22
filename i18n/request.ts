import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "fr" | "pt")) {
    locale = routing.defaultLocale;
  }

  // Load all namespace files for the locale
  const [common, home, services, tarifs, contact, about, casClients, blog, solutions, comparatifs, legal, metadata] =
    await Promise.all([
      import(`../messages/${locale}/common.json`),
      import(`../messages/${locale}/home.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/services.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/tarifs.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/contact.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/about.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/cas-clients.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/blog.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/solutions.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/comparatifs.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/legal.json`).catch(() => ({ default: {} })),
      import(`../messages/${locale}/metadata.json`).catch(() => ({ default: {} })),
    ]);

  return {
    locale,
    messages: {
      common: common.default,
      home: home.default,
      services: services.default,
      tarifs: tarifs.default,
      contact: contact.default,
      about: about.default,
      casClients: casClients.default,
      blog: blog.default,
      solutions: solutions.default,
      comparatifs: comparatifs.default,
      legal: legal.default,
      metadata: metadata.default,
    },
  };
});
