import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const vitalsConfig = Array.isArray(nextVitals)
  ? nextVitals
  : (nextVitals && nextVitals.default) || [];

const tsConfig = Array.isArray(nextTs)
  ? nextTs
  : (nextTs && nextTs.default) || [];

const eslintConfig = [
  ...vitalsConfig,
  ...tsConfig,
  {
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "scripts/**",
      "public/**",
    ],
  },
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react-hooks/purity": "off",
      "react-hooks/immutability": "off",
      "react/jsx-no-comment-textnodes": "off",
      "prefer-const": "off",
      "@typescript-eslint/no-require-imports": "off",
    },
  },
];

export default eslintConfig;
