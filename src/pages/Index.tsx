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
              Let AI handle your salon booking slots so you never overbook nor leave empty slots. Smart scheduling that works for everyone.
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
      
      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-muted-foreground text-lg">
            Trusted by thousands of satisfied customers
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary">★</span>
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "This platform made booking so easy! No more calling multiple salons. I found the perfect one in minutes."
            </p>
            <p className="font-semibold">Sarah Johnson</p>
            <p className="text-sm text-muted-foreground">Regular Customer</p>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary">★</span>
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "AI recommendations helped me discover amazing salons I never knew existed. The booking system is flawless!"
            </p>
            <p className="font-semibold">Michael Chen</p>
            <p className="text-sm text-muted-foreground">Business Professional</p>
          </div>
          
          <div className="glass-card p-6">
            <div className="flex items-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-primary">★</span>
              ))}
            </div>
            <p className="text-muted-foreground mb-4">
              "As a salon owner, this system eliminated double bookings and empty slots. Our efficiency increased by 40%!"
            </p>
            <p className="font-semibold">Priya Sharma</p>
            <p className="text-sm text-muted-foreground">Salon Owner</p>
          </div>
        </div>
      </section>
      
      {/* Trusted By Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold mb-8">Trusted by Leading Salons</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
            <div className="text-xl font-semibold">Glamour Studio</div>
            <div className="text-xl font-semibold">Style Haven</div>
            <div className="text-xl font-semibold">Beauty Elite</div>
            <div className="text-xl font-semibold">The Cut Above</div>
            <div className="text-xl font-semibold">Urban Chic</div>
          </div>
        </div>
        
        <div className="glass-card p-8 text-center max-w-3xl mx-auto mt-12">
          <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Booking Experience?</h3>
          <p className="text-muted-foreground mb-6">
            Join thousands of satisfied customers and salon owners using our AI-powered platform
          </p>
          <Button variant="gradient" size="xl" onClick={handleBookNow}>
            Get Started Now
          </Button>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
