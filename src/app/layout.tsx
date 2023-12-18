import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Startpage",
  description: "Simple homepage for your browser",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
          {children}
      </body>
    </html>
  );
}
