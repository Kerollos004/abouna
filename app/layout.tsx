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



export const metadata = {
  title: 'منصة ⲟⲩⲏⲃ',
  description: 'إدارة وعرض مواعيد الآباء الكهنة',
  manifest: '/manifest.json',
  icons: {
    icon: '/images/kahen-logo-removebg-preview.png',
    apple: '/images/kahen-logo-removebg-preview.png',
  },
};

export const viewport = {
  themeColor: '#F6EFE0', // أو #F6EFE0 حسب الثيم الأساسي اللي تحبه لشريط المتصفح
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      dir="rtl"
      lang="ar"
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
