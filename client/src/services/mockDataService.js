// Mock data service for offline development
const mockMovies = [
  // English Movies
  {
    _id: '1',
    title: 'Avatar: The Way of Water',
    genre: ['Action', 'Adventure', 'Sci-Fi'],
    language: 'english',
    duration: 192,
    rating: 7.6,
    releaseDate: '2022-12-16',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg',
    backdrop: 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg',
    description: 'Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.',
    director: 'James Cameron',
    cast: ['Sam Worthington', 'Zoe Saldana', 'Sigourney Weaver'],
    status: 'now_showing',
    is3D: true
  },
  {
    _id: '2',
    title: 'Top Gun: Maverick',
    genre: ['Action', 'Drama'],
    language: 'english',
    duration: 130,
    rating: 8.3,
    releaseDate: '2022-05-27',
    poster: 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg',
    description: 'After thirty years, Maverick is still pushing the envelope as a top naval aviator.',
    director: 'Joseph Kosinski',
    cast: ['Tom Cruise', 'Jennifer Connelly', 'Miles Teller'],
    status: 'now_showing'
  },
  // Hindi Movies
  {
    _id: '3',
    title: 'Pathaan',
    genre: ['Action', 'Thriller'],
    language: 'hindi',
    duration: 146,
    rating: 6.0,
    releaseDate: '2023-01-25',
    poster: 'https://m.media-amazon.com/images/M/MV5BM2QzM2JiNTMtNjU5ZS00N2ZmLWJlMDUtMzcxYjk3MjBhOTVjXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    description: 'An exiled RAW agent partners with a Pakistani agent to take down a common enemy.',
    director: 'Siddharth Anand',
    cast: ['Shah Rukh Khan', 'Deepika Padukone', 'John Abraham'],
    status: 'now_showing'
  },
  {
    _id: '4',
    title: 'Jawan',
    genre: ['Action', 'Crime', 'Thriller'],
    language: 'hindi',
    duration: 169,
    rating: 7.0,
    releaseDate: '2023-09-07',
    poster: 'https://m.media-amazon.com/images/M/MV5BYTBiMDdlYjktYzc3MS00MzY0LWJmMzMtMGE4NzA2ZGQ3ZWI2XkEyXkFqcGdeQXVyMTUzNTgzNzM0._V1_SX300.jpg',
    description: 'A high-octane action thriller which outlines the emotional journey of a man.',
    director: 'Atlee',
    cast: ['Shah Rukh Khan', 'Nayanthara', 'Vijay Sethupathi'],
    status: 'now_showing'
  },
  // Telugu Movies
  {
    _id: '5',
    title: 'RRR',
    genre: ['Action', 'Drama'],
    language: 'telugu',
    duration: 187,
    rating: 7.9,
    releaseDate: '2022-03-25',
    poster: 'https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg',
    description: 'A fictitious story about two legendary revolutionaries and their journey away from home.',
    director: 'S.S. Rajamouli',
    cast: ['N.T. Rama Rao Jr.', 'Ram Charan', 'Alia Bhatt'],
    status: 'now_showing'
  },
  {
    _id: '6',
    title: 'Pushpa: The Rise',
    genre: ['Action', 'Crime', 'Drama'],
    language: 'telugu',
    duration: 179,
    rating: 7.6,
    releaseDate: '2021-12-17',
    poster: 'https://m.media-amazon.com/images/M/MV5BNGZlNTFlOWMtMzUwNC00ZDdhLWI4Y2UtYTY2ZDhmMGQ0OTc1XkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg',
    description: 'A laborer named Pushpa makes enemies as he rises in the world of red sandalwood smuggling.',
    director: 'Sukumar',
    cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil'],
    status: 'now_showing'
  },
  // Tamil Movies
  {
    _id: '7',
    title: 'Vikram',
    genre: ['Action', 'Crime', 'Thriller'],
    language: 'tamil',
    duration: 174,
    rating: 8.2,
    releaseDate: '2022-06-03',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg',
    description: 'Members of a black ops team must track and eliminate a gang of masked murderers.',
    director: 'Lokesh Kanagaraj',
    cast: ['Kamal Haasan', 'Vijay Sethupathi', 'Fahadh Faasil'],
    status: 'now_showing'
  },
  {
    _id: '8',
    title: 'Beast',
    genre: ['Action', 'Comedy', 'Thriller'],
    language: 'tamil',
    duration: 155,
    rating: 5.7,
    releaseDate: '2022-04-13',
    poster: 'https://m.media-amazon.com/images/M/MV5BNjY0MGEzZmQtZWMxNi00MWVhLWI4NWEtYjU1ZDk2NzQwZGZlXkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg',
    description: 'A RAW agent is in search of his captured team and the mysterious terrorist group.',
    director: 'Nelson Dilipkumar',
    cast: ['Vijay', 'Pooja Hegde', 'Selvaraghavan'],
    status: 'now_showing'
  },
  // Kannada Movies
  {
    _id: '9',
    title: 'KGF Chapter 2',
    genre: ['Action', 'Crime', 'Drama'],
    language: 'kannada',
    duration: 168,
    rating: 8.2,
    releaseDate: '2022-04-14',
    poster: 'https://m.media-amazon.com/images/M/MV5BZGNhNDU2NWEtYWY5OS00MzNkLWJiNWMtNzU4MDIwMTY4MmM2XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg',
    description: 'In the blood-soaked Kolar Gold Fields, Rocky\'s name strikes fear into his foes.',
    director: 'Prashanth Neel',
    cast: ['Yash', 'Sanjay Dutt', 'Raveena Tandon'],
    status: 'now_showing'
  },
  {
    _id: '10',
    title: 'Kantara',
    genre: ['Action', 'Drama', 'Thriller'],
    language: 'kannada',
    duration: 148,
    rating: 8.2,
    releaseDate: '2022-09-30',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg',
    description: 'It involves culture of Kambla and Bhootha Kola along with the story of a rebel.',
    director: 'Rishab Shetty',
    cast: ['Rishab Shetty', 'Sapthami Gowda', 'Kishore'],
    status: 'now_showing'
  },
  // Malayalam Movies
  {
    _id: '11',
    title: 'Minnal Murali',
    genre: ['Action', 'Comedy', 'Drama'],
    language: 'malayalam',
    duration: 158,
    rating: 7.8,
    releaseDate: '2021-12-24',
    poster: 'https://m.media-amazon.com/images/M/MV5BZmI5MWY0NjgtYjM3MS00ODlhLTllOTQtZjVmMjg2NjgxODBjXkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg',
    description: 'A tailor gains special powers after being struck by lightning.',
    director: 'Basil Joseph',
    cast: ['Tovino Thomas', 'Guru Somasundaram', 'Harisree Ashokan'],
    status: 'now_showing'
  },
  {
    _id: '12',
    title: 'Drishyam 2',
    genre: ['Crime', 'Drama', 'Thriller'],
    language: 'malayalam',
    duration: 152,
    rating: 8.4,
    releaseDate: '2021-02-19',
    poster: 'https://m.media-amazon.com/images/M/MV5BYjY2YWNlNzktYzNlOS00ZmVhLWJhNjMtOTU2OTgxN2JmN2Y4XkEyXkFqcGdeQXVyMTI1NDAzMzM0._V1_SX300.jpg',
    description: 'Georgekutty lives a happy life with his wife and daughters.',
    director: 'Jeethu Joseph',
    cast: ['Mohanlal', 'Meena', 'Ansiba Hassan'],
    status: 'now_showing'
  }
];

