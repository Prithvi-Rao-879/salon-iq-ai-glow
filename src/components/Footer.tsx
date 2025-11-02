import { Linkedin } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="glass border-t border-white/20 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 @Smart Salon Slot Scheduler | Powered by Prithvi Kumar Rao, Priyanshi Mishra, Priyanshu Kamal, Priya Kumari & Prateek Kumar
          </p>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="gap-2"
          >
            <a
              href="https://www.linkedin.com/in/prithvi-kumar-rao-59573a289/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={18} />
              Connect on LinkedIn
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
