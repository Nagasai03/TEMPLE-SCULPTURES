import { Database, ImageIcon, Cpu, GitBranch, BarChart3 } from "lucide-react";

const Methodology = () => {
  const steps = [
    {
      icon: Database,
      title: "Dataset Collection",
      description:
        "Gathered comprehensive dataset of 2,500 temple sculpture images across 5 categories (500 images per class): Deity, Human, Tower, Birds, and Animals.",
    },
    {
      icon: ImageIcon,
      title: "Preprocessing",
      description:
        "Applied image normalization, resizing, data augmentation (rotation, flipping, brightness adjustment), and feature extraction techniques including HOG (Histogram of Oriented Gradients).",
    },
    {
      icon: Cpu,
      title: "CNN Model Architecture",
      description:
        "Designed custom Convolutional Neural Network with multiple convolutional layers, pooling layers, dropout for regularization, and fully connected layers for classification.",
    },
    {
      icon: GitBranch,
      title: "Transfer Learning & SVM",
      description:
        "Implemented transfer learning using pre-trained models (VGG16, ResNet) and HOG+SVM for feature-based classification, combining deep learning with traditional ML approaches.",
    },
    {
      icon: BarChart3,
      title: "Model Evaluation",
      description:
        "Evaluated models using accuracy metrics, confusion matrix analysis, precision-recall curves, and cross-validation. Achieved 95% accuracy with CNN, 92% with Transfer Learning, and 88% with HOG+SVM.",
    },
  ];

  return (
    <section id="methodology" className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Research Methodology
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A systematic approach to sculpture classification
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-start gap-8 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } animate-fade-in-up`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-4 glow z-10">
                  <step.icon className="w-full h-full text-primary-foreground" />
                </div>

                {/* Content Card */}
                <div className={`glass p-6 rounded-lg flex-1 ml-24 md:ml-0 ${
                  index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"
                } md:w-[calc(50%-3rem)] glow-hover hover:scale-105 transition-all duration-300`}>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold gradient-text">
                      {(index + 1).toString().padStart(2, "0")}
                    </span>
                    <h3 className="text-xl font-bold text-foreground">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Methodology;
