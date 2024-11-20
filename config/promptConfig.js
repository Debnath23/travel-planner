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
        {text: "Generate Travel Plan for Location: Dubai - United Arab Emirates, for 6 Days and 5 Night for Just Me with a Luxury budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for 6 days and 5 night with each day plan with best time to visit in JSON format."},
      ],
    },
    {
      role: "model",
      parts: [
        {text: "I cannot access real-time information, including live flight prices, hotel availability, and dynamically updated images.  Therefore, I cannot provide the booking URLs, current prices, and real-time image URLs requested.  This response provides a structured JSON template with placeholder values. You will need to use online travel agencies (like Expedia, Booking.com, Kayak, etc.) and Google Maps to fill in the missing data.\n\n```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Dubai, United Arab Emirates\",\n    \"duration\": \"6 Days / 5 Nights\",\n    \"travelerCount\": 1,\n    \"budget\": \"Luxury\",\n    \"bestTimetoVisit\": \"October to April (avoid summer heat)\"\n  },\n  \"flightDetails\": {\n    \"airline\": \"Placeholder Airline\",\n    \"flightNumber\": \"Placeholder Flight Number\",\n    \"departureCity\": \"Placeholder Departure City\",\n    \"arrivalCity\": \"Dubai (DXB)\",\n    \"departureDate\": \"YYYY-MM-DD\",\n    \"returnDate\": \"YYYY-MM-DD\",\n    \"price\": \"Placeholder Price (USD)\",\n    \"bookingUrl\": \"Placeholder Booking URL\" \n  },\n  \"hotelOptions\": [\n    {\n      \"hotelName\": \"Burj Al Arab Jumeirah\",\n      \"address\": \"Jumeirah, Dubai, United Arab Emirates\",\n      \"pricePerNight\": \"Placeholder Price (USD)\",\n      \"imageUrl\": \"Placeholder Image URL\",\n      \"geoCoordinates\": {\n        \"latitude\": 25.2108,\n        \"longitude\": 55.2712\n      },\n      \"rating\": \"5.0\",\n      \"description\": \"Iconic sail-shaped luxury hotel.\",\n      \"nearbyPlaces\": [\n        {\n          \"placeName\": \"Jumeirah Beach\",\n          \"placeDetails\": \"Beautiful beach with clear waters.\",\n          \"imageUrl\": \"Placeholder Image URL\",\n          \"geoCoordinates\": { \"latitude\": 25.2139, \"longitude\": 55.2801 },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"10 minutes\"\n        }\n      ]\n    },\n    {\n      \"hotelName\": \"Armani Hotel Dubai\",\n      \"address\": \"Burj Khalifa, Downtown Dubai, Dubai, United Arab Emirates\",\n      \"pricePerNight\": \"Placeholder Price (USD)\",\n      \"imageUrl\": \"Placeholder Image URL\",\n      \"geoCoordinates\": {\n        \"latitude\": 25.1972,\n        \"longitude\": 55.2744\n      },\n      \"rating\": \"4.8\",\n      \"description\": \"Luxury hotel within the Burj Khalifa.\",\n      \"nearbyPlaces\": [\n        {\n          \"placeName\": \"Burj Khalifa\",\n          \"placeDetails\": \"Tallest building in the world.\",\n          \"imageUrl\": \"Placeholder Image URL\",\n          \"geoCoordinates\": { \"latitude\": 25.1972, \"longitude\": 55.2744 },\n          \"ticketPricing\": \"Placeholder Price (USD)\",\n          \"travelTime\": \"5 minutes\"\n        },\n        {\n          \"placeName\": \"Dubai Mall\",\n          \"placeDetails\": \"One of the largest shopping malls in the world.\",\n          \"imageUrl\": \"Placeholder Image URL\",\n          \"geoCoordinates\": { \"latitude\": 25.1971, \"longitude\": 55.2733 },\n          \"ticketPricing\": \"Free\",\n          \"travelTime\": \"5 minutes\"\n        }\n      ]\n    }\n    // Add more hotel options here\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"date\": \"YYYY-MM-DD\",\n      \"activities\": [\n        {\"time\": \"14:00\", \"description\": \"Arrive at DXB, transfer to hotel, check-in\"},\n        {\"time\": \"16:00\", \"description\": \"Relax by the pool or enjoy hotel amenities\"},\n        {\"time\": \"19:00\", \"description\": \"Dinner at a luxury restaurant\"}\n      ]\n    },\n    \"day2\": {\n      \"date\": \"YYYY-MM-DD\",\n      \"activities\": [\n        {\"time\": \"09:00\", \"description\": \"Visit Burj Khalifa and Dubai Mall\"},\n        {\"time\": \"13:00\", \"description\": \"Lunch at Dubai Mall\"},\n        {\"time\": \"15:00\", \"description\": \"Explore Downtown Dubai\"},\n        {\"time\": \"19:00\", \"description\": \"Dinner cruise on Dubai Creek\"}\n      ]\n    },\n    // Add Day 3-6 activities similarly.  Include visits to:\n    // - Desert Safari\n    // - Palm Jumeirah\n    // - Old Dubai (Al Fahidi Historical Neighbourhood, spice souk, gold souk)\n    // -  Museum of the Future\n    // - Global Village (seasonal)\n  }\n}\n```\n\nRemember to replace the placeholder values with actual data from your research.  Enjoy your luxury trip to Dubai!\n"},
      ],
    },
  ],
});
