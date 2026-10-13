import { Target, Lightbulb, Star, Database, Cpu, TrendingUp, CheckCircle2 } from "lucide-react";

const About = () => {
  const cards = [
    {
      icon: Target,
      title: "Problem Statement",
      description:
        "Manual classification of temple sculptures is time-consuming and requires expert knowledge. Our AI solution automates this process while preserving accuracy.",
    },
    {
      icon: Lightbulb,
      title: "Objectives",
      description:
        "Develop a deep learning model to classify temple sculptures into distinct categories with high accuracy, making heritage preservation more efficient and accessible.",
    },
    {
      icon: Star,
      title: "Significance",
      description:
        "This research bridges technology and heritage, providing tools for archaeologists, historians, and museums to catalog and preserve cultural artifacts.",
    },
  ];

  const features = [
    { icon: Cpu, label: "CNN Architecture", description: "Deep neural networks" },
    { icon: TrendingUp, label: "Transfer Learning", description: "Pre-trained models" },
    { icon: Database, label: "Data Augmentation", description: "Enhanced training" },
    { icon: CheckCircle2, label: "95% Accuracy", description: "Proven results" },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            About Our Research
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Combining deep learning with cultural heritage preservation
          </p>
        </div>

        {/* Main Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cards.map((card, index) => (
            <div
              key={index}
              className="glass glow-hover p-8 rounded-lg group hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-4 group-hover:scale-110 transition-transform">
                <card.icon className="w-full h-full text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

        {/* Features Panel */}
        <div className="glass p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">
            Key Research Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <div className="font-semibold text-foreground mb-1">
                  {feature.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {feature.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
