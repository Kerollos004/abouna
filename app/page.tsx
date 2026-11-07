import Hero from "./components/homecomponents/Hero";
import About from "./components/homecomponents/About";
import Services from "./components/homecomponents/Services";
import Header from "./components/basiccomponents/Header";
import Footer from "./components/basiccomponents/Footer";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "الصفحه الرئيسيه",
  description: "منصه ⲟⲩⲏⲃ للاباء الكهنه",
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
