import { Metadata } from "next";
import ECommerce from "@/components/Dashboard/E-commerce";

export const metadata: Metadata = {
  title: "Hayami - Dashboard",
  description: "Get Insights & Manage your profile",
  // other metadata
};

export default function Dashboard() {
  return (
    <>
      <ECommerce />
    </>
  );
}
