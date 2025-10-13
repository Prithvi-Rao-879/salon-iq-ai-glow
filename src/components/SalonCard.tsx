import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import ReviewsModal from "./ReviewsModal";

interface SalonCardProps {
  id: number;
  name: string;
  image: string;
  services: string[];
  rating: number;
}

const SalonCard = ({ id, name, image, services, rating }: SalonCardProps) => {
  const [showReviews, setShowReviews] = useState(false);

  return (
    <>
      <ReviewsModal
        open={showReviews}
        onOpenChange={setShowReviews}
        salonId={id}
        salonName={name}
      />
    <div className="glass-card overflow-hidden group hover:scale-105 transition-all duration-300 soft-glow">
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
