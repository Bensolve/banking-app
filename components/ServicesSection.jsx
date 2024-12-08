// components/ServicesSection.jsx
'use client';

const services = [
  {
    title: 'Savings Accounts',
    description: 'Grow your wealth with our high-yield savings accounts tailored for you.',
  },
  {
    title: 'Loans',
    description: 'Get the financial support you need with competitive interest rates.',
  },
  {
    title: 'Cards',
    description: 'Secure and flexible debit and credit card options for your daily needs.',
  },
];

const ServicesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="p-6 bg-white shadow-lg rounded-lg">
              <h3 className="text-xl font-medium text-gray-700 mb-3">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
