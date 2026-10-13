import { Linkedin, Github, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Team = () => {
  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Principal Investigator",
      avatar: "SJ",
      links: {
        linkedin: "#",
        github: "#",
        email: "sarah.j@example.com",
      },
    },
    {
      name: "Rajesh Kumar",
      role: "ML Engineer",
      avatar: "RK",
      links: {
        linkedin: "#",
        github: "#",
        email: "rajesh.k@example.com",
      },
    },
    {
      name: "Priya Patel",
      role: "Data Scientist",
      avatar: "PP",
      links: {
        linkedin: "#",
        github: "#",
        email: "priya.p@example.com",
      },
    },
    {
      name: "Michael Chen",
      role: "Research Assistant",
      avatar: "MC",
      links: {
        linkedin: "#",
        github: "#",
        email: "michael.c@example.com",
      },
    },
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Our Research Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experts in AI, machine learning, and cultural heritage
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {team.map((member, index) => (
            <div
              key={index}
              className="glass glow-hover p-6 rounded-lg text-center group hover:scale-105 transition-all duration-300 animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Avatar */}
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center text-3xl font-bold text-primary-foreground group-hover:scale-110 transition-transform">
                {member.avatar}
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-foreground mb-1">
                {member.name}
              </h3>
              <p className="text-muted-foreground mb-4">{member.role}</p>

              {/* Social Links */}
              <div className="flex justify-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                  asChild
                >
                  <a href={member.links.linkedin} target="_blank" rel="noopener noreferrer">
                    <Linkedin size={18} />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                  asChild
                >
                  <a href={member.links.github} target="_blank" rel="noopener noreferrer">
                    <Github size={18} />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:text-primary"
                  asChild
                >
                  <a href={`mailto:${member.links.email}`}>
                    <Mail size={18} />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Acknowledgements */}
        <div className="glass p-8 rounded-lg max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4 gradient-text">
            Acknowledgements
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We express our gratitude to <strong>VIT Chennai</strong> for
            providing the infrastructure and support for this research. Special
            thanks to our advisors <strong>Dr. Anita Sharma</strong> and{" "}
            <strong>Prof. Vikram Singh</strong> for their invaluable guidance.
          </p>
          <p className="text-sm text-muted-foreground">
            This research was conducted at the Department of Computer Science &
            Engineering, VIT Chennai, 2024.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Team;
