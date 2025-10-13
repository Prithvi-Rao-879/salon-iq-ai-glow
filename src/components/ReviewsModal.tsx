import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  salonId: number;
  salonName: string;
}

const ReviewsModal = ({ open, onOpenChange, salonId, salonName }: ReviewsModalProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAddReview, setShowAddReview] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: "",
    rating: 0,
    comment: "",
  });
  const [hoveredStar, setHoveredStar] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadReviews();
    }
  }, [open, salonId]);

  const loadReviews = () => {
    const storedReviews = localStorage.getItem(`reviews_${salonId}`);
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  };

  const handleAddReview = () => {
    if (!newReview.userName.trim() || !newReview.comment.trim() || newReview.rating === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields and select a rating.",
        variant: "destructive",
      });
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${salonId}`, JSON.stringify(updatedReviews));

    setNewReview({ userName: "", rating: 0, comment: "" });
    setShowAddReview(false);

    toast({
      title: "Review added!",
      description: "Thank you for your feedback.",
    });
  };

  const StarRating = ({ rating, onRate, isInteractive = false }: { rating: number; onRate?: (rating: number) => void; isInteractive?: boolean }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              star <= (isInteractive ? (hoveredStar || rating) : rating)
                ? "fill-accent text-accent"
                : "text-muted-foreground"
            } ${isInteractive ? "cursor-pointer transition-all hover:scale-110" : ""}`}
            onClick={() => isInteractive && onRate?.(star)}
            onMouseEnter={() => isInteractive && setHoveredStar(star)}
            onMouseLeave={() => isInteractive && setHoveredStar(0)}
          />
        ))}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl">{salonName} - Reviews</SheetTitle>
          <SheetDescription>
            See what our customers are saying
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {!showAddReview ? (
            <Button
              variant="gradient"
              onClick={() => setShowAddReview(true)}
              className="w-full"
            >
              Add Review
            </Button>
          ) : (
            <div className="glass-card p-6 space-y-4 animate-fade-in">
              <h3 className="font-semibold text-lg">Write Your Review</h3>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input
                  placeholder="Enter your name"
                  value={newReview.userName}
                  onChange={(e) =>
                    setNewReview({ ...newReview, userName: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Rating</label>
                <StarRating
                  rating={newReview.rating}
                  onRate={(rating) => setNewReview({ ...newReview, rating })}
                  isInteractive
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Review</label>
                <Textarea
                  placeholder="Share your experience..."
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleAddReview} variant="gradient" className="flex-1">
                  Submit Review
                </Button>
                <Button
                  onClick={() => {
                    setShowAddReview(false);
                    setNewReview({ userName: "", rating: 0, comment: "" });
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {reviews.length === 0 ? (
              <div className="text-center py-12 glass-card">
                <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review.id}
                  className="glass-card p-6 space-y-3 animate-fade-in hover:scale-[1.02] transition-transform"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <p className="text-sm text-muted-foreground">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ReviewsModal;
