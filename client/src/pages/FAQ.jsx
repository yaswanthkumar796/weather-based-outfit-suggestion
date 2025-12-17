import React from 'react';

const FAQ = () => {
  const faqs = [
    {
      question: "What is WearToWeather?",
      answer: "WearToWeather is an AI-powered web app that helps you get inspired with outfit ideas for travel or daily use, based on the weather forecast at your destination. Use the suggestions as inspiration, or shop for exact pieces if you wish."
    },
    {
      question: "How does the outfit recommendation work?",
      answer: "WearToWeather uses AI to analyze weather data and your selected occasion to suggest practical and stylish outfit inspiration for any day—whether you are planning a trip or just deciding what to wear locally. The AI generates ideas tailored to your needs and the forecasted conditions, but you can always adapt or personalize them."
    },
    {
      question: "Can I use WearToWeather for any location?",
      answer: "Yes! You can enter any city worldwide. The app will fetch the weather forecast and generate outfit inspiration for your chosen destination."
    },
    {
      question: "Is WearToWeather free to use?",
      answer: "Yes, WearToWeather is completely free to use. There are no hidden fees or subscriptions required."
    },
    {
      question: "What occasions can I plan outfits for?",
      answer: "You can get outfit suggestions for a variety of occasions, including casual, business, outdoor activities, and more. Simply select the occasion when prompted."
    },
    {
      question: "How accurate are the weather forecasts?",
      answer: "WearToWeather uses reliable weather APIs to provide up-to-date forecasts. For dates far in the future, the app uses historical averages and estimates to help you plan ahead."
    },
    {
      question: "Can I customize my packing list?",
      answer: "WearToWeather offers daily outfit inspiration based on your trip details. You can use these ideas as a starting point for your own packing or wardrobe planning, and adjust them to fit your personal style and needs. If you want to recreate an exact look, you can shop for the suggested pieces via links in the app."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account is required. You can use all features of WearToWeather without signing up."
    },
    {
      question: "Is my location or data stored?",
      answer: "No personal data or location information is stored on our servers. All processing is done securely and privately."
    },
    {
      question: "Do you use affiliate links or earn commissions?",
      answer: "Some links or sections on this site may contain affiliate links. If you purchase through these links, we may earn a small commission at no extra cost to you. WearToWeather participates in affiliate programs, including Amazon Associates."
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
