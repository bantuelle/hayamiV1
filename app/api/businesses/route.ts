import { NextRequest } from 'next/server';

const businesses = {
    "Furniture Moving": [
      {
        name: "Best Movers",
        description: "Reliable furniture moving service",
        rating: 4.5,
        location: "Johannesburg, South Africa",
        tel: "+234 803 123 4567",
        image: "/images/movers1.jpg",
      },
      {
        name: "Speedy Movers",
        description: "Fast and affordable moving",
        rating: 4.2,
        location: "Durban, South Africa",
        tel: "+234 802 987 6543",
        image: "/images/movers2.jpg",
      },
    ],
    Housekeeping: [
      {
        name: "Clean House Co.",
        description: "Expert housekeeping services",
        rating: 4.7,
        location: "Sandton, Johannesburg",
        tel: "+234 701 555 1234",
        image: "/images/housekeeping1.jpg",
      },
      {
        name: "Sparkle Maid Service",
        description: "Top-notch cleaning services",
        rating: 4.9,
        location: "Lonehill, Johannesburg",
        tel: "+234 705 888 7777",
        image: "/images/housekeeping2.jpg",
      },
    ],
    Plumbing: [
      {
        name: "PipeFix Pro",
        description: "24/7 emergency plumbing repairs",
        rating: 4.8,
        location: "Randpark, Johannesburg",
        tel: "+234 803 123 0000",
        image: "/images/plumbing1.jpg",
      },
      {
        name: "FlowRite Plumbers",
        description: "Certified and trusted plumbers",
        rating: 4.4,
        location: "Randburg, Johannesburg",
        tel: "+234 802 222 9999",
        image: "/images/plumbing2.jpg",
      },
    ],
    Electrician: [
      {
        name: "Wired Up NG",
        description: "Licensed electricians for home & office",
        rating: 4.6,
        location: "Steyn City, Johannesburg",
        tel: "+234 703 888 4444",
        image: "/images/electrician1.jpg",
      },
      {
        name: "Spark Electric",
        description: "Fast electrical repairs and installation",
        rating: 4.3,
        location: "Bryanston, Johannesburg",
        tel: "+234 704 444 3333",
        image: "/images/electrician2.jpg",
      },
    ],
    Painting: [
      {
        name: "Color Splash",
        description: "Interior and exterior painting pros",
        rating: 4.5,
        location: "Ferndale, Johannesburg",
        tel: "+234 706 000 1122",
        image: "/images/painting1.jpg",
      },
      {
        name: "Master Painters",
        description: "Affordable, high-quality painting",
        rating: 4.7,
        location: "Midrand, Johannesburg",
        tel: "+234 701 888 9900",
        image: "/images/painting2.jpg",
      },
    ],
    Cleaning: [
      {
        name: "Eco Clean Services",
        description: "Eco-friendly cleaning for homes and offices",
        rating: 4.6,
        location: "Berea, Johannesburg",
        tel: "+234 708 444 5566",
        image: "/images/cleaning1.jpg",
      },
      {
        name: "Shiny Touch",
        description: "Deep cleaning and sanitization experts",
        rating: 4.8,
        location: "Randburg, Johannesburg",
        tel: "+234 703 333 1122",
        image: "/images/cleaning2.jpg",
      },
    ],
    ACRepair: [
      {
        name: "CoolFix Tech",
        description: "Professional AC installation and repair",
        rating: 4.7,
        location: "Midrand, Johannesburg",
        tel: "+234 802 666 7788",
        image: "/images/ac1.jpg",
      },
      {
        name: "Chill Air Experts",
        description: "Certified HVAC specialists",
        rating: 4.9,
        location: "Centurion, Johannesburg",
        tel: "+234 807 999 0001",
        image: "/images/ac2.jpg",
      },
    ],
    Carpentry: [
      {
        name: "WoodCraft NG",
        description: "Custom furniture and wood repairs",
        rating: 4.5,
        location: "Pinetown, Durban",
        tel: "+234 806 112 3344",
        image: "/images/carpentry1.jpg",
      },
      {
        name: "FixIt Carpentry",
        description: "Professional carpentry on demand",
        rating: 4.6,
        location: "Umhlanga, Durban",
        tel: "+234 809 221 8877",
        image: "/images/carpentry2.jpg",
      },
    ],
    Laundry: [
      {
        name: "Fresh Laundry",
        description: "Pick-up and delivery laundry service",
        rating: 4.8,
        location: "Durban North, Durban",
        tel: "+234 808 554 7788",
        image: "/images/laundry1.jpg",
      },
      {
        name: "SpeedWash NG",
        description: "Same-day dry cleaning available",
        rating: 4.3,
        location: "Balitto, Durban",
        tel: "+234 807 665 3322",
        image: "/images/laundry2.jpg",
      },
    ],
    TechSupport: [
      {
        name: "Tech Helpdesk NG",
        description: "IT and gadget repairs, setup & support",
        rating: 4.9,
        location: "Westtown, Johannesburg",
        tel: "+234 809 334 4455",
        image: "/images/tech1.jpg",
      },
      {
        name: "GadgetFix",
        description: "Laptop, phone, and TV repairs",
        rating: 4.5,
        location: "Constantia Kloof, Johannesburg",
        tel: "+234 703 778 9922",
        image: "/images/tech2.jpg",
      },
    ],
  };
  
  export default function handler(req, res) {
    const { service } = req.query;
  
    if (businesses[service]) {
      res.status(200).json(businesses[service]);
    } else {
      res.status(404).json({ error: "No businesses found for this service" });
    }
  }
  

export async function GET(request: NextRequest) {
  const service = request.nextUrl.searchParams.get('service');

  if (service && businesses[service]) {
    return Response.json(businesses[service]);
  } else {
    return new Response(JSON.stringify({ error: "No businesses found" }), {
      status: 404,
    });
  }
}
