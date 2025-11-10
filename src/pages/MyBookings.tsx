import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Sparkles, Heart, Gift, TrendingUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { salons } from "@/data/salons";

interface Booking {
  id: string;
  salonName: string;
  service: string;
  date: string;
  time: string;
  customerName: string;
  phone: string;
  email?: string;
  status: string;
}

const MyBookings = () => {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favoriteSalons, setFavoriteSalons] = useState<number[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      setIsLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Failed to load bookings");
      } else {
        const formattedBookings = data.map((booking: any) => ({
          id: booking.id,
          salonName: booking.salon_name,
          service: booking.service,
          date: booking.date,
          time: booking.time,
          customerName: booking.customer_name,
          phone: booking.phone,
          email: booking.email,
          status: booking.status
        }));
        setBookings(formattedBookings);
        
        // Calculate loyalty points (10 points per booking)
        setLoyaltyPoints(formattedBookings.length * 10);
      }

      // Load favorites from localStorage
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        setFavoriteSalons(JSON.parse(savedFavorites));
      }
      
      setIsLoading(false);
    };
    
    fetchBookings();
  }, [user]);
  
  const handleCancelBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Failed to cancel booking:", error);
      toast.error("Failed to cancel booking");
    } else {
      setBookings(bookings.filter(b => b.id !== id));
      setLoyaltyPoints(prev => Math.max(0, prev - 10));
      toast.success("Booking cancelled successfully");
    }
  };

  const toggleFavorite = (salonId: number) => {
    const newFavorites = favoriteSalons.includes(salonId)
      ? favoriteSalons.filter(id => id !== salonId)
      : [...favoriteSalons, salonId];
    
    setFavoriteSalons(newFavorites);
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
    }
    toast.success(
      favoriteSalons.includes(salonId) 
        ? "Removed from favorites" 
        : "Added to favorites"
    );
  };

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed');
  const pastBookings = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');
  const favoriteSalonsList = salons.filter(s => favoriteSalons.includes(s.id));

  if (loading || isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">My Dashboard</h1>
            </div>
            
            {/* Loyalty Points Card */}
            <Card className="glass-card p-4">
              <div className="flex items-center gap-3">
                <Gift className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Loyalty Points</p>
                  <p className="text-2xl font-bold">{loyaltyPoints}</p>
                </div>
              </div>
            </Card>
          </div>

          <Tabs defaultValue="bookings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 glass-card">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            {/* Current Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              {upcomingBookings.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold mb-2">No upcoming bookings</h2>
                  <p className="text-muted-foreground mb-6">
                    Start exploring salons and book your appointment!
                  </p>
                  <Link to="/">
                    <Button variant="gradient" size="lg">
                      Explore Salons
                    </Button>
                  </Link>
                </div>
              ) : (
                upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="glass-card p-6 hover:scale-105 transition-all soft-glow"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <h3 className="text-xl font-semibold">{booking.salonName}</h3>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Service:</span>
                            <span className="font-medium">{booking.service}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{booking.date}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Time:</span>
                            <span className="font-medium">{booking.time}</span>
                          </p>
                        </div>
                        
                        <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-sm">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span className="font-medium">{booking.status}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 md:items-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelBooking(booking.id)}
                          className="glass hover:bg-destructive/10 hover:text-destructive"
                        >
                          Cancel Booking
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites">
              {favoriteSalonsList.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold mb-2">No favorite salons yet</h2>
                  <p className="text-muted-foreground mb-6">
                    Browse salons and add your favorites!
                  </p>
                  <Link to="/">
                    <Button variant="gradient" size="lg">
                      Explore Salons
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {favoriteSalonsList.map((salon) => (
                    <Card key={salon.id} className="glass-card p-6">
                      <div className="flex gap-4">
                        <img
                          src={salon.image}
                          alt={salon.name}
                          className="w-24 h-24 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg">{salon.name}</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(salon.id)}
                            >
                              <Heart className="h-5 w-5 fill-primary text-primary" />
                            </Button>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{salon.location}</p>
                          <div className="flex items-center gap-2">
                            <span className="text-primary">★</span>
                            <span className="font-medium">{salon.rating}</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-sm">{salon.price}</span>
                          </div>
                        </div>
                      </div>
                      <Link to={`/salon/${salon.id}`}>
                        <Button variant="outline" className="w-full mt-4">
                          View Details
                        </Button>
                      </Link>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history" className="space-y-6">
              {pastBookings.length === 0 ? (
                <div className="glass-card p-12 text-center">
                  <TrendingUp className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <h2 className="text-2xl font-semibold mb-2">No booking history</h2>
                  <p className="text-muted-foreground">
                    Your completed bookings will appear here
                  </p>
                </div>
              ) : (
                pastBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="glass-card p-6 opacity-80"
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-3 flex-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          <h3 className="text-xl font-semibold">{booking.salonName}</h3>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <p className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Service:</span>
                            <span className="font-medium">{booking.service}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Date:</span>
                            <span className="font-medium">{booking.date}</span>
                          </p>
                          <p className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="text-muted-foreground">Time:</span>
                            <span className="font-medium">{booking.time}</span>
                          </p>
                        </div>
                        
                        <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-sm">
                          <div className={`w-2 h-2 rounded-full ${
                            booking.status === 'Completed' ? 'bg-blue-500' : 'bg-gray-500'
                          }`}></div>
                          <span className="font-medium">{booking.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyBookings;
