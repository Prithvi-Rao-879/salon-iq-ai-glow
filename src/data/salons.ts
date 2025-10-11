import salon1 from "@/assets/salon-1.jpg";
import salon2 from "@/assets/salon-2.jpg";
import salon3 from "@/assets/salon-3.jpg";
import salon4 from "@/assets/salon-4.jpg";
import salon5 from "@/assets/salon-5.jpg";
import salon6 from "@/assets/salon-6.jpg";

export interface Service {
  id: number;
  name: string;
  duration: string;
  price: string;
}

export interface Salon {
  id: number;
  name: string;
  image: string;
  services: string[];
  rating: number;
  description: string;
  availableServices: Service[];
}

export const salons: Salon[] = [
  {
    id: 1,
    name: "Luxe Hair Studio",
    image: salon1,
    services: ["Haircut", "Styling", "Coloring"],
    rating: 4.8,
    description: "Modern hair salon with expert stylists specializing in cutting-edge trends and classic styles.",
    availableServices: [
      { id: 1, name: "Haircut & Style", duration: "60 min", price: "$85" },
      { id: 2, name: "Hair Coloring", duration: "120 min", price: "$150" },
      { id: 3, name: "Highlights", duration: "90 min", price: "$120" },
      { id: 4, name: "Deep Conditioning", duration: "45 min", price: "$65" },
    ],
  },
  {
    id: 2,
    name: "Elegance Beauty Spa",
    image: salon2,
    services: ["Facial", "Spa", "Massage"],
    rating: 4.9,
    description: "Luxury spa offering premium skincare treatments and relaxation therapies.",
    availableServices: [
      { id: 5, name: "Classic Facial", duration: "60 min", price: "$95" },
      { id: 6, name: "Anti-Aging Facial", duration: "90 min", price: "$145" },
      { id: 7, name: "Body Massage", duration: "60 min", price: "$110" },
      { id: 8, name: "Spa Package", duration: "180 min", price: "$280" },
    ],
  },
  {
    id: 3,
    name: "Polished Nails Bar",
    image: salon3,
    services: ["Manicure", "Pedicure", "Nail Art"],
    rating: 4.7,
    description: "Premium nail salon with the latest trends in nail care and artistic designs.",
    availableServices: [
      { id: 9, name: "Classic Manicure", duration: "45 min", price: "$45" },
      { id: 10, name: "Gel Manicure", duration: "60 min", price: "$65" },
      { id: 11, name: "Spa Pedicure", duration: "75 min", price: "$75" },
      { id: 12, name: "Nail Art Design", duration: "30 min", price: "$25" },
    ],
  },
  {
    id: 4,
    name: "Radiance Makeup Studio",
    image: salon4,
    services: ["Makeup", "Skincare", "Brows"],
    rating: 4.9,
    description: "Professional makeup studio for special events, weddings, and everyday glamour.",
    availableServices: [
      { id: 13, name: "Special Event Makeup", duration: "90 min", price: "$125" },
      { id: 14, name: "Bridal Makeup", duration: "120 min", price: "$200" },
      { id: 15, name: "Eyebrow Shaping", duration: "30 min", price: "$35" },
      { id: 16, name: "Lash Extensions", duration: "90 min", price: "$150" },
    ],
  },
  {
    id: 5,
    name: "Urban Edge Barbershop",
    image: salon5,
    services: ["Haircut", "Shave", "Beard Trim"],
    rating: 4.8,
    description: "Contemporary barbershop combining classic techniques with modern style.",
    availableServices: [
      { id: 17, name: "Haircut", duration: "45 min", price: "$55" },
      { id: 18, name: "Hot Towel Shave", duration: "30 min", price: "$45" },
      { id: 19, name: "Beard Trim & Shape", duration: "30 min", price: "$35" },
      { id: 20, name: "Full Service", duration: "90 min", price: "$95" },
    ],
  },
  {
    id: 6,
    name: "Vintage Glam Salon",
    image: salon6,
    services: ["Styling", "Treatments", "Extensions"],
    rating: 4.7,
    description: "Boutique salon blending vintage charm with modern hair care expertise.",
    availableServices: [
      { id: 21, name: "Blow Dry & Style", duration: "45 min", price: "$65" },
      { id: 22, name: "Keratin Treatment", duration: "180 min", price: "$250" },
      { id: 23, name: "Hair Extensions", duration: "240 min", price: "$400" },
      { id: 24, name: "Updo Styling", duration: "90 min", price: "$95" },
    ],
  },
];
