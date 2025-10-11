import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Star } from "lucide-react";
import { format } from "date-fns";
import { salons } from "@/data/salons";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const SalonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const salon = salons.find((s) => s.id === Number(id));
  
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  
  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];
  
  if (!salon) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold">Salon not found</h1>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime || !customerName || !phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Store booking data
    const booking = {
      salonName: salon.name,
      service: salon.availableServices.find(s => s.id === Number(selectedService))?.name,
      date: format(selectedDate, "PPP"),
      time: selectedTime,
      customerName,
      phone,
      email,
      status: "Confirmed"
    };
    
    // Send to n8n webhook
    try {
      await fetch("https://ohjdojjcbsj.app.n8n.cloud/webhook/smartsalonscheduler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      });
    } catch (error) {
      console.error("Failed to send booking to webhook:", error);
      // Continue with booking even if webhook fails
    }
    
    // Get existing bookings
    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    existingBookings.push(booking);
    localStorage.setItem("bookings", JSON.stringify(existingBookings));
    
    // Navigate to confirmation
    navigate("/booking-confirmed", { state: { booking } });
  };
  
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Salon Banner */}
      <section className="relative h-80 overflow-hidden">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        <div className="absolute bottom-8 left-0 right-0 container mx-auto px-4">
          <h1 className="text-5xl font-bold text-white mb-2">{salon.name}</h1>
          <div className="flex items-center gap-2 text-white">
            <Star className="h-5 w-5 fill-accent text-accent" />
            <span className="text-lg font-semibold">{salon.rating} Rating</span>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Services */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Services</h2>
            <p className="text-muted-foreground mb-8">{salon.description}</p>
            
            <div className="space-y-4">
              {salon.availableServices.map((service) => (
                <div
                  key={service.id}
                  className="glass-card p-6 hover:scale-105 transition-all"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                    </div>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Booking Form */}
          <div className="glass-card p-8 soft-glow h-fit sticky top-24">
            <h2 className="text-3xl font-bold mb-6">Book Your Slot</h2>
            
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="service">Select Service *</Label>
                <Select value={selectedService} onValueChange={setSelectedService}>
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Choose a service" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {salon.availableServices.map((service) => (
                      <SelectItem key={service.id} value={service.id.toString()}>
                        {service.name} - {service.price}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Choose Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="glass"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 glass-card" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Choose Time *</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="glass">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="glass"
                  placeholder="John Doe"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="glass"
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass"
                  placeholder="john@example.com"
                />
              </div>
              
              <Button type="submit" variant="gradient" size="xl" className="w-full">
                Book My Slot ✨
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SalonDetail;
