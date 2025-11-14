import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header";
import { Tektur } from "next/font/google";
import ReactQueryProvider from "./(provider)/ReactQueryProvider";
import { Footer } from "./components/Footer";
import { CartModalProvider } from "./context/CartModalcontext";
import SplashScreen from "./SplashScreen";
import { Toaster } from "sonner";
import SmoothScrollWrapper from "./SmoothScrollWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "URBFIT",
  description: "Your modern fashion store",
};

const tek = Tektur({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 👇 Splash screen overlay */}
        <SplashScreen />

        <ReactQueryProvider>
          <CartModalProvider>
            {/* ⭐ WRAP YOUR ENTIRE SITE IN SMOOTH SCROLL */}
            <SmoothScrollWrapper>
              <div className={`${tek.className}`}>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
            </SmoothScrollWrapper>
          </CartModalProvider>
        </ReactQueryProvider>

        <Toaster
          richColors
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: "inherit",
              borderRadius: "10px",
            },
          }}
        />
      </body>
    </html>
  );
}
