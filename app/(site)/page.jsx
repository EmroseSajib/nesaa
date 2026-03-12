"use client";

import BrandStory from "@/components/BrandStory";
import WhyChooseUsSection from "@/components/ChooseUsSection";
import CustomerFeedback from "@/components/CustomerFeedback";
import DonationSection from "@/components/DonationSection";
import WholesaleOpportunities from "@/components/WholesaleOpportunities ";
import { useState } from "react";
import Banner from "../../components/Banner";
import CategoriesSection from "../../components/Categories";
import Feature from "../../components/Feature";
import { useLanguage } from "../LanguageContext";

export default function Home() {
  const { t } = useLanguage();
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <div className="w-full">
      <Banner />
      <WhyChooseUsSection />
      <Feature />
      <CategoriesSection />
      <BrandStory />
      {/* Featured Products Section */}

      {/* Testimonials Section */}
      <CustomerFeedback />
      <DonationSection />
      {/* CTA Section */}
      <WholesaleOpportunities />
    </div>
  );
}
