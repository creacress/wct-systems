"use client";

import { useTranslations } from "next-intl";

export function ResetCookiesButton() {
  const t = useTranslations("legal");

  const handleReset = () => {
    localStorage.removeItem("cookie-consent");
    localStorage.removeItem("cookie-consent-ts");
    window.location.reload();
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      className="mt-2 inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition hover:bg-muted"
    >
      {t("mentionsLegales.resetCookies")}
    </button>
  );
}
