// Brand logos for the trust strip on the homepage.
// Kept as inline React components to avoid extra network requests and to allow
// currentColor / opacity tuning at render site.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function withTitle(title: string | undefined, props: SVGProps<SVGSVGElement>) {
  return {
    role: title ? "img" : undefined,
    "aria-label": title,
    "aria-hidden": title ? undefined : true,
    ...props,
  };
}

export function StripeLogo({ title = "Stripe", ...props }: IconProps) {
  // Stripe logotype
  return (
    <svg
      viewBox="0 0 60 25"
      fill="currentColor"
      {...withTitle(title, props)}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 0 1-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.25c0-1.85-1.07-2.58-2.08-2.58zM40.95 20.3c-1.44 0-2.32-.6-2.9-1.04l-.02 4.63-4.12.87V5.57h3.63l.22 1.02a4.5 4.5 0 0 1 3.23-1.23c2.9 0 5.63 2.6 5.63 7.4 0 5.24-2.7 7.54-5.67 7.54zM40 9.09c-.95 0-1.54.34-1.97.81l.02 6.12c.4.43.98.78 1.95.78 1.52 0 2.54-1.65 2.54-3.87 0-2.15-1.04-3.84-2.54-3.84zM28.24 5.57h4.13v14.44h-4.13V5.57zm0-4.7L32.37 0v3.36l-4.13.88V.88zM18.34 9.67v6.05c0 2.24.32 3.77 2.2 3.77.8 0 1.48-.27 1.95-.67V4.58l4.12-.88v5.2c0 1.97-.37 3.76-1.8 4.06 1.13.23 1.79.9 1.79 2.23v4.82h-4.11v-.5zm-5.3 10.34V9.2H8.92v10.8h4.12zM8.92 5.23v10.16c0 2.63 1.09 4.8 3.82 4.8 1.54 0 2.65-.29 3.23-.54v-3.35a7 7 0 0 1-2.1.33c-.9 0-1.17-.35-1.17-1.3V8.77h3.26V5.23H12.7V1.07l-3.78.8v3.36zM2.6 6.32v13.69H6.7V6.32l-2.08-.44-2.02.44z"
      />
    </svg>
  );
}

