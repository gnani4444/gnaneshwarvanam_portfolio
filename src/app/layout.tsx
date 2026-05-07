import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gnaneshwar Vanam — Senior Data Scientist",
  description:
    "Portfolio of Gnaneshwar Vanam — Senior Data Scientist with 6.5+ years building AI/ML solutions, GenAI agents, and data products at scale.",
  keywords: [
    "Data Scientist",
    "Machine Learning",
    "AI",
    "GenAI",
    "LLM",
    "MLOps",
    "Python",
    "London",
  ],
  authors: [{ name: "Gnaneshwar Vanam" }],
  openGraph: {
    title: "Gnaneshwar Vanam — Senior Data Scientist",
    description:
      "6.5+ years of hands-on AI/ML experience. Building GenAI agents, LLM systems, and production ML pipelines.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark text-slate-200 antialiased">{children}</body>
    </html>
  );
}
