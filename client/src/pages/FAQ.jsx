import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "What is WearToWeather?",
      answer: "WearToWeather is a smart web app that suggests outfit ideas tailored to your local weather. It analyzes the forecast—temperature, season, and conditions—to recommend the perfect look from our curated collection."
    },
    {
      question: "How does the recommendation work?",
      answer: "We use validated weather data to identify the current season and conditions. Our system then searches a hand-picked database of outfits to find matches that are practical for the weather and stylish for your selected category (Casual, Formal, etc.)."
    },
    {
      question: "Is WearToWeather free to use?",
      answer: "Yes, it is completely free. There are no subscriptions, hidden fees, or accounts required to access all features."
    },
    {
      question: "Do I need to create an account?",
      answer: "No. You can start planning your outfits immediately without signing up or logging in."
    },
    {
      question: "Is my location data stored?",
      answer: "We value your privacy. Your location is used strictly to fetch the realtime weather forecast and is not permanently stored or tracked on our servers."
    },
    {
      question: "Can I filter by gender?",
      answer: "Yes! You can toggle between Male and Female outfit suggestions in the settings to find styles that suit you best."
    },
    {
      question: "Where does the weather data come from?",
      answer: "We utilize authorized weather APIs (like OpenWeatherMap) to ensure the temperature and forecast details are accurate and up-to-date."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Frequently Asked Questions</h1>
        <p className="text-xl opacity-80">
          For more details or to start planning your outfits, visit the <span className="font-bold">WearToWeather</span> app.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 md:p-8 hover:bg-white/10 transition duration-300">
            <h3 className="text-xl font-bold mb-3">{faq.question}</h3>
            <p className="opacity-75 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
