"use client";
import React from "react";
import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "@/components/Charts/ChartOne";
import ChartTwo from "@/components/Charts/ChartTwo";
import ChartThree from "@/components/Charts/ChartThree";
import TableOne from "@/components/Tables/TableOne";
import MapOne from "@/components/Maps/MapOne";
import ChatCard from "../Chat/ChatCard";
import ProfileCard from "@/components/ProfileCard/ProfileCard"; // Profile Management Component
import ServiceManagement from "@/components/ServiceManagement/ServiceManagement"; // Service Management Component
import AvailabilityManagement from "@/components/AvailabilityManagement/AvailabilityManagement"; // Availability Management Component
import AppointmentsManagement from "@/components/AppointmentsManagement/AppointmentsManagement"; // Appointments Management Component

const ECommerce: React.FC = () => {
  return (
    <>
      {/* Add padding to prevent content from hiding behind navbar */}
      <div className="pt-20"> {/* Adjust pt-20 based on your navbar height */}
        
        {/* Data Stats */}
        <DataStatsOne />

        {/* Profile Management Section */}
        <section className="mt-6">
          <ProfileCard />
        </section>

        {/* Service Management Section */}
        <section className="mt-6">
          <ServiceManagement />
        </section>

        {/* Availability Management Section */}
        <section className="mt-6">
          <AvailabilityManagement />
        </section>

        {/* Appointments Management Section */}
        <section className="mt-6">
          <AppointmentsManagement />
        </section>

        {/* Dashboard Stats & Charts */}
        {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
          <ChartOne />
          <ChartTwo />
          <ChartThree />
          <MapOne />
          <div className="col-span-12 xl:col-span-8">
            <TableOne />
          </div>
          <ChatCard />
        </div> */}
      </div>
    </>
  );
};

export default ECommerce;
