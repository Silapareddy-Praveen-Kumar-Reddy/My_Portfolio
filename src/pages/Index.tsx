import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { Hero, Projects, Education, Skills, Certificates, Contact } from "@/sections";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <Hero />
        <Projects />
        <Education />
        <Skills />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
