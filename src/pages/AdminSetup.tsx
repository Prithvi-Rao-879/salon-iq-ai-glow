import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminSetup = () => {
  const { user, loading } = useAuth();
  const [salonName, setSalonName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAlreadyAdmin, setIsAlreadyAdmin] = useState(false);

  useEffect(() => {
    const checkIfAdmin = async () => {
      if (!user) return;

      const { data: roleData } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleData) {
        setIsAlreadyAdmin(true);
      }
    };

    checkIfAdmin();
  }, [user]);

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!salonName || !location) {
      toast.error("Please fill in salon name and location");
      return;
    }

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setIsSubmitting(true);

    try {
      // Create salon
      const { data: salon, error: salonError } = await supabase
        .from('salons')
        .insert({
          name: salonName,
          location: location,
          price_range: priceRange || '$$',
          rating: 4.5,
        })
        .select()
        .single();

      if (salonError) {
        console.error("Salon creation error:", salonError);
        toast.error("Failed to create salon: " + salonError.message);
        setIsSubmitting(false);
        return;
      }

      // Update user profile with salon_id
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ salon_id: salon.id })
        .eq('id', user.id);

      if (profileError) {
        console.error("Profile update error:", profileError);
        toast.error("Failed to link salon to profile");
        setIsSubmitting(false);
        return;
      }

      // Add admin role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: user.id,
          role: 'admin',
        });

      if (roleError) {
        console.error("Role assignment error:", roleError);
        toast.error("Failed to assign admin role");
        setIsSubmitting(false);
        return;
      }

      toast.success("Admin setup complete! Redirecting to dashboard...");
      setTimeout(() => {
        window.location.href = "/admin";
      }, 1500);
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (isAlreadyAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card className="glass-card p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Admin Setup</h1>
              <p className="text-muted-foreground">
                Set up your salon and become an admin to manage bookings
              </p>
            </div>

            <form onSubmit={handleSetup} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="salonName">Salon Name *</Label>
                <Input
                  id="salonName"
                  type="text"
                  value={salonName}
                  onChange={(e) => setSalonName(e.target.value)}
                  placeholder="e.g., Glamour Studio"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Downtown, NYC"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Input
                  id="priceRange"
                  type="text"
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  placeholder="e.g., $$, $$$, $$$$"
                />
              </div>

              <div className="bg-muted/30 border border-border/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This will create your salon and grant you admin access to manage bookings,
                  view analytics, and control your salon's profile.
                </p>
              </div>

              <Button 
                type="submit" 
                variant="gradient" 
                size="lg" 
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Setting up..." : "Complete Setup"}
              </Button>
            </form>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminSetup;
