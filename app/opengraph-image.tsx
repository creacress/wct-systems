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
              overflow: "hidden",
              border: "2px solid rgba(255,255,255,0.08)",
              background: "#0B0B0F",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="/images/logo-wct-systems.png"
              width="90"
              height="90"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div style={{ fontSize: 32, opacity: 0.9 }}>
            WCT Systems
          </div>
        </div>

        {/* Main message */}
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>
          <div>Plus de clients.</div>
          <div style={{ opacity: 0.75 }}>
            Moins de tâches répétitives.
          </div>
        </div>

        {/* Bottom strip */}
        <div
          style={{
            fontSize: 30,
            opacity: 0.7,
            letterSpacing: 1,
          }}
        >
          IA • Automatisation • Acquisition • Conversion
        </div>
      </div>
    ),
    size
  );
}