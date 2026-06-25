/**
 * Security & Application Logger
 * Provides structured logging for security events, errors, and audits.
 * In production, replace console.* calls with an external service (Sentry, LogRocket, etc.)
 */

type SecurityEventType =
  | "rate_limit"
  | "cors_violation"
  | "invalid_input"
  | "progress_tamper"
  | "decryption_failure"
  | "auth_error";

interface SecurityEvent {
  type: SecurityEventType;
  ip?: string;
  path?: string;
  details?: Record<string, unknown>;
  timestamp?: string;
}

interface AppError {
  message: string;
  stack?: string;
  context?: Record<string, unknown>;
}

const isProd = process.env.NODE_ENV === "production";

/**
 * Log a security-related event.
 * In production this should be sent to an external monitoring service.
 */
export async function logSecurityEvent(event: SecurityEvent): Promise<void> {
  const entry = {
    ...event,
    timestamp: event.timestamp ?? new Date().toISOString(),
    level: "SECURITY",
  };

  if (isProd) {
    // TODO: Replace with external service (e.g. Sentry, LogRocket, Datadog)
    // Example: await fetch('https://logs.example.com/ingest', { method: 'POST', body: JSON.stringify(entry) });
    console.warn("[SECURITY]", JSON.stringify(entry));
  } else {
    console.warn("[SECURITY]", entry);
  }
}

/**
 * Log an application error with context.
 */
export function logError(error: AppError | Error, context?: Record<string, unknown>): void {
  const entry = {
    level: "ERROR",
    timestamp: new Date().toISOString(),
    message: error instanceof Error ? error.message : error.message,
    stack: error instanceof Error ? error.stack : undefined,
    context: context ?? (error instanceof Error ? undefined : (error as AppError).context),
  };

  if (isProd) {
    // TODO: Send to external error tracking (e.g. Sentry)
    // Sentry.captureException(error, { extra: context });
    console.error("[ERROR]", JSON.stringify(entry));
  } else {
    console.error("[ERROR]", entry);
  }
}

/**
 * Log general application info.
 */
export function logInfo(message: string, data?: Record<string, unknown>): void {
  if (!isProd) {
    console.info("[INFO]", message, data ?? "");
  }
}
