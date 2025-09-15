import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import ReduxProvider from "@/globalContext/store";
import { ThemeProvider } from "@/components/index";
import I18nProvider from "@/components/i18n/I18nProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login - JeevanSetu",
  description: "Login to access your healthcare dashboard.",
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <ReduxProvider>
          <I18nProvider>
            <ThemeProvider>
              <main className="dark:bg-gray-900">{children}</main>
            </ThemeProvider>
          </I18nProvider>
        </ReduxProvider>
  );
}
