export const TravelerOptions = [
  {
    id: 1,
    title: "Just Me",
    desc: "A solo traveler in exploration",
    people: "1 People",
    icon: require("@/assets/icons/airplane.png"),
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travels in tandem",
    people: "2 People",
    icon: require("@/assets/icons/kiss.png"),
  },
  {
    id: 3,
    title: "Family",
    desc: "Travel with your family",
    people: "3 to 5 People",
    icon: require("@/assets/icons/family.png"),
  },
  {
    id: 4,
    title: "Friends",
    desc: "A group of adventure lovers",
    people: "5 to 10 People",
    icon: require("@/assets/icons/friends.png"),
  },
];

export const budgetOptions = [
  {
    id: 1,
    title: "Badget",
    desc: "Stay conscious of cost",
    icon: require("@/assets/icons/low-cost.png"),
  },
  {
    id: 2,
    title: "Moderate",
    desc: "Keep cost on the average range",
    icon: require("@/assets/icons/travel.png"),
  },
  {
    id: 3,
    title: "Luxury",
    desc: "Dont worry about cost",
    icon: require("@/assets/icons/holiday-trip.png"),
  },
];

export const PROMPT =
  "Generate Travel Plan for Location: {location}, for {totalDays} Days and {totalNight} Night for {traveler} with a {budget} budget with a Flight details, Flight Price with Booking url, Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and Places to visit nearby with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {totalDays} days and {totalNight} night with each day plan with best time to visit in JSON format.";

export const userTrip = [
  {
    img: require("@/assets/images/img1.jpg"),
    tripDetails: {
      destination: "Dubai, United Arab Emirates",
      duration: "6 Days / 5 Nights",
      travelerCount: 1,
      budget: "Luxury",
      bestTimetoVisit: "October to April (avoid summer heat)",
    },
  },
  {
    img: require("@/assets/images/img2.jpg"),
    tripDetails: {
      destination: "New York, USA",
      duration: {
        days: 1,
        nights: 1,
      },
      budget: "Luxury",
      travelers: "Family",
    },
  },
  {
    img: require("@/assets/images/img3.jpg"),
    tripDetails: {
      destination: "Kolkata, West Bengal, India",
      duration: "3 Days, 2 Nights",
      budget: "Moderate",
      travelers: "Friends",
    },
  },
  {
    img: require("@/assets/images/img4.jpg"),
    tripDetails: {
      destination: "Derjiling, West Bengal, India",
      duration: "3 Days, 2 Nights",
      budget: "Moderate",
      travelers: "Friends",
    },
  },
];
