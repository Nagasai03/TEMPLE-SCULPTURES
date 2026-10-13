import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Methodology from "@/components/Methodology";
import Demo from "@/components/Demo";
import Results from "@/components/Results";
import Team from "@/components/Team";
import Contact from "@/components/Contact";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Methodology />
      <Demo />
      <Results />
      <Team />
      <Contact />
      
      {/* Footer */}
      <footer className="glass border-t border-white/10 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-muted-foreground">
            © 2024 Temple AI Classification Research. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            VIT Chennai | Department of Computer Science & Engineering
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
