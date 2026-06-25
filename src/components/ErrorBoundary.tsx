"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary — catches runtime errors in the React tree and shows a
 * user-friendly recovery screen instead of a blank/crashed page.
 *
 * Usage:
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 *
 * Optionally pass a custom `fallback` prop for a branded error UI.
 */
export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to console in dev; in production wire this to Sentry or similar
    if (process.env.NODE_ENV !== "production") {
      console.error("[ErrorBoundary] Caught an error:", error, errorInfo);
    } else {
      // Production: fire-and-forget to logging endpoint
      fetch("/api/log-error", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
        }),
      }).catch(() => {
        /* intentionally silent */
      });
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
            background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
            color: "#fff",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌸</div>
          <h1
            style={{
              fontSize: "1.75rem",
              fontWeight: 700,
              marginBottom: "0.75rem",
              color: "#f472b6",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              maxWidth: "480px",
              color: "#94a3b8",
              marginBottom: "0.5rem",
              lineHeight: "1.6",
            }}
          >
            An unexpected error occurred. Your learning progress is safe — it is
            stored locally on your device.
          </p>
          {process.env.NODE_ENV !== "production" && this.state.error && (
            <pre
              style={{
                background: "rgba(255,255,255,0.07)",
                borderRadius: "8px",
                padding: "1rem",
                maxWidth: "560px",
                overflow: "auto",
                fontSize: "0.75rem",
                color: "#f87171",
                marginBottom: "1.5rem",
                textAlign: "left",
                whiteSpace: "pre-wrap",
                wordBreak: "break-all",
              }}
            >
              {this.state.error.message}
            </pre>
          )}
          <button
            onClick={this.handleReload}
            style={{
              marginTop: "1.5rem",
              padding: "0.75rem 2rem",
              background: "linear-gradient(135deg, #ec4899, #8b5cf6)",
              color: "#fff",
              border: "none",
              borderRadius: "12px",
              fontSize: "1rem",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 4px 20px rgba(236,72,153,0.35)",
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
