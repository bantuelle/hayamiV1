import Onboarding from "@/components/Onboarding";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hayami - Onboarding",
  description: "Getting on board as a service provider",
  // other metadata
};

export default function OnboardingPage() {
  return (
    <>
      <Onboarding />
    </>
  );
}
