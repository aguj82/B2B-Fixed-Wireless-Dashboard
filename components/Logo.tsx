import Image from "next/image";
import Link from "next/link";
import React from "react";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  className?: string;
  size?: LogoSize;
  withChip?: boolean;
};

const sizeMap: Record<LogoSize, number> = {
  sm: 24,
  md: 28,
  lg: 32,
};

const baseSizes = "(max-width: 640px) 120px, (max-width: 1024px) 150px, 166px";

export default function Logo({ className = "", size = "md", withChip = true }: LogoProps) {
  const height = sizeMap[size];
  const wrapperClass = ["logo-chip", withChip ? "logo-chip--enabled" : "logo-chip--plain", className]
    .filter(Boolean)
    .join(" ");

  return (
    <Link
      href="https://www.reailize.com"
      className={wrapperClass}
      target="_blank"
      rel="noreferrer"
      aria-label="Realize homepage"
    >
      <Image
        src="/assets/realize-logo.svg"
        alt="Realize"
        width={166}
        height={46}
        priority
        sizes={baseSizes}
        style={{ height, width: "auto" }}
      />
      <style jsx>{`
        .logo-chip {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          gap: 0.4rem;
          padding: 0.25rem 0.5rem;
          line-height: 0;
          text-decoration: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .logo-chip--enabled {
          background: rgba(255, 255, 255, 0.9);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
        }

        .logo-chip--plain {
          background: transparent;
        }

        .logo-chip:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.22);
        }
      `}</style>
    </Link>
  );
}
