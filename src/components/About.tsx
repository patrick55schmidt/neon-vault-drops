import { Card, CardContent } from "@/components/ui/card";
import { Shield, Lock, Zap, Users, Globe, Code } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Shield,
      title: "Encrypted Security",
      description: "Advanced encryption ensures no one can preview NFT contents before reveal events, creating true mystery and fairness."
    },
    {
      icon: Lock,
      title: "Fair Launch System",
      description: "Our encrypted mystery boxes prevent insider trading and ensure equal opportunity for all participants."
    },
    {
      icon: Zap,
      title: "Synchronized Reveals",
      description: "Global reveal events create maximum excitement and community engagement around mystery collections."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Built by collectors, for collectors. Our platform prioritizes community feedback and transparent operations."
    },
    {
      icon: Globe,
      title: "Decentralized Platform",
      description: "Fully decentralized infrastructure ensures no single point of failure and true ownership of digital assets."
    },
    {
      icon: Code,
      title: "Open Innovation",
      description: "Our smart contracts are audited and open for community review, ensuring trust and transparency."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-mystery">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-neon bg-clip-text text-transparent">
              About MysteryNFT
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're revolutionizing NFT launches by introducing truly encrypted mystery drops that prevent 
            insider leaks and ensure fair distribution for all participants.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h3 className="text-2xl font-bold mb-6 text-primary">Our Mission</h3>
            <p className="text-muted-foreground mb-6">
              The NFT space has been plagued by insider trading and unfair advantages. Creators and 
              insiders often know the rarity distribution before public minting, leading to manipulation 
              and unfair practices.
            </p>
            <p className="text-muted-foreground mb-6">
              MysteryNFT solves this by encrypting all NFT metadata and artwork until a synchronized 
              reveal event. This creates true mystery, excitement, and fairness for every participant.
            </p>
            <p className="text-muted-foreground">
              Our platform ensures that everyone - from whales to newcomers - has an equal chance 
              at discovering rare and valuable NFTs.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-6 text-primary">How It Works</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Encrypted Minting</h4>
                  <p className="text-muted-foreground text-sm">
                    All NFT contents are encrypted and stored securely until reveal time.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Fair Distribution</h4>
                  <p className="text-muted-foreground text-sm">
                    Everyone mints mystery boxes with equal chances of rare items.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Global Reveal</h4>
                  <p className="text-muted-foreground text-sm">
                    Synchronized reveal events unlock all NFTs simultaneously.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-primary font-bold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Community Celebration</h4>
                  <p className="text-muted-foreground text-sm">
                    Experience the excitement of discovery together with the community.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center neon-glow-blue">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-card/30 backdrop-blur-sm border border-primary/20 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-4 gradient-neon bg-clip-text text-transparent">
              Join the Revolution
            </h3>
            <p className="text-muted-foreground mb-6">
              Be part of the future of fair NFT launches. Experience true mystery, 
              excitement, and equal opportunity in the digital collectibles space.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
              <span>🔒 100% Encrypted</span>
              <span>⚡ Instant Reveals</span>
              <span>🌐 Fully Decentralized</span>
              <span>🛡️ Audited Contracts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;