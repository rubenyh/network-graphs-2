import type { Metadata } from "next";
import { Itim } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const itim = Itim({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-itim",
})

export const metadata: Metadata = {
  title: "Network-Graphs",
  description: "Visualize and simulate user relationships using interactive network graph visualizations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={itim.variable}>
      <body className={`${itim.className} antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
