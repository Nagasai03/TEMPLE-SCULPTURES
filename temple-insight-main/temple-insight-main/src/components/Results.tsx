import { TrendingUp, Target, Zap, Award } from "lucide-react";
import { useEffect, useState } from "react";

const Results = () => {
  const [animatedValues, setAnimatedValues] = useState({
    accuracy: 0,
    precision: 0,
    recall: 0,
    avgTime: 0,
  });

  const metrics = [
    { icon: Award, label: "CNN Accuracy", value: 95, unit: "%" },
    { icon: TrendingUp, label: "CNN Precision", value: 94, unit: "%" },
    { icon: Target, label: "CNN Recall", value: 93, unit: "%" },
    { icon: Zap, label: "Avg. Processing Time", value: 0.3, unit: "s" },
  ];

  const categories = ["Deity", "Human", "Tower", "Birds", "Animals"];

  const confusionMatrix = [
    [475, 10, 5, 5, 5],
    [8, 480, 4, 4, 4],
    [6, 6, 482, 3, 3],
    [5, 5, 4, 478, 8],
    [6, 4, 5, 10, 475],
  ];

  const trainingData = [
    { epoch: 1, accuracy: 65 },
    { epoch: 5, accuracy: 78 },
    { epoch: 10, accuracy: 85 },
    { epoch: 15, accuracy: 90 },
    { epoch: 20, accuracy: 93 },
    { epoch: 25, accuracy: 95 },
  ];

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues({
        accuracy: Math.floor(95 * progress),
        precision: Math.floor(94 * progress),
        recall: Math.floor(93 * progress),
        avgTime: Number((0.3 * progress).toFixed(1)),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <section id="results" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Research Results
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            CNN Deep Learning performance analysis
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="glass glow-hover p-8 rounded-lg text-center group hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary via-secondary to-accent p-4 group-hover:scale-110 transition-transform">
                <metric.icon className="w-full h-full text-primary-foreground" />
              </div>
              <div className="text-4xl font-bold gradient-text mb-2">
                {index === 0 && animatedValues.accuracy}
                {index === 1 && animatedValues.precision}
                {index === 2 && animatedValues.recall}
                {index === 3 && animatedValues.avgTime}
                {metric.unit}
              </div>
              <div className="text-muted-foreground">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Training Progress Chart */}
        <div className="space-y-8 mb-16">
          <h3 className="text-3xl font-bold text-center gradient-text">
            CNN Training Progress
          </h3>
          
          <div className="glass p-8 rounded-lg">
            <div className="h-64">
              <svg viewBox="0 0 600 200" className="w-full h-full">
                <defs>
                  <linearGradient id="cnnGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(270, 75%, 60%)" />
                    <stop offset="100%" stopColor="hsl(320, 75%, 60%)" />
                  </linearGradient>
                </defs>
                {[0, 25, 50, 75, 100].map((y) => (
                  <line
                    key={y}
                    x1="50"
                    y1={180 - y * 1.6}
                    x2="570"
                    y2={180 - y * 1.6}
                    stroke="hsl(var(--muted-foreground))"
                    strokeOpacity="0.2"
                  />
                ))}
                {[0, 25, 50, 75, 100].map((y) => (
                  <text
                    key={y}
                    x="35"
                    y={185 - y * 1.6}
                    fill="hsl(var(--muted-foreground))"
                    fontSize="12"
                    textAnchor="end"
                  >
                    {y}%
                  </text>
                ))}
                {trainingData.map((point, i) => (
                  <text
                    key={i}
                    x={50 + (i * 520) / (trainingData.length - 1)}
                    y="195"
                    fill="hsl(var(--muted-foreground))"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    E{point.epoch}
                  </text>
                ))}
                <polyline
                  points={trainingData
                    .map((point, i) => {
                      const x = 50 + (i * 520) / (trainingData.length - 1);
                      const y = 180 - point.accuracy * 1.6;
                      return `${x},${y}`;
                    })
                    .join(" ")}
                  fill="none"
                  stroke="url(#cnnGradient)"
                  strokeWidth="3"
                />
                {trainingData.map((point, i) => (
                  <circle
                    key={i}
                    cx={50 + (i * 520) / (trainingData.length - 1)}
                    cy={180 - point.accuracy * 1.6}
                    r="5"
                    fill="url(#cnnGradient)"
                  />
                ))}
              </svg>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-4">
              Epochs
            </p>
          </div>
        </div>

        {/* Confusion Matrix */}
        <div className="space-y-8 mb-16">
          <h3 className="text-3xl font-bold text-center gradient-text">
            CNN Confusion Matrix
          </h3>

          <div className="glass p-8 rounded-lg">
            <p className="text-sm text-muted-foreground mb-4">
              500 images per class | Values show predicted counts
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr>
                    <th className="p-2 text-left text-muted-foreground">Actual \ Pred</th>
                    {categories.map((cat) => (
                      <th key={cat} className="p-2 text-center text-xs text-muted-foreground">
                        {cat}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((rowCat, i) => (
                    <tr key={rowCat}>
                      <td className="p-2 text-left font-medium text-xs text-muted-foreground">
                        {rowCat}
                      </td>
                      {confusionMatrix[i].map((value, j) => (
                        <td
                          key={j}
                          className={`p-2 text-center font-semibold ${
                            i === j
                              ? "bg-primary/20 text-primary"
                              : "bg-muted/20 text-muted-foreground"
                          } rounded`}
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className="glass p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-6 gradient-text">
            Per-Category Performance (CNN Precision)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {categories.map((category, idx) => {
              const precision = (confusionMatrix[idx][idx] / 500) * 100;
              return (
                <div key={category} className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {precision.toFixed(1)}%
                  </div>
                  <div className="text-muted-foreground">{category}</div>
                  <div className="mt-2 h-2 bg-muted/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary via-secondary to-accent animate-fade-in-up"
                      style={{ width: `${precision}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
