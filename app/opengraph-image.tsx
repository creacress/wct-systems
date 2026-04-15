import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0B0B0F 0%, #111827 50%, #1A1A2E 100%)",
          color: "white",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {/* Top Brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <div
            style={{
              width: 90,
              height: 90,
              borderRadius: 999,
              border: "2px solid rgba(255,255,255,0.15)",
              background: "rgba(124,58,237,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              fontWeight: 700,
              color: "white",
            }}
          >
            W
          </div>

          <div style={{ fontSize: 32, opacity: 0.9 }}>
            WCT Systems
          </div>
        </div>

        {/* Main message */}
        <div style={{ display: "flex", flexDirection: "column", fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>
          <div>Le Digital Workplace français</div>
          <div style={{ opacity: 0.75 }}>
            qui remplace vos 12 outils.
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            fontSize: 26,
            opacity: 0.7,
            letterSpacing: 1,
          }}
        >
          Alternative à Microsoft 365 & Slack • Hébergé en France • 199 €/mois
        </div>
      </div>
    ),
    size
  );
}