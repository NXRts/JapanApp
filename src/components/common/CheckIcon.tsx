import React from "react";

interface CheckIconProps {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function CheckIcon({
  size = 16,
  color = "currentColor",
  strokeWidth = 3,
  className,
  style,
}: CheckIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function CheckCircleIcon({
  size = 20,
  fillColor = "var(--primary)",
  checkColor = "#ffffff",
  className,
  style,
}: {
  size?: number | string;
  fillColor?: string;
  checkColor?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ display: "inline-block", verticalAlign: "middle", ...style }}
    >
      <circle cx="12" cy="12" r="10" fill={fillColor} />
      <path
        d="M8 12.5L10.5 15L16 9.5"
        stroke={checkColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
