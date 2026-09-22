import Link from "next/link";

export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#ffffff",
          color: "#141414",
          fontFamily: "Segoe UI, sans-serif",
        }}
      >
        <main style={{ maxWidth: 480, margin: "12vh auto", padding: 24 }}>
          <h1 style={{ fontSize: 32, marginBottom: 8 }}>Page not found</h1>
          <p style={{ marginTop: 0 }}>העמוד לא נמצא</p>
          <p>
            <Link href="/he" style={{ color: "#085e80", fontWeight: 700 }}>
              Get Specialist
            </Link>
          </p>
        </main>
      </body>
    </html>
  );
}
