import image1 from "@/public/images/user/user-01.png";
import image2 from "@/public/images/user/user-02.png";
import { Testimonial } from "@/types/testimonial";

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Akhona Dlamini",
    designation: "User @Hayami",
    image: image1,
    content:
      "Hayami has transformed how I find skilled professionals. The platform is user-friendly and incredibly efficient for my everyday needs.",
  },
  {
    id: 2,
    name: "Lebo Nkosi",
    designation: "Business Owner @Hayami",
    image: image2,
    content:
      "Thanks to Hayami, connecting with local clients has never been easier. It has boosted my business significantly.",
  },
  {
    id: 3,
    name: "Sipho Mthembu",
    designation: "User @Hayami",
    image: image1,
    content:
      "I appreciate how quick and reliable Hayami is. I’ve found exactly what I needed within minutes, every time.",
  },
  {
    id: 4,
    name: "Thandiwe Zulu",
    designation: "Freelancer @Hayami",
    image: image2,
    content:
      "Hayami has been a game-changer for my freelance work. The platform connects me with clients I wouldn’t have reached otherwise.",
  },
];
