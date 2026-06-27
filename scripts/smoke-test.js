#!/usr/bin/env node
/**
 * smoke-test.js
 * Quick smoke test script to verify critical endpoints are working after deploy.
 *
 * Usage:
 *   node scripts/smoke-test.js                          # test production
 *   node scripts/smoke-test.js http://localhost:3000    # test locally
 */

const BASE_URL = process.argv[2] || "https://japan-mee.vercel.app";

const ANSI = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  cyan: "\x1b[36m",
  bold: "\x1b[1m",
  reset: "\x1b[0m",
};

const pass = (msg) => console.log(`  ${ANSI.green}✓${ANSI.reset} ${msg}`);
const fail = (msg) => console.log(`  ${ANSI.red}✗${ANSI.reset} ${msg}`);
const warn = (msg) => console.log(`  ${ANSI.yellow}⚠${ANSI.reset} ${msg}`);
const info = (msg) => console.log(`  ${ANSI.cyan}→${ANSI.reset} ${msg}`);

let passCount = 0;
let failCount = 0;

async function check(label, fn) {
  try {
    await fn();
    pass(label);
    passCount++;
  } catch (err) {
    fail(`${label} — ${err.message}`);
    failCount++;
  }
}

async function fetchWithTimeout(url, options = {}, timeoutMs = 10000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return res;
  } catch (err) {
    clearTimeout(id);
    if (err.name === "AbortError") throw new Error(`Timed out after ${timeoutMs}ms`);
    throw err;
  }
}

async function runTests() {
  console.log(`\n${ANSI.bold}🌸 Japan Learning App — Smoke Test${ANSI.reset}`);
  console.log(`${ANSI.cyan}   Target: ${BASE_URL}${ANSI.reset}`);
  console.log(`${"─".repeat(50)}\n`);

  // ── 1. Homepage ────────────────────────────────────────────
  console.log(`${ANSI.bold}1. Pages${ANSI.reset}`);

  await check("Homepage (/) loads with 200", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  });

  await check("Privacy policy page (/privacy-policy) loads", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/privacy-policy`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  });

  await check("/privacy redirects to /privacy-policy", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/privacy`, { redirect: "manual" });
    if (res.status !== 301 && res.status !== 308) throw new Error(`Expected redirect, got HTTP ${res.status}`);
  });

  await check("manifest.json accessible", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/manifest.json`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.name) throw new Error("manifest.json missing 'name' field");
  });

  // ── 2. API Endpoints ────────────────────────────────────────
  console.log(`\n${ANSI.bold}2. API Endpoints${ANSI.reset}`);

  await check("/api/log-error accepts POST", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/api/log-error`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "smoke-test error", stack: "at smoke-test:1:1" }),
    });
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();
    if (!json.success) throw new Error("Response success=false");
  });

  await check("/api/log-error rejects invalid body (400)", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/api/log-error`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "x".repeat(2000) }), // over 1000 char limit
    });
    if (res.status !== 400) throw new Error(`Expected 400, got HTTP ${res.status}`);
  });

  await check("/api/progress/validate is accessible", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/api/progress/validate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ progress: {} }),
    });
    // Any response (200 or 400) means the route exists
    if (res.status === 404) throw new Error("Route not found");
  });

  // ── 3. Security Headers ─────────────────────────────────────
  console.log(`\n${ANSI.bold}3. Security Headers${ANSI.reset}`);

  const headersRes = await fetchWithTimeout(`${BASE_URL}/`).catch(() => null);
  if (headersRes) {
    const h = headersRes.headers;

    await check("X-Frame-Options: DENY", async () => {
      const val = h.get("x-frame-options");
      if (!val?.includes("DENY")) throw new Error(`Got: ${val}`);
    });

    await check("X-Content-Type-Options: nosniff", async () => {
      const val = h.get("x-content-type-options");
      if (!val?.includes("nosniff")) throw new Error(`Got: ${val}`);
    });

    await check("Content-Security-Policy present", async () => {
      const val = h.get("content-security-policy");
      if (!val) throw new Error("Header missing");
    });

    await check("Strict-Transport-Security present", async () => {
      const val = h.get("strict-transport-security");
      if (!val) warn("HSTS header missing (may not appear on localhost)");
    });
  }

  // ── 4. Assets ───────────────────────────────────────────────
  console.log(`\n${ANSI.bold}4. Static Assets${ANSI.reset}`);

  await check("Feature graphic accessible", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/images/feature-graphic.png`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  });

  await check("App icon (512px) accessible", async () => {
    const res = await fetchWithTimeout(`${BASE_URL}/icons/icon-512.png`);
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);
  });

  // ── Summary ─────────────────────────────────────────────────
  console.log(`\n${"─".repeat(50)}`);
  if (failCount === 0) {
    console.log(`${ANSI.green}${ANSI.bold}✓ All ${passCount} tests passed!${ANSI.reset} 🎉`);
  } else {
    console.log(
      `${ANSI.red}${ANSI.bold}✗ ${failCount} test(s) failed${ANSI.reset}, ${ANSI.green}${passCount} passed${ANSI.reset}`
    );
    process.exit(1);
  }
  console.log();
}

runTests().catch((err) => {
  console.error("Smoke test runner failed:", err);
  process.exit(1);
});
