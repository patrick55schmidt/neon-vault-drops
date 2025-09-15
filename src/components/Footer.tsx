import { Twitter, Github, MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-primary/20">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold gradient-neon bg-clip-text text-transparent mb-4">
              MysteryNFT
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              The premier platform for encrypted NFT mystery drops. Experience true fairness 
              with contents hidden until reveal events.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MessageCircle className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Platform</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#drops" className="text-muted-foreground hover:text-primary transition-colors">Active Drops</a></li>
              <li><a href="#collections" className="text-muted-foreground hover:text-primary transition-colors">Collections</a></li>
              <li><a href="#creators" className="text-muted-foreground hover:text-primary transition-colors">For Creators</a></li>
              <li><a href="#marketplace" className="text-muted-foreground hover:text-primary transition-colors">Marketplace</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4 text-primary">Resources</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#docs" className="text-muted-foreground hover:text-primary transition-colors">Documentation</a></li>
              <li><a href="#help" className="text-muted-foreground hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 MysteryNFT. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            🔒 Powered by encrypted blockchain technology
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;