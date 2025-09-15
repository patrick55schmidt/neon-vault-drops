import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Users, Calendar } from "lucide-react";

const Collections = () => {
  const collections = [
    {
      id: "legends-revealed",
      title: "Cyber Legends Revealed",
      image: "/placeholder.svg",
      floorPrice: "0.15",
      totalVolume: "1,234",
      holders: 8956,
      revealed: true,
      revealDate: "Sep 15, 2024",
      description: "Legendary cyberpunk warriors with rare traits and abilities revealed."
    },
    {
      id: "artifacts-collection",
      title: "Ancient Neon Artifacts",
      image: "/placeholder.svg",
      floorPrice: "0.08",
      totalVolume: "892",
      holders: 3421,
      revealed: true,
      revealDate: "Aug 30, 2024",
      description: "Mystical artifacts with neon energy and ancient powers."
    },
    {
      id: "mystery-vault",
      title: "Quantum Mystery Vault",
      image: "/placeholder.svg",
      floorPrice: "0.22",
      totalVolume: "567",
      holders: 1205,
      revealed: false,
      revealDate: "Oct 5, 2024",
      description: "Unrevealed quantum phenomena awaiting discovery."
    },
  ];

  return (
    <section id="collections" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-neon bg-clip-text text-transparent">
              Revealed Collections
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore collections that have completed their mystery phase and unveiled their secrets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection) => (
            <Card key={collection.id} className="group hover:scale-105 transition-all duration-300 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40">
              <CardContent className="p-6">
                <div className="aspect-square bg-gradient-mystery rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                  <Eye className="w-12 h-12 text-primary/60" />
                  {collection.revealed && (
                    <Badge className="absolute top-2 right-2 bg-green-600 hover:bg-green-600">
                      Revealed
                    </Badge>
                  )}
                  {!collection.revealed && (
                    <Badge className="absolute top-2 right-2 bg-yellow-600 hover:bg-yellow-600">
                      Mystery
                    </Badge>
                  )}
                </div>

                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {collection.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {collection.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Floor Price</span>
                    <span className="font-semibold">{collection.floorPrice} ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Volume</span>
                    <span className="font-semibold">{collection.totalVolume} ETH</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Holders</span>
                    </div>
                    <span className="font-semibold">{collection.holders.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Reveal Date</span>
                    </div>
                    <span className="text-sm">{collection.revealDate}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            More collections being revealed regularly. Join our community for updates.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Collections;