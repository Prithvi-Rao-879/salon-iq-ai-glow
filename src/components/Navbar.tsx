import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sparkles, LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useTheme } from "next-themes";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error && error.message !== 'Session not found') {
        console.error('Logout error:', error);
        toast.error("Failed to logout");
        return;
      }
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      console.error('Unexpected logout error:', err);
      navigate("/");
    }
  };
  
  return (
    <nav className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles className="h-6 w-6 text-primary group-hover:animate-spin transition-transform" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary-start to-primary-end bg-clip-text text-transparent">
            Smart Salon Slot Scheduler
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/') ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Home
          </Link>
          <Link 
            to="/my-bookings" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/my-bookings') ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Dashboard
          </Link>
          <Link 
            to="/admin" 
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive('/admin') ? 'text-primary' : 'text-foreground/80'
            }`}
          >
            Admin
          </Link>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
          {user ? (
            <>
              <Link to="/my-bookings">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Link to="/admin-setup">
                <Button variant="outline" size="sm">
                  Become Admin
                </Button>
              </Link>
              <Button variant="gradient" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="gradient" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
