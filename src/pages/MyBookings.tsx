import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";

interface Booking {
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    setBookings(savedBookings);
  }, []);
  
  const handleCancelBooking = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold">My Bookings</h1>
          </div>
          
          {bookings.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-2xl font-semibold mb-2">No bookings yet</h2>
              <p className="text-muted-foreground mb-6">
                Start exploring salons and book your first appointment!
              </p>
              <Link to="/">
                <Button variant="gradient" size="lg">
                  Explore Salons
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking, index) => (
                <div
                  key={index}
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
                        onClick={() => handleCancelBooking(index)}
                        className="glass hover:bg-destructive/10 hover:text-destructive"
                      >
                        Cancel Booking
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default MyBookings;
