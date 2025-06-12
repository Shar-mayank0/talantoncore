import type { Metadata } from "next";
import type { Viewport } from "next";
import "./globals.css";


export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    themeColor: "#fcb716",
}

// export const metadata: Metadata = {
//   title: "Internship Assignment",
//   description: "assignment for TalantonCore  |  Software Development internship",
//   keywords: ["internship", "assignment", "software development", "TalantonCore"],
//   authors: [{ name: "Your Name" }],
//   creator: "Your Name",
//   publisher: "TalantonCore",
//   robots: {
//     index: true,
//     follow: true,
//     googleBot: {
//       index: true,
//       follow: true,
//       'max-video-preview': -1,
//       'max-image-preview': 'large',
//       'max-snippet': -1,
//     },
//   },

// };


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
