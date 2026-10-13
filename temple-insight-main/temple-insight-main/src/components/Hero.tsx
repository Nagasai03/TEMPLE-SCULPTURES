import { ArrowDown, Brain, Layers, Target } from "lucide-react";
import { Button } from "./ui/button";
import heroImage from "@/assets/hero-temple.jpg";

const Hero = () => {
  const stats = [
    { icon: Brain, label: "CNN Deep Learning", value: "Advanced" },
    { icon: Layers, label: "Categories", value: "5" },
    { icon: Target, label: "Accuracy", value: "95%" },
  ];

  const scrollToDemo = () => {
    document.querySelector("#demo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 gradient-overlay" />

      {/* Floating Particles */}
      <div className="absolute inset-0 z-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text">
            AI Classification of Temple Sculptures
          </h1>
          <p className="text-xl md:text-2xl text-foreground/90 mb-12 font-light">
            Preserving Heritage with Artificial Intelligence
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass glow-hover p-6 rounded-lg animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-primary" />
                <div className="text-3xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button variant="gradient" size="xl" onClick={scrollToDemo}>
              Try Demo
            </Button>
            <Button variant="hero" size="xl" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>
              Learn More
            </Button>
          </div>

          {/* Scroll Indicator */}
          <button
            onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
            className="animate-bounce inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
          >
            <span>Scroll to explore</span>
            <ArrowDown size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
