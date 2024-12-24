import { Metadata } from "next";
import Homepage from "@/components/Homepage/index";

export const metadata: Metadata = {
  title: "Hayami - Dashboard",
  description: "Get Insights & Manage your profile",
  // other metadata
};

export default function Dashboard() {
  return (
    <>
      <Homepage />
    </>
  );
}
