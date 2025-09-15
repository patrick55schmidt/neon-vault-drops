import MysteryBox from "@/components/MysteryBox";
import mysteryBox1 from "@/assets/mystery-box-1.jpg";
import mysteryBox2 from "@/assets/mystery-box-2.jpg";
import mysteryBox3 from "@/assets/mystery-box-3.jpg";

const ActiveDrops = () => {
  const drops = [
    {
      id: "cyber-legends",
      title: "Cyber Legends",
      image: mysteryBox1,
      price: "0.08",
      totalSupply: 10000,
      minted: 7834,
      revealDate: "Sep 25, 2024",
      description: "Epic cyberpunk warriors with unique abilities and legendary rare traits."
    },
    {
      id: "neon-artifacts",
      title: "Neon Artifacts",
      image: mysteryBox2,
      price: "0.05",
      totalSupply: 5000,
      minted: 2891,
      revealDate: "Sep 30, 2024",
      description: "Ancient artifacts infused with futuristic neon energy and mystical powers."
    },
    {
      id: "quantum-mysteries",
      title: "Quantum Mysteries",
      image: mysteryBox3,
      price: "0.12",
      totalSupply: 3333,
      minted: 1205,
      revealDate: "Oct 5, 2024",
      description: "Rare quantum phenomena captured in digital form with impossible geometries."
    },
  ];

  return (
    <section id="drops" className="py-20 bg-gradient-mystery">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-neon bg-clip-text text-transparent">
              Active Mystery Drops
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover encrypted NFT collections waiting to be revealed. Each drop contains 
            hidden treasures that remain secret until the synchronized reveal event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {drops.map((drop) => (
            <MysteryBox key={drop.id} {...drop} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            More mystery drops coming soon. Follow us for exclusive early access.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ActiveDrops;