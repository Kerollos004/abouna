import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; // تأكد إن السطر ده موجود عشان Tailwind يشتغل!
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

export const metadata: Metadata = {
  title: 'منصة ⲟⲩⲏⲃ',
  description: 'إدارة وعرض مواعيد الآباء الكهنة',
  manifest: '/manifest.json',
};

// فصل لون شريط المتصفح بالطريقة الحديثة لـ Next.js
export const viewport = {
  themeColor: '#F6EFE0',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      dir="rtl"
      lang="ar" // يفضل تكون "ar" عشان اللغة العربية والـ RTL
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