import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ActiveDrops from "@/components/ActiveDrops";
import Collections from "@/components/Collections";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <ActiveDrops />
        <Collections />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;