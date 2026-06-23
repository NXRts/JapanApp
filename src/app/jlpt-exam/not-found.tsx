import Link from "next/link";

export default function NotFound() {
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
        background: "var(--surface)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: 900,
          color: "var(--foreground)",
          marginBottom: "1rem",
        }}
      >
        JLPT Exam Not Found
      </h1>
      <p
        style={{
          fontSize: "1.1rem",
          color: "var(--text-secondary)",
          maxWidth: "500px",
          marginBottom: "2rem",
          lineHeight: "1.6",
        }}
      >
        The JLPT exam page you're looking for doesn't exist. Please check the
        URL or return to the main page.
      </p>
      <Link
        href="/"
        style={{
          padding: "0.75rem 2rem",
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
          color: "white",
          borderRadius: "12px",
          fontWeight: 700,
          textDecoration: "none",
        }}
      >
        Go Home
      </Link>
    </div>
  );
}
