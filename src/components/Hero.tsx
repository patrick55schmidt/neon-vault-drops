import { Button } from "@/components/ui/button";
import { Lock, Zap, Shield } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBanner})` }}
      >
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-neon bg-clip-text text-transparent neon-pulse">
              Mint Mystery,
            </span>
            <br />
            <span className="text-foreground">
              Unlock Privately
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the future of NFT drops with encrypted contents that prevent insider leaks. 
            True mystery until the reveal event.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              variant="neon" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => document.getElementById('drops')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Zap className="w-5 h-5 mr-2" />
              Start Minting
            </Button>
            <Button 
              variant="mystery" 
              size="lg" 
              className="text-lg px-8 py-4"
              onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Lock className="w-5 h-5 mr-2" />
              View Collections
            </Button>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center neon-glow-blue">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Encrypted Security</h3>
              <p className="text-muted-foreground">
                Contents are fully encrypted until reveal, preventing any insider knowledge
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-secondary/20 rounded-full flex items-center justify-center neon-glow-purple">
                <Lock className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fair Launch</h3>
              <p className="text-muted-foreground">
                True mystery drops ensure fair distribution for all participants
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/20 rounded-full flex items-center justify-center neon-glow-pink">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Reveal</h3>
              <p className="text-muted-foreground">
                Synchronized reveal events create maximum excitement and engagement
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;