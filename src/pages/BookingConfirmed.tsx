import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

const BookingConfirmed = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  
  useEffect(() => {
    // Trigger confetti animation
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.9),
          y: Math.random() - 0.2,
        },
        colors: ['#DB7093', '#DDA0DD', '#E6E6FA'],
      });
    }, 250);

    return () => clearInterval(interval);
  }, []);
  
  if (!booking) {
    navigate("/");
    return null;
  }
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <div className="glass-card p-12 text-center soft-glow animate-scale-in">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-start to-primary-end rounded-full flex items-center justify-center animate-float">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              🎉 Booking Confirmed!
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8">
              Your booking is confirmed at{" "}
              <span className="font-semibold text-foreground">{booking.salonName}</span>
            </p>
            
            <div className="glass p-6 rounded-xl space-y-4 text-left mb-8">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-semibold">{booking.service}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-semibold">{booking.date}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Time:</span>
                <span className="font-semibold">{booking.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-semibold">{booking.customerName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Phone:</span>
                <span className="font-semibold">{booking.phone}</span>
              </div>
              {booking.email && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-semibold">{booking.email}</span>
                </div>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/my-bookings">
                <Button variant="gradient" size="lg">
                  <Sparkles className="mr-2 h-4 w-4" />
                  View My Bookings
                </Button>
              </Link>
              <Link to="/">
                <Button variant="glass" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmed;
