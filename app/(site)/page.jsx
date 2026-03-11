"use client";

import WhyChooseUsSection from "@/components/ChooseUsSection";
import CustomerFeedback from "@/components/CustomerFeedback";
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
      <CategoriesSection />
      {/* Featured Products Section */}
      <Feature />

      {/* Testimonials Section */}
      <CustomerFeedback />
      {/* CTA Section */}
   <WholesaleOpportunities/>
    </div>
  );
}
