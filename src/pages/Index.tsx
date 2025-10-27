import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalonCard from "@/components/SalonCard";
import { Button } from "@/components/ui/button";
import { Sparkles, Search, Calendar, CheckCircle2 } from "lucide-react";
import { salons } from "@/data/salons";
import heroImage from "@/assets/hero-salon.jpg";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!user) {
      navigate("/signup");
    } else {
      document.getElementById("explore")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">AI-Powered Recommendations</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              AI-Powered Salon{" "}
              <span className="bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
                Booking Marketplace
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground">
              Find and book your next salon appointment, hassle-free.
            </p>
            
            <div className="flex gap-4">
              <Button variant="gradient" size="xl" onClick={handleBookNow}>
                Book Now
              </Button>
              {!user && (
                <Link to="/login">
                  <Button variant="glass" size="xl">
                    Login
                  </Button>
                </Link>
              )}
            </div>
          </div>
          
          <div className="relative float">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary-start to-primary-end rounded-3xl opacity-20 blur-2xl animate-glow"></div>
            <img
              src={heroImage}
              alt="Salon experience"
              className="relative rounded-3xl shadow-2xl w-full"
            />
          </div>
        </div>
      </section>
      
      {/* Explore Salons Section */}
      <section id="explore" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Top Salons</h2>
          <p className="text-muted-foreground text-lg">
            Discover premium salons and book your appointment instantly
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salons.map((salon) => (
            <SalonCard key={salon.id} {...salon} />
          ))}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Book your appointment in three simple steps
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-2xl flex items-center justify-center group-hover:animate-float">
              <Search className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Find Salon</h3>
            <p className="text-muted-foreground">
              Browse and discover top-rated salons near you
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-2xl flex items-center justify-center group-hover:animate-float">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Service</h3>
            <p className="text-muted-foreground">
              Select your preferred service and time slot
            </p>
          </div>
          
          <div className="glass-card p-8 text-center group hover:scale-105 transition-all">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-2xl flex items-center justify-center group-hover:animate-float">
              <CheckCircle2 className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Confirm Slot</h3>
            <p className="text-muted-foreground">
              Instant confirmation and appointment reminder
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
