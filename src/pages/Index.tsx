import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SalonCard from "@/components/SalonCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Sparkles, Search, Calendar, CheckCircle2, Clock, Bell, BarChart3, CreditCard, Users, TrendingUp, Filter, MapPin } from "lucide-react";
import { salons } from "@/data/salons";
import heroImage from "@/assets/hero-salon.jpg";
import { useAuth } from "@/hooks/useAuth";
import { useState, useMemo } from "react";

const Index = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");
  const [filterCategory, setFilterCategory] = useState("all");

  const filteredAndSortedSalons = useMemo(() => {
    let filtered = salons;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(salon =>
        salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        salon.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (filterCategory !== "all") {
      filtered = filtered.filter(salon => {
        const category = salon.services?.[0] || "";
        return category.toLowerCase().includes(filterCategory.toLowerCase());
      });
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "rating") {
        return b.rating - a.rating;
      } else if (sortBy === "price-low") {
        return a.price.localeCompare(b.price);
      } else if (sortBy === "price-high") {
        return b.price.localeCompare(a.price);
      }
      return 0;
    });

    return sorted;
  }, [searchQuery, sortBy, filterCategory]);

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

        {/* Filters and Search */}
        <div className="glass-card p-6 mb-8 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search salons or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rating</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="hair">Hair Salon</SelectItem>
                <SelectItem value="spa">Spa</SelectItem>
                <SelectItem value="nail">Nail Salon</SelectItem>
                <SelectItem value="makeup">Makeup</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAndSortedSalons.length > 0 ? (
            filteredAndSortedSalons.map((salon) => (
              <SalonCard key={salon.id} {...salon} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No salons found matching your criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* Map Integration Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Find Salons Near You</h2>
          <p className="text-muted-foreground text-lg">
            Explore salons on the map and book instantly
          </p>
        </div>
        
        <div className="glass-card p-8 max-w-6xl mx-auto">
          <div className="aspect-video bg-muted rounded-2xl flex items-center justify-center">
            <div className="text-center space-y-4">
              <MapPin className="h-16 w-16 mx-auto text-primary" />
              <p className="text-xl font-semibold">Interactive Map Coming Soon</p>
              <p className="text-muted-foreground">Mapbox integration for live salon locations</p>
            </div>
          </div>
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
      
      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Powerful Features for Everyone</h2>
          <p className="text-muted-foreground text-lg">
            Built for both customers and salon owners
          </p>
        </div>
        
        {/* For Customers */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-center">For Customers</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">AI-Powered Recommendations</h4>
              <p className="text-muted-foreground mb-3">
                Get personalized salon suggestions based on your preferences and location
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ Find your perfect salon 3x faster
              </p>
            </div>
            
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Real-Time Availability</h4>
              <p className="text-muted-foreground mb-3">
                See available slots instantly and book without calling or waiting
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ Save 30+ minutes per booking
              </p>
            </div>
            
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <Bell className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Smart Reminders</h4>
              <p className="text-muted-foreground mb-3">
                Never miss an appointment with automated notifications and reminders
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ Zero missed appointments
              </p>
            </div>
          </div>
        </div>
        
        {/* For Salon Owners */}
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-center">For Salon Owners</h3>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Automated Slot Assignment</h4>
              <p className="text-muted-foreground mb-3">
                AI optimizes your schedule to maximize bookings and minimize gaps
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ Save 1-2 hours per day on scheduling
              </p>
            </div>
            
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Customer Reminders</h4>
              <p className="text-muted-foreground mb-3">
                Automatic notifications reduce no-shows and keep your schedule full
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ Reduce no-shows by 30%
              </p>
            </div>
            
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Business Analytics</h4>
              <p className="text-muted-foreground mb-3">
                Track bookings, revenue, and customer trends with detailed insights
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ Increase revenue by 25%
              </p>
            </div>
            
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <CreditCard className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Payment Integration</h4>
              <p className="text-muted-foreground mb-3">
                Seamless payment processing with secure checkout and invoicing
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ Get paid instantly, reduce payment delays
              </p>
            </div>
            
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">CRM Integration</h4>
              <p className="text-muted-foreground mb-3">
                Manage customer relationships and build loyalty with integrated tools
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ Improve customer retention by 40%
              </p>
            </div>
            
            <div className="glass-card p-6 hover:scale-105 transition-all">
              <div className="w-12 h-12 mb-4 bg-gradient-to-br from-primary-start to-primary-end rounded-xl flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Zero Overbooking</h4>
              <p className="text-muted-foreground mb-3">
                Smart algorithms prevent double bookings and optimize capacity
              </p>
              <p className="text-sm font-medium text-primary">
                ✓ 100% booking accuracy guaranteed
              </p>
            </div>
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
