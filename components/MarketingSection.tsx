'use client';

import React from 'react';
import Image from 'next/image';

interface MarketingCardProps {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const MarketingCard: React.FC<MarketingCardProps> = ({ imageSrc, title, description, linkText, linkHref }) => {
  return (
    <div className="ps-marketing-small-promo-item bg-white rounded-lg shadow-md p-6">
      <div className="ps-marketing-icon-container mb-4">
        <Image src={imageSrc} alt={title} width={64} height={64} className="ps-marketing-icon" />
      </div>
      <div className="ps-marketing-text">
        <h2 className="text-lg font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <a href={linkHref} className="text-indigo-600 font-medium hover:underline">
          {linkText}
        </a>
      </div>
    </div>
  );
};

const MarketingSection: React.FC = () => {
  const marketingData = [
    {
      imageSrc: "/icons/mortgage-icon.png",
      title: "Find mortgage happiness",
      description: "With a down payment as low as 3%",
      linkText: "Learn more",
      linkHref: "/mortgage/buying-a-house",
    },
    {
      imageSrc: "/icons/checking-icon.png",
      title: "Unlock convenient checking",
      description: "Discover the benefits of our checking accounts and choose the right one for you.",
      linkText: "Get started",
      linkHref: "/checking",
    },
    {
      imageSrc: "/icons/credit-card-icon.png",
      title: "Find a credit card",
      description: "Low intro rate, cash back, rewards and more",
      linkText: "Learn more",
      linkHref: "/credit-cards",
    },
    {
      imageSrc: "/icons/rates-icon.png",
      title: "Interest rates today",
      description: "Check rates for mortgages, savings, loans, and more.",
      linkText: "Check rates",
      linkHref: "/help/rates",
    },
  ];

  return (
    <section className="ps-marketing-small-promo-items grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-16">
      {marketingData.map((item, index) => (
        <MarketingCard
          key={index}
          imageSrc={item.imageSrc}
          title={item.title}
          description={item.description}
          linkText={item.linkText}
          linkHref={item.linkHref}
        />
      ))}
    </section>
  );
};

export default MarketingSection;