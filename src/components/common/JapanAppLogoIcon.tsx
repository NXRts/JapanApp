"use client";

import React from "react";

interface JapanAppLogoIconProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function JapanAppLogoIcon({
  size = 28,
  className,
  style,
}: JapanAppLogoIconProps) {
  const borderRadius = Math.max(6, Math.round(size * 0.24));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        borderRadius: `${borderRadius}px`,
        flexShrink: 0,
        boxShadow: "0 2px 8px rgba(79, 70, 229, 0.3)",
        ...style,
      }}
    >
      <rect width="48" height="48" rx="12" fill="url(#japanapp-brand-gradient)" />
      <defs>
        <linearGradient
          id="japanapp-brand-gradient"
          x1="0"
          y1="0"
          x2="48"
          y2="48"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#4338ca" />
        </linearGradient>
      </defs>
      <text
        x="24"
        y="34"
        fill="#ffffff"
        fontSize="29"
        fontWeight="900"
        fontFamily="'Noto Sans JP', 'Hiragino Sans', 'Yu Gothic', 'SF Pro JP', system-ui, sans-serif"
        textAnchor="middle"
      >
        学
      </text>
    </svg>
  );
}

export default JapanAppLogoIcon;
