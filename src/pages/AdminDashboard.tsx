import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, Users, TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface DashboardStats {
  totalBookings: number;
  upcomingBookings: number;
  completedBookings: number;
  totalRevenue: number;
  todayBookings: number;
}

interface Profile {
  id: string;
  full_name: string | null;
  salon_id: string | null;
}

interface Salon {
  id: string;
  name: string;
  location: string | null;
  rating: number | null;
  price_range: string | null;
}

const AdminDashboard = () => {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    upcomingBookings: 0,
    completedBookings: 0,
    totalRevenue: 0,
    todayBookings: 0,
  });
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [salon, setSalon] = useState<Salon | null>(null);

  useEffect(() => {
    const checkAdminAndFetchData = async () => {
      if (!user) return;

      setIsLoading(true);
      
      // Check if user is admin
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .maybeSingle();

      if (roleError) {
        console.error("Failed to check admin role:", roleError);
        toast.error("Failed to verify admin access");
        setIsLoading(false);
        return;
      }

      if (!roleData) {
        toast.error("You don't have admin access");
        setIsLoading(false);
        return;
      }

      setIsAdmin(true);

      // Fetch user profile to get salon_id
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*, salons(*)')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error("Failed to fetch profile:", profileError);
        toast.error("Failed to load profile data");
        setIsLoading(false);
        return;
      }

      if (!profile?.salon_id) {
        toast.error("No salon assigned to your account. Please contact support.");
        setIsLoading(false);
        return;
      }

      setSalon(profile.salons);

      // Fetch bookings for this salon only
      const { data: bookings, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('salon_id', profile.salon_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Failed to fetch bookings:", error);
        toast.error("Failed to load dashboard data");
        setIsLoading(false);
        return;
      }

      // Calculate stats
      const today = new Date().toISOString().split('T')[0];
      const totalBookings = bookings?.length || 0;
      const upcomingBookings = bookings?.filter(b => b.status === 'Confirmed').length || 0;
      const completedBookings = bookings?.filter(b => b.status === 'Completed').length || 0;
      const todayBookings = bookings?.filter(b => b.date === today).length || 0;
      
      // Mock revenue calculation (in real app, fetch from payment records)
      const totalRevenue = completedBookings * 85; // Average $85 per service

      setStats({
        totalBookings,
        upcomingBookings,
        completedBookings,
        totalRevenue,
        todayBookings,
      });

      setRecentBookings(bookings?.slice(0, 10) || []);
      setIsLoading(false);
    };

    checkAdminAndFetchData();
  }, [user]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);

    if (error) {
      toast.error("Failed to update booking status");
    } else {
      toast.success(`Booking status updated to ${newStatus}`);
      // Refresh bookings
      // Refresh bookings for this salon
      const { data: profile } = await supabase
        .from('profiles')
        .select('salon_id')
        .eq('id', user?.id)
        .single();
      
      if (profile?.salon_id) {
        const { data } = await supabase
          .from('bookings')
          .select('*')
          .eq('salon_id', profile.salon_id)
          .order('created_at', { ascending: false });
        if (data) setRecentBookings(data.slice(0, 10));
      }
    }
  };

  if (loading || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="glass-card p-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You don't have permission to access the admin dashboard.</p>
          <Button onClick={() => window.location.href = "/"}>Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            {salon?.name ? `${salon.name} - Admin Dashboard` : 'Salon Admin Dashboard'}
          </h1>
          <p className="text-muted-foreground">Manage your salon bookings and track performance</p>
          {salon?.location && (
            <p className="text-sm text-muted-foreground mt-1">📍 {salon.location}</p>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Bookings</p>
                <p className="text-3xl font-bold">{stats.totalBookings}</p>
              </div>
              <Calendar className="h-12 w-12 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Upcoming</p>
                <p className="text-3xl font-bold">{stats.upcomingBookings}</p>
              </div>
              <Clock className="h-12 w-12 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Completed</p>
                <p className="text-3xl font-bold">{stats.completedBookings}</p>
              </div>
              <CheckCircle2 className="h-12 w-12 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                <p className="text-3xl font-bold">${stats.totalRevenue}</p>
              </div>
              <DollarSign className="h-12 w-12 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Today's Bookings</p>
                <p className="text-3xl font-bold">{stats.todayBookings}</p>
              </div>
              <Users className="h-12 w-12 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="glass-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Growth</p>
                <p className="text-3xl font-bold">+25%</p>
              </div>
              <TrendingUp className="h-12 w-12 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        {/* Recent Bookings */}
        <Card className="glass-card p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Bookings</h2>
          <div className="space-y-4">
            {recentBookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">No bookings yet</p>
            ) : (
              recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="glass border border-border/50 rounded-xl p-4 hover:scale-105 transition-all"
                >
                  <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span className="font-semibold">{booking.customer_name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Service: {booking.service}</p>
                        <p>Date: {booking.date} at {booking.time}</p>
                        <p>Phone: {booking.phone}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="inline-flex items-center gap-2 glass px-3 py-1 rounded-full text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          booking.status === 'Confirmed' ? 'bg-green-500' : 
                          booking.status === 'Completed' ? 'bg-blue-500' : 'bg-gray-500'
                        }`}></div>
                        <span className="font-medium">{booking.status}</span>
                      </div>
                      {booking.status === 'Confirmed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleStatusChange(booking.id, 'Completed')}
                          className="text-xs"
                        >
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