const mockTheaters = [
  {
    _id: 'theater1',
    name: 'PVR Cinemas',
    address: {
      street: '123 Mall Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001'
    },
    amenities: ['IMAX', 'Dolby Atmos', 'Recliner Seats'],
    shows: [
      {
        _id: 'show1',
        movie: { _id: '1', title: 'Avatar: The Way of Water' },
        showTime: new Date('2024-02-03T14:30:00'),
        screen: 1,
        basePrice: 200,
        availableSeats: 150
      }
    ]
  },
  {
    _id: 'theater2',
    name: 'INOX',
    address: {
      street: '456 City Center',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001'
    },
    amenities: ['4DX', 'Premium Seats', 'Food Court'],
    shows: [
      {
        _id: 'show2',
        movie: { _id: '2', title: 'Top Gun: Maverick' },
        showTime: new Date('2024-02-03T18:00:00'),
        screen: 2,
        basePrice: 180,
        availableSeats: 120
      }
    ]
  }
];

// API functions
export const getMovies = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMovies;
};

export const getMovieById = async (id) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMovies.find(movie => movie._id === id);
};

export const getTheaters = async () => {
  await new Promise(resolve => setTimeout(resolve, 400));
  return mockTheaters;
};

export const getMoviesByLanguage = async (language) => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMovies.filter(movie => movie.language === language);
};