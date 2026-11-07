import Hero from "./components/homecomponents/Hero";
import About from "./components/homecomponents/About";
import Services from "./components/homecomponents/Services";
import Header from "./components/basiccomponents/Header";
import Footer from "./components/basiccomponents/Footer";
import { Metadata } from "next";
export const metadata:Metadata = {
  title: 'منصة ⲟⲩⲏⲃ',
  description: 'إدارة وعرض مواعيد الآباء الكهنة',
  manifest: '/manifest.json',
  icons: {
    icon: '/images/kahen-logo-removebg-preview.png',
    apple: '/images/kahen-logo-removebg-preview.png', 
  },
};
export default function Home() {
  return (
    <>
      <Header />
      <main className="w-full min-h-screen relative">
        <Hero />
        <About />
        <Services/>
      </main>
      <Footer/>
    </>
  );
}
