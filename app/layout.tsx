import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider, MenuProvider , MenuValueProvider } from "./assets/contexts";
import MobMenu from "./components/basiccomponents/MobMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      dir="rtl"
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <MenuProvider>
            <MenuValueProvider>
                {children}
                <MobMenu/>
            </MenuValueProvider>
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
