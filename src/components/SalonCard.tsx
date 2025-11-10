import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star, Heart } from "lucide-react";
import ReviewsModal from "./ReviewsModal";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface SalonCardProps {
  id: number;
  name: string;
  image: string;
  location: string;
  price: string;
  services: string[];
  rating: number;
}

const SalonCard = ({ id, name, image, location, price, services, rating }: SalonCardProps) => {
  const [showReviews, setShowReviews] = useState(false);
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        setIsFavorite(favorites.includes(id));
      }
    }
  }, [user, id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast.error("Please login to add favorites");
      return;
    }

    const savedFavorites = localStorage.getItem(`favorites_${user.id}`);
    const favorites = savedFavorites ? JSON.parse(savedFavorites) : [];
    
    const newFavorites = isFavorite
      ? favorites.filter((favId: number) => favId !== id)
      : [...favorites, id];
    
    localStorage.setItem(`favorites_${user.id}`, JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
    
    toast.success(isFavorite ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <>
      <ReviewsModal
        open={showReviews}
        onOpenChange={setShowReviews}
        salonId={id}
        salonName={name}
      />
      <div className="glass-card overflow-hidden group hover:scale-105 transition-all duration-300 soft-glow relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 left-2 z-10 glass rounded-full"
          onClick={toggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-primary text-primary' : 'text-foreground'}`} />
        </Button>
        
        <div className="relative h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-3 right-3 glass px-3 py-1.5 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-sm text-muted-foreground mb-1">{location}</p>
          <p className="text-sm font-medium mb-3">{price}</p>
          <p className="text-sm text-muted-foreground mb-4">
            {services.join(" • ")}
          </p>
          
          <div className="space-y-2">
            <Link to={`/salon/${id}`}>
              <Button variant="gradient" className="w-full">
                Book Now
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowReviews(true)}
            >
              Reviews
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalonCard;
