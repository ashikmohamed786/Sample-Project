// Mock data for development without MongoDB
const mockMovies = [
  {
    _id: "1",
    title: "Avengers: Endgame",
    description: "The epic conclusion to the Infinity Saga that became a defining moment in cinematic history.",
    genre: ["Action", "Adventure", "Drama"],
    language: "english",
    duration: 181,
    rating: 8.4,
    releaseDate: new Date('2019-04-26'),
    poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg",
    status: "now_showing",
    is3D: true,
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"]
  },
  {
    _id: "2",
    title: "RRR",
    description: "A fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.",
    genre: ["Action", "Drama"],
    language: "telugu",
    duration: 187,
    rating: 7.9,
    releaseDate: new Date('2022-03-25'),
    poster: "https://image.tmdb.org/t/p/w500/w7RDub7osuFVdoOp3rkzD4Nqxmw.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/8rpDcsfLJypbO6vREc0547VKqEv.jpg",
    status: "now_showing",
    is3D: false,
    director: "S.S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"]
  },
  {
    _id: "3",
    title: "Spider-Man: No Way Home",
    description: "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange.",
    genre: ["Action", "Adventure", "Fantasy"],
    language: "english",
    duration: 148,
    rating: 8.2,
    releaseDate: new Date('2021-12-17'),
    poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    status: "now_showing",
    is3D: true,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"]
  },
  {
    _id: "4",
    title: "KGF Chapter 2",
    description: "The blood-soaked land of Kolar Gold Fields (KGF) has a new overlord now - Rocky, whose name strikes fear in the heart of his foes.",
    genre: ["Action", "Drama"],
    language: "kannada",
    duration: 168,
    rating: 8.3,
    releaseDate: new Date('2022-04-14'),
    poster: "https://image.tmdb.org/t/p/w500/lP7dJpzjn0IcINAXoNaHVHv2G0E.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
    status: "now_showing",
    is3D: false,
    director: "Prashanth Neel",
    cast: ["Yash", "Sanjay Dutt", "Raveena Tandon", "Srinidhi Shetty"]
  },
  {
    _id: "5",
    title: "Dangal",
    description: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games.",
    genre: ["Biography", "Drama", "Sport"],
    language: "hindi",
    duration: 161,
    rating: 8.4,
    releaseDate: new Date('2016-12-23'),
    poster: "https://image.tmdb.org/t/p/w500/lP7dJpzjn0IcINAXoNaHVHv2G0E.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
    status: "now_showing",
    is3D: false,
    director: "Nitesh Tiwari",
    cast: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra", "Zaira Wasim"]
  },
  {
    _id: "6",
    title: "Vikram",
    description: "Members of a black ops team must track and eliminate a gang of masked murderers.",
    genre: ["Action", "Crime", "Thriller"],
    language: "tamil",
    duration: 174,
    rating: 8.2,
    releaseDate: new Date('2022-06-03'),
    poster: "https://image.tmdb.org/t/p/w500/lP7dJpzjn0IcINAXoNaHVHv2G0E.jpg",
    backdrop: "https://image.tmdb.org/t/p/w1280/wcKFYIiVDvRURrzglV9kGu7fpfY.jpg",
    status: "now_showing",
    is3D: false,
    director: "Lokesh Kanagaraj",
    cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil", "Narain"]
  }
];

const mockTheaters = [
  {
    _id: "theater1",
    name: "PVR Cinemas - Forum Mall",
    address: {
      street: "21, Hosur Road, Adugodi",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560030",
      country: "India"
    },
    amenities: ["3D", "Dolby Atmos", "Recliner Seats", "Food Court", "Parking"],
    rating: 4.2,
    shows: [
      {
        _id: "show1",
        movie: mockMovies[0],
        showTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        screen: "1",
        basePrice: 200,
        couplesSeatPrice: 400
      },
      {
        _id: "show2", 
        movie: mockMovies[1],
        showTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
        screen: "2",
        basePrice: 180,
        couplesSeatPrice: 360
      }
    ]
  },
  {
    _id: "theater2",
    name: "INOX - Garuda Mall",
    address: {
      street: "Magrath Road, Ashok Nagar",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560025",
      country: "India"
    },
    amenities: ["IMAX", "Premium Seats", "Food & Beverages", "Parking"],
    rating: 4.0,
    shows: [
      {
        _id: "show3",
        movie: mockMovies[2],
        showTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours from now
        screen: "1",
        basePrice: 250,
        couplesSeatPrice: 500
      }
    ]
  }
];

module.exports = { mockMovies, mockTheaters };