import { ABfyProvider } from "@repo/abfy";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <ABfyProvider backendUrl={process.env.NEXT_PUBLIC_BACKEND_URL || ""}>
        <body className={inter.className}>{children}</body>
      </ABfyProvider>
    </html>
  );
}