export function SupabaseLogo({ title = "Supabase", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 109 113"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...withTitle(title, props)}
    >
      <path
        d="M63.708 110.284c-2.86 3.6-8.658 1.628-8.727-2.97L53.974 40.063h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#supa-a)"
      />
      <path
        d="M63.708 110.284c-2.86 3.6-8.658 1.628-8.727-2.97L53.974 40.063h45.22c8.19 0 12.758 9.46 7.665 15.874l-43.151 54.347Z"
        fill="url(#supa-b)"
        fillOpacity=".2"
      />
      <path
        d="M45.317 2.071c2.86-3.601 8.658-1.628 8.726 2.97l.442 67.251H9.831c-8.19 0-12.759-9.46-7.665-15.874L45.317 2.07Z"
        fill="#3ECF8E"
      />
      <defs>
        <linearGradient id="supa-a" x1="53.974" y1="54.974" x2="94.164" y2="71.83" gradientUnits="userSpaceOnUse">
          <stop stopColor="#249361" />
          <stop offset="1" stopColor="#3ECF8E" />
        </linearGradient>
        <linearGradient id="supa-b" x1="36.156" y1="30.578" x2="54.484" y2="65.081" gradientUnits="userSpaceOnUse">
          <stop />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function NeonLogo({ title = "Neon", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
      {...withTitle(title, props)}
    >
      <defs>
        <linearGradient id="neon-a" x1="100%" x2="12.069%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#62F755" />
          <stop offset="100%" stopColor="#8FF986" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="neon-b" x1="100%" x2="40.603%" y1="100%" y2="76.897%">
          <stop offset="0%" stopOpacity=".9" />
          <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill="#00E0D9"
        d="M0 44.139C0 19.762 19.762 0 44.139 0h167.722C236.238 0 256 19.762 256 44.139v142.649c0 25.216-31.915 36.16-47.388 16.256l-48.392-62.251v75.484c0 21.939-17.784 39.723-39.722 39.723h-76.36C19.763 256 0 236.238 0 211.861V44.14Zm44.139-8.825c-4.879 0-8.825 3.946-8.825 8.818v167.73c0 4.878 3.946 8.831 8.818 8.831h77.688c2.44 0 3.087-1.977 3.087-4.416v-101.22c0-25.222 31.914-36.166 47.395-16.255l48.391 62.243V44.14c0-4.879.455-8.825-4.416-8.825H44.14Z"
      />
      <path
        fill="url(#neon-a)"
        d="M0 44.139C0 19.762 19.762 0 44.139 0h167.722C236.238 0 256 19.762 256 44.139v142.649c0 25.216-31.915 36.16-47.388 16.256l-48.392-62.251v75.484c0 21.939-17.784 39.723-39.722 39.723h-76.36C19.763 256 0 236.238 0 211.861V44.14Zm44.139-8.825c-4.879 0-8.825 3.946-8.825 8.818v167.73c0 4.878 3.946 8.831 8.818 8.831h77.688c2.44 0 3.087-1.977 3.087-4.416v-101.22c0-25.222 31.914-36.166 47.395-16.255l48.391 62.243V44.14c0-4.879.455-8.825-4.416-8.825H44.14Z"
      />
      <path
        fill="url(#neon-b)"
        fillOpacity=".4"
        d="M0 44.139C0 19.762 19.762 0 44.139 0h167.722C236.238 0 256 19.762 256 44.139v142.649c0 25.216-31.915 36.16-47.388 16.256l-48.392-62.251v75.484c0 21.939-17.784 39.723-39.722 39.723h-76.36C19.763 256 0 236.238 0 211.861V44.14Zm44.139-8.825c-4.879 0-8.825 3.946-8.825 8.818v167.73c0 4.878 3.946 8.831 8.818 8.831h77.688c2.44 0 3.087-1.977 3.087-4.416v-101.22c0-25.222 31.914-36.166 47.395-16.255l48.391 62.243V44.14c0-4.879.455-8.825-4.416-8.825H44.14Z"
      />
      <path
        fill="#63F655"
        d="M211.861 0C236.238 0 256 19.762 256 44.139v142.649c0 25.216-31.915 36.16-47.388 16.256l-48.392-62.251v75.484c0 21.939-17.784 39.723-39.722 39.723a4.409 4.409 0 0 0 4.409-4.409V115.058c0-25.223 31.914-36.167 47.395-16.256l48.391 62.243V8.825c0-4.871-3.953-8.825-8.832-8.825Z"
      />
    </svg>
  );
}

export function VercelLogo({ title = "Vercel", ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 256 222"
      xmlns="http://www.w3.org/2000/svg"
      {...withTitle(title, props)}
    >
      <path fill="currentColor" d="m128 0 128 221.705H0z" />
    </svg>
  );
}

export function NextjsLogo({ title = "Next.js", ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      {...withTitle(title, props)}
    >
      <mask id="nextjs-mask" maskUnits="userSpaceOnUse" width="180" height="180" x="0" y="0" style={{ maskType: "alpha" }}>
        <circle cx="90" cy="90" fill="black" r="90" />
      </mask>
      <g mask="url(#nextjs-mask)">
        <circle cx="90" cy="90" fill="currentColor" r="90" />
        <path d="M149.508 157.52 69.142 54H54v71.97h12.114V69.384l73.885 95.46c3.334-2.23 6.51-4.68 9.509-7.323Z" fill="url(#nextjs-lg-1)" />
        <rect fill="url(#nextjs-lg-2)" height="72" width="12" x="115" y="54" />
      </g>
      <defs>
        <linearGradient id="nextjs-lg-1" gradientUnits="userSpaceOnUse" x1="109" x2="144.5" y1="116.5" y2="160.5">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="nextjs-lg-2" gradientUnits="userSpaceOnUse" x1="121" x2="120.799" y1="54" y2="106.875">
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
