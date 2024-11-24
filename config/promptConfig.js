import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {text: "Generate Travel Plan for Location: Dubai - United Arab Emirates, for 6 Days and 5 Night from 23 Nov 2024 to 28 Nov 2024, for Just Me with a Luxury budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 6 days and 5 night with each day plan with best time to visit in JSON format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I cannot provide real-time flight and hotel pricing, availability, booking URLs, or dynamically generated images.  These data points are constantly changing and require access to live booking systems and APIs which I do not have.  However, I can give you a structured JSON template that you can populate with information gathered from travel websites like Expedia, Kayak, Booking.com, etc.\n\n\n```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Dubai, United Arab Emirates\",\n    \"travelerCount\": 1,\n    \"startDate\": \"2024-11-23\",\n    \"endDate\": \"2024-11-28\",\n    \"budget\": \"Luxury\"\n  },\n  \"flights\": [\n    {\n      \"airline\": \"Emirates\",  //Example - replace with your actual flight details\n      \"flightNumber\": \"EK245\", //Example\n      \"departureAirport\": \"JFK\", //Example\n      \"arrivalAirport\": \"DXB\",\n      \"departureDate\": \"2024-11-23\",\n      \"arrivalDate\": \"2024-11-24\",\n      \"price\": \"1500\", //Example price - replace with actual price obtained from booking website\n      \"bookingUrl\": \"https://www.example-booking-site.com/flight-details\" // Replace with actual booking URL\n    },\n    {\n      \"airline\": \"Emirates\", //Example - replace with your actual flight details\n      \"flightNumber\": \"EK246\", //Example\n      \"departureAirport\": \"DXB\",\n      \"arrivalAirport\": \"JFK\", //Example\n      \"departureDate\": \"2024-11-28\",\n      \"arrivalDate\": \"2024-11-29\",\n      \"price\": \"1600\", //Example price - replace with actual price obtained from booking website\n      \"bookingUrl\": \"https://www.example-booking-site.com/flight-details\" // Replace with actual booking URL\n    }\n  ],\n  \"hotels\": [\n    {\n      \"hotelName\": \"Burj Al Arab Jumeirah\",\n      \"address\": \"Jumeirah, Dubai, United Arab Emirates\",\n      \"pricePerNight\": 2000, //Example - Replace with actual price\n      \"imageUrl\": \"https://example.com/burjalarab.jpg\", // Replace with actual image URL\n      \"geoCoordinates\": { \"latitude\": 25.2143, \"longitude\": 55.2708 },\n      \"rating\": 4.8,\n      \"description\": \"Iconic sail-shaped hotel offering luxury amenities and stunning views.\",\n      \"nearbyPlaces\": [\n        {\n          \"placeName\": \"Jumeirah Beach\",\n          \"placeDetails\": \"Beautiful beach with calm waters.\",\n          \"imageUrl\": \"https://example.com/jumeirahbeach.jpg\", // Replace with actual image URL\n          \"geoCoordinates\": { \"latitude\": 25.2115, \"longitude\": 55.2712 },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"10 minutes\"\n        }\n      ]\n    }\n    //Add more hotel options here...\n  ],\n  \"dailyItinerary\": [\n    {\n      \"day\": 1,\n      \"date\": \"2024-11-23\",\n      \"activities\": [\n        {\n          \"time\": \"Afternoon\",\n          \"activity\": \"Arrive at DXB, transfer to Burj Al Arab Jumeirah, check in, relax by the beach\"\n        }\n      ]\n    },\n    {\n      \"day\": 2,\n      \"date\": \"2024-11-24\",\n      \"activities\": [\n        {\"time\": \"Morning\", \"activity\": \"Visit Burj Khalifa\"},\n        {\"time\": \"Afternoon\", \"activity\": \"Explore Dubai Mall\"}\n      ]\n    },\n    {\n      \"day\": 3,\n      \"date\": \"2024-11-25\",\n      \"activities\": [\n        {\"time\": \"Morning\", \"activity\": \"Desert Safari\"},\n        {\"time\": \"Evening\", \"activity\": \"Dinner at Al Hadheerah\"}\n      ]\n    },\n     {\n      \"day\": 4,\n      \"date\": \"2024-11-26\",\n      \"activities\": [\n        {\"time\": \"Morning\", \"activity\": \"Visit the Palm Jumeirah\"},\n        {\"time\": \"Afternoon\", \"activity\": \"Explore Atlantis, The Palm\"}\n      ]\n    },\n    {\n      \"day\": 5,\n      \"date\": \"2024-11-27\",\n      \"activities\": [\n        {\"time\": \"Morning\", \"activity\": \"Old Dubai exploration (Al Fahidi, spice souk, gold souk)\"},\n        {\"time\": \"Afternoon\", \"activity\": \"Abra ride across Dubai Creek\"}\n      ]\n    },\n    {\n      \"day\": 6,\n      \"date\": \"2024-11-28\",\n      \"activities\": [\n        {\"time\": \"Morning\", \"activity\": \"Departure from DXB\"}\n      ]\n    }\n  ]\n}\n```\n\nRemember to replace the example data with your actual findings from travel booking sites.  You will need to research specific locations, obtain pricing, and find images to complete the JSON.  Use a web browser to copy and paste the  Geo coordinates to google maps to check the location.  Also note that travel times are estimates and can vary depending on traffic.\n"},
      ],
    },
  ],
});