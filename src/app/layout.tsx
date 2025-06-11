import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";


export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#fcb716",
}

export const metadata: Metadata = {
  title: "General Physician - Book Appointment Online with General Physician & Internal Medicine Doctors near you | Apollo Clone",
  description:
    "General Physician & Internal Medicine - Consult experienced general physicians and internal medicine doctors online at our Apollo clone for diagnosis and treatment of common illnesses, chronic conditions, and preventive care. Book an appointment today.",
  robots: "index,follow",
  alternates: {
    canonical: "http://localhost:3000/",
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
