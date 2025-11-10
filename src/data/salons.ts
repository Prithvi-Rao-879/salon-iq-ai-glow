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

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Salon {
  id: number;
  name: string;
  image: string;
  location: string;
  price: string;
  services: string[];
  rating: number;
  description: string;
  availableServices: Service[];
  reviews: Review[];
}

export const salons: Salon[] = [
  {
    id: 1,
    name: "Luxe Hair Studio",
    image: salon1,
    location: "Downtown, New York",
    price: "₹₹₹",
    services: ["Haircut", "Styling", "Coloring"],
    rating: 4.8,
    description: "Modern hair salon with expert stylists specializing in cutting-edge trends and classic styles.",
    availableServices: [
      { id: 1, name: "Haircut & Style", duration: "60 min", price: "₹720" },
      { id: 2, name: "Hair Coloring", duration: "120 min", price: "₹1,280" },
      { id: 3, name: "Highlights", duration: "90 min", price: "₹1,020" },
      { id: 4, name: "Deep Conditioning", duration: "45 min", price: "₹550" },
    ],
    reviews: [
      { id: "1", userName: "Sneha Patel", rating: 5, comment: "Absolutely loved my experience! The stylists here are true artists. Got my hair colored and highlighted, and it turned out even better than I imagined. The ambiance is amazing too!", date: "15 Oct 2024" },
      { id: "2", userName: "Rahul Sharma", rating: 5, comment: "Best haircut I've had in years! The stylist really listened to what I wanted and gave expert suggestions. Very professional service and great attention to detail.", date: "8 Oct 2024" },
      { id: "3", userName: "Priya Menon", rating: 4, comment: "Great salon with skilled professionals. The deep conditioning treatment left my hair feeling so soft and healthy. Only minor issue was the wait time, but totally worth it!", date: "2 Oct 2024" },
      { id: "4", userName: "Amit Kumar", rating: 5, comment: "The staff is incredibly talented and friendly. I always leave feeling confident and refreshed. Highly recommend their highlighting service - it looks so natural!", date: "28 Sep 2024" },
    ],
  },
  {
    id: 2,
    name: "Elegance Beauty Spa",
    image: salon2,
    location: "Midtown Plaza, Mumbai",
    price: "₹₹₹₹",
    services: ["Facial", "Spa", "Massage"],
    rating: 4.9,
    description: "Luxury spa offering premium skincare treatments and relaxation therapies.",
    availableServices: [
      { id: 5, name: "Classic Facial", duration: "60 min", price: "₹810" },
      { id: 6, name: "Anti-Aging Facial", duration: "90 min", price: "₹1,230" },
      { id: 7, name: "Body Massage", duration: "60 min", price: "₹940" },
      { id: 8, name: "Spa Package", duration: "180 min", price: "₹2,380" },
    ],
    reviews: [
      { id: "5", userName: "Meera Iyer", rating: 5, comment: "This is pure heaven! The spa package is absolutely worth every penny. The therapists are so skilled and the entire experience was rejuvenating. My skin feels amazing after the anti-aging facial!", date: "18 Oct 2024" },
      { id: "6", userName: "Kavita Singh", rating: 5, comment: "I visit regularly for their body massage and it never disappoints. The ambiance is so peaceful and relaxing. The staff is professional and courteous. Best spa in the city!", date: "12 Oct 2024" },
      { id: "7", userName: "Anjali Reddy", rating: 5, comment: "Had the most relaxing experience here. The classic facial was wonderful and my skin is glowing! The products they use are top quality. Will definitely be back!", date: "5 Oct 2024" },
      { id: "8", userName: "Deepa Nair", rating: 4, comment: "Excellent service and very clean facility. The massage was therapeutic and really helped with my back pain. Slightly pricey but the quality justifies it.", date: "30 Sep 2024" },
    ],
  },
  {
    id: 3,
    name: "Polished Nails Bar",
    image: salon3,
    location: "Fashion District, London",
    price: "₹₹",
    services: ["Manicure", "Pedicure", "Nail Art"],
    rating: 4.7,
    description: "Premium nail salon with the latest trends in nail care and artistic designs.",
    availableServices: [
      { id: 9, name: "Classic Manicure", duration: "45 min", price: "₹380" },
      { id: 10, name: "Gel Manicure", duration: "60 min", price: "₹550" },
      { id: 11, name: "Spa Pedicure", duration: "75 min", price: "₹640" },
      { id: 12, name: "Nail Art Design", duration: "30 min", price: "₹210" },
    ],
    reviews: [
      { id: "9", userName: "Riya Kapoor", rating: 5, comment: "Love this place! The nail art designs are incredible and so creative. My gel manicure lasted for 3 weeks without chipping. The staff is so talented and friendly!", date: "16 Oct 2024" },
      { id: "10", userName: "Simran Arora", rating: 4, comment: "Great nail salon with a wide variety of colors and designs. The spa pedicure was so relaxing. They really take their time to do it right. Will be coming back!", date: "10 Oct 2024" },
      { id: "11", userName: "Neha Gupta", rating: 5, comment: "Best nail salon experience! The attention to detail is impressive. Got beautiful nail art done for my wedding and received so many compliments. Highly recommend!", date: "3 Oct 2024" },
      { id: "12", userName: "Pooja Verma", rating: 4, comment: "Very professional service and hygienic salon. The classic manicure was perfect and the technician was very gentle. Good value for money!", date: "27 Sep 2024" },
    ],
  },
  {
    id: 4,
    name: "Radiance Makeup Studio",
    image: salon4,
    location: "Arts Quarter, Paris",
    price: "₹₹₹",
    services: ["Makeup", "Skincare", "Brows"],
    rating: 4.9,
    description: "Professional makeup studio for special events, weddings, and everyday glamour.",
    availableServices: [
      { id: 13, name: "Special Event Makeup", duration: "90 min", price: "₹1,060" },
      { id: 14, name: "Bridal Makeup", duration: "120 min", price: "₹1,700" },
      { id: 15, name: "Eyebrow Shaping", duration: "30 min", price: "₹300" },
      { id: 16, name: "Lash Extensions", duration: "90 min", price: "₹1,280" },
    ],
    reviews: [
      { id: "13", userName: "Ananya Joshi", rating: 5, comment: "They did my bridal makeup and I looked absolutely stunning! The makeup lasted the entire day and I felt so confident. The team is so professional and made me feel special. Worth every rupee!", date: "20 Oct 2024" },
      { id: "14", userName: "Shreya Malhotra", rating: 5, comment: "Best makeup studio ever! Got my lash extensions done and they look so natural yet glamorous. The technician was very careful and experienced. Highly recommend for any special occasion!", date: "14 Oct 2024" },
      { id: "15", userName: "Divya Pillai", rating: 5, comment: "Amazing work! I got my makeup done for a friend's wedding and everyone asked me who did it. The artist really understood what I wanted and enhanced my natural features beautifully.", date: "7 Oct 2024" },
      { id: "16", userName: "Kritika Bhatia", rating: 4, comment: "Very skilled makeup artists. The eyebrow shaping was perfect and the products they use are high quality. The studio is clean and well-maintained. Great experience overall!", date: "1 Oct 2024" },
    ],
  },
  {
    id: 5,
    name: "Urban Edge Barbershop",
    image: salon5,
    location: "Hillside, Los Angeles",
    price: "₹₹",
    services: ["Haircut", "Shave", "Beard Trim"],
    rating: 4.8,
    description: "Contemporary barbershop combining classic techniques with modern style.",
    availableServices: [
      { id: 17, name: "Haircut", duration: "45 min", price: "₹470" },
      { id: 18, name: "Hot Towel Shave", duration: "30 min", price: "₹380" },
      { id: 19, name: "Beard Trim & Shape", duration: "30 min", price: "₹300" },
      { id: 20, name: "Full Service", duration: "90 min", price: "₹810" },
    ],
    reviews: [
      { id: "17", userName: "Arjun Mehta", rating: 5, comment: "Best barbershop in town! The barbers really know their craft. Got the full service package and it was amazing - from the haircut to the hot towel shave. Felt like royalty!", date: "17 Oct 2024" },
      { id: "18", userName: "Vikram Singh", rating: 5, comment: "This place is a hidden gem! The beard trim was perfection and the barber gave great advice on maintaining it. Cool vibe and excellent service. My go-to place now!", date: "11 Oct 2024" },
      { id: "19", userName: "Karan Rao", rating: 4, comment: "Really good haircut and professional service. The barbers take their time and don't rush. The hot towel shave is a must-try - super relaxing. Will definitely return!", date: "4 Oct 2024" },
      { id: "20", userName: "Rohan Desai", rating: 5, comment: "Exceptional service! These guys are true professionals who care about their work. My haircut looks sharp and the fade is perfect. Great atmosphere too!", date: "29 Sep 2024" },
    ],
  },
  {
    id: 6,
    name: "Vintage Glam Salon",
    image: salon6,
    location: "Business District, Singapore",
    price: "₹₹₹",
    services: ["Styling", "Treatments", "Extensions"],
    rating: 4.7,
    description: "Boutique salon blending vintage charm with modern hair care expertise.",
    availableServices: [
      { id: 21, name: "Blow Dry & Style", duration: "45 min", price: "₹550" },
      { id: 22, name: "Keratin Treatment", duration: "180 min", price: "₹2,130" },
      { id: 23, name: "Hair Extensions", duration: "240 min", price: "₹3,400" },
      { id: 24, name: "Updo Styling", duration: "90 min", price: "₹810" },
    ],
    reviews: [
      { id: "21", userName: "Ishita Chatterjee", rating: 5, comment: "Got the keratin treatment and wow! My frizzy hair is now so smooth and manageable. The stylist was very knowledgeable and the results are incredible. Absolutely love this salon!", date: "19 Oct 2024" },
      { id: "22", userName: "Tanvi Kulkarni", rating: 4, comment: "Beautiful salon with vintage decor! The updo styling for my sister's wedding was gorgeous. The stylist was creative and made sure it stayed perfect all day. Great experience!", date: "13 Oct 2024" },
      { id: "23", userName: "Aisha Khan", rating: 5, comment: "Got hair extensions and they look so natural! The quality is excellent and the stylist was very patient explaining the care process. Super happy with the results!", date: "6 Oct 2024" },
      { id: "24", userName: "Nandini Roy", rating: 5, comment: "Love the vintage vibes here! The blow dry and style was perfect - added so much volume to my hair. The staff is friendly and skilled. Definitely my new favorite salon!", date: "25 Sep 2024" },
    ],
  },
];
