// Mock data for development without MongoDB
const mockMovies = [
  // ENGLISH MOVIES
  {
    _id: "1",
    title: "Avengers: Endgame",
    description: "The epic conclusion to the Infinity Saga that became a defining moment in cinematic history.",
    genre: ["Action", "Adventure", "Drama"],
    language: "english",
    duration: 181,
    rating: 8.4,
    releaseDate: new Date('2019-04-26'),
    poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: true,
    director: "Anthony Russo, Joe Russo",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo", "Chris Hemsworth"]
  },
  {
    _id: "2",
    title: "Spider-Man: No Way Home",
    description: "Peter Parker's secret identity is revealed to the entire world. Desperate for help, Peter turns to Doctor Strange.",
    genre: ["Action", "Adventure", "Fantasy"],
    language: "english",
    duration: 148,
    rating: 8.2,
    releaseDate: new Date('2021-12-17'),
    poster: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: true,
    director: "Jon Watts",
    cast: ["Tom Holland", "Zendaya", "Benedict Cumberbatch", "Jacob Batalon"]
  },
  {
    _id: "3",
    title: "Top Gun: Maverick",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, training a new generation of pilots.",
    genre: ["Action", "Drama"],
    language: "english",
    duration: 131,
    rating: 8.3,
    releaseDate: new Date('2022-05-27'),
    poster: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: true,
    director: "Joseph Kosinski",
    cast: ["Tom Cruise", "Miles Teller", "Jennifer Connelly", "Jon Hamm"]
  },
  {
    _id: "4",
    title: "Avatar: The Way of Water",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora.",
    genre: ["Action", "Adventure", "Fantasy"],
    language: "english",
    duration: 192,
    rating: 7.6,
    releaseDate: new Date('2022-12-16'),
    poster: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: true,
    director: "James Cameron",
    cast: ["Sam Worthington", "Zoe Saldana", "Sigourney Weaver", "Stephen Lang"]
  },
  {
    _id: "5",
    title: "Black Panther: Wakanda Forever",
    description: "The people of Wakanda fight to protect their home from intervening world powers as they mourn the death of King T'Challa.",
    genre: ["Action", "Adventure", "Drama"],
    language: "english",
    duration: 161,
    rating: 6.7,
    releaseDate: new Date('2022-11-11'),
    poster: "https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNTM4NjIxNmEtYWE5NS00NDczLTkyNWQtYThhNmQyZGQzMjM0XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: true,
    director: "Ryan Coogler",
    cast: ["Letitia Wright", "Lupita Nyong'o", "Danai Gurira", "Winston Duke"]
  },

  // HINDI MOVIES
  {
    _id: "6",
    title: "Dangal",
    description: "Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games.",
    genre: ["Biography", "Drama", "Sport"],
    language: "hindi",
    duration: 161,
    rating: 8.4,
    releaseDate: new Date('2016-12-23'),
    poster: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMTQ4MzQzMzM2Nl5BMl5BanBnXkFtZTgwMTQ1NzU3MDI@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Nitesh Tiwari",
    cast: ["Aamir Khan", "Fatima Sana Shaikh", "Sanya Malhotra", "Zaira Wasim"]
  },
  {
    _id: "7",
    title: "3 Idiots",
    description: "Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend.",
    genre: ["Comedy", "Drama"],
    language: "hindi",
    duration: 170,
    rating: 8.4,
    releaseDate: new Date('2009-12-25'),
    poster: "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNTkyOGVjMGEtNmQzZi00NzFlLTlhOWQtODYyMDc2ZGJmYzFhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Rajkumar Hirani",
    cast: ["Aamir Khan", "R. Madhavan", "Sharman Joshi", "Kareena Kapoor"]
  },
  {
    _id: "8",
    title: "Zindagi Na Milegi Dobara",
    description: "Three friends decide to turn their fantasy vacation into reality after one of their friends gets engaged.",
    genre: ["Adventure", "Comedy", "Drama"],
    language: "hindi",
    duration: 155,
    rating: 8.2,
    releaseDate: new Date('2011-07-15'),
    poster: "https://m.media-amazon.com/images/M/MV5BNTc2NTEwNjkwNl5BMl5BanBnXkFtZTcwNzY2NTcxNg@@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNTc2NTEwNjkwNl5BMl5BanBnXkFtZTcwNzY2NTcxNg@@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Zoya Akhtar",
    cast: ["Hrithik Roshan", "Farhan Akhtar", "Abhay Deol", "Katrina Kaif"]
  },
  {
    _id: "9",
    title: "Gully Boy",
    description: "A coming-of-age story based on the lives of street rappers in Mumbai.",
    genre: ["Drama", "Music"],
    language: "hindi",
    duration: 153,
    rating: 7.9,
    releaseDate: new Date('2019-02-14'),
    poster: "https://m.media-amazon.com/images/M/MV5BMjQ4MjEwNDI3N15BMl5BanBnXkFtZTgwNzY4MDI5NzM@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMjQ4MjEwNDI3N15BMl5BanBnXkFtZTgwNzY4MDI5NzM@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Zoya Akhtar",
    cast: ["Ranveer Singh", "Alia Bhatt", "Siddhant Chaturvedi", "Kalki Koechlin"]
  },
  {
    _id: "10",
    title: "Taare Zameen Par",
    description: "An eight-year-old boy is thought to be a lazy trouble-maker, until the new art teacher has the patience to discover the real problem.",
    genre: ["Drama", "Family"],
    language: "hindi",
    duration: 165,
    rating: 8.4,
    releaseDate: new Date('2007-12-21'),
    poster: "https://m.media-amazon.com/images/M/MV5BMDhjZWViN2MtZjYxNy00MTE2LWJmMjItZmY0MTMyMzM4ZjU4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMDhjZWViN2MtZjYxNy00MTE2LWJmMjItZmY0MTMyMzM4ZjU4XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Aamir Khan",
    cast: ["Darsheel Safary", "Aamir Khan", "Tisca Chopra", "Vipin Sharma"]
  },

  // TELUGU MOVIES
  {
    _id: "11",
    title: "RRR",
    description: "A fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.",
    genre: ["Action", "Drama"],
    language: "telugu",
    duration: 187,
    rating: 7.9,
    releaseDate: new Date('2022-03-25'),
    poster: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BODUwNDNjYzctODUxNy00ZTA2LWIyYTEtMDc5Y2E5ZjBmNTMzXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "S.S. Rajamouli",
    cast: ["N.T. Rama Rao Jr.", "Ram Charan", "Alia Bhatt", "Ajay Devgn"]
  },
  {
    _id: "12",
    title: "Baahubali 2: The Conclusion",
    description: "When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events.",
    genre: ["Action", "Drama"],
    language: "telugu",
    duration: 167,
    rating: 8.2,
    releaseDate: new Date('2017-04-28'),
    poster: "https://m.media-amazon.com/images/M/MV5BYTMxMTQ1MjktNWQ1MS00YTU4LWE4NzgtOWNiMDIyNzE1NjY0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BYTMxMTQ1MjktNWQ1MS00YTU4LWE4NzgtOWNiMDIyNzE1NjY0XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: true,
    director: "S.S. Rajamouli",
    cast: ["Prabhas", "Rana Daggubati", "Anushka Shetty", "Tamannaah"]
  },
  {
    _id: "13",
    title: "Pushpa: The Rise",
    description: "A laborer named Pushpa makes enemies as he rises in the world of red sandalwood smuggling.",
    genre: ["Action", "Crime", "Drama"],
    language: "telugu",
    duration: 179,
    rating: 7.6,
    releaseDate: new Date('2021-12-17'),
    poster: "https://m.media-amazon.com/images/M/MV5BNGZlNTFlOWMtMzE3Yy00ZWMwLWEwYWYtYWVmODE1M2Y1NzU1XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNGZlNTFlOWMtMzE3Yy00ZWMwLWEwYWYtYWVmODE1M2Y1NzU1XkEyXkFqcGdeQXVyMTA3MDk2NDg2._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Sukumar",
    cast: ["Allu Arjun", "Rashmika Mandanna", "Fahadh Faasil", "Jagapathi Babu"]
  },
  {
    _id: "14",
    title: "Arjun Reddy",
    description: "A short-tempered house surgeon gets used to drugs and drinks when his girlfriend is forced to marry another person.",
    genre: ["Drama", "Romance"],
    language: "telugu",
    duration: 182,
    rating: 8.1,
    releaseDate: new Date('2017-08-25'),
    poster: "https://m.media-amazon.com/images/M/MV5BNzIwOTY0NDUxN15BMl5BanBnXkFtZTgwNjU2NjEyMzI@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNzIwOTY0NDUxN15BMl5BanBnXkFtZTgwNjU2NjEyMzI@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Sandeep Reddy Vanga",
    cast: ["Vijay Deverakonda", "Shalini Pandey", "Jia Sharma", "Sanjay Swaroop"]
  },
  {
    _id: "15",
    title: "Eega",
    description: "A murdered man is reincarnated as a housefly and seeks to avenge his death.",
    genre: ["Action", "Comedy", "Fantasy"],
    language: "telugu",
    duration: 134,
    rating: 7.7,
    releaseDate: new Date('2012-07-06'),
    poster: "https://m.media-amazon.com/images/M/MV5BMTYzNDE4NzkxNV5BMl5BanBnXkFtZTcwMTgwNTMzOA@@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMTYzNDE4NzkxNV5BMl5BanBnXkFtZTcwMTgwNTMzOA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "S.S. Rajamouli",
    cast: ["Nani", "Samantha Ruth Prabhu", "Sudeep", "Hamsa Nandini"]
  },

  // TAMIL MOVIES
  {
    _id: "16",
    title: "Vikram",
    description: "Members of a black ops team must track and eliminate a gang of masked murderers.",
    genre: ["Action", "Crime", "Thriller"],
    language: "tamil",
    duration: 174,
    rating: 8.2,
    releaseDate: new Date('2022-06-03'),
    poster: "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Lokesh Kanagaraj",
    cast: ["Kamal Haasan", "Vijay Sethupathi", "Fahadh Faasil", "Narain"]
  },
  {
    _id: "17",
    title: "2.0",
    description: "After mobiles start flying out of the hands of people in Chennai, Dr. Vaseegaran summons his trusted robot Chitti to ward off the bird-shaped supernatural powers.",
    genre: ["Action", "Sci-Fi", "Thriller"],
    language: "tamil",
    duration: 148,
    rating: 6.2,
    releaseDate: new Date('2018-11-29'),
    poster: "https://m.media-amazon.com/images/M/MV5BM2ZkMWNlNDMtY2Q3MS00M2UwLWI5YWUtYzQ3YmQ4MmI2OWJhXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BM2ZkMWNlNDMtY2Q3MS00M2UwLWI5YWUtYzQ3YmQ4MmI2OWJhXkEyXkFqcGdeQXVyMzgxODM4NjM@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: true,
    director: "S. Shankar",
    cast: ["Rajinikanth", "Akshay Kumar", "Amy Jackson", "Adil Hussain"]
  },
  {
    _id: "18",
    title: "Kaithi",
    description: "A recently released prisoner becomes involved in a chase with criminals, police, and terrorists after taking his ill daughter to the hospital.",
    genre: ["Action", "Crime", "Thriller"],
    language: "tamil",
    duration: 145,
    rating: 8.4,
    releaseDate: new Date('2019-10-25'),
    poster: "https://m.media-amazon.com/images/M/MV5BZjAzM2Y5ZjQtMjdkYS00Yjc3LWJjNjktNDgzYWJhYjVmYTE5XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BZjAzM2Y5ZjQtMjdkYS00Yjc3LWJjNjktNDgzYWJhYjVmYTE5XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Lokesh Kanagaraj",
    cast: ["Karthi", "Narain", "Ramana", "George Maryan"]
  },
  {
    _id: "19",
    title: "Super Deluxe",
    description: "An unfaithful newly-wed wife, an estranged father, a priest and an angry son suddenly find themselves in the most unexpected predicaments.",
    genre: ["Comedy", "Crime", "Drama"],
    language: "tamil",
    duration: 176,
    rating: 8.3,
    releaseDate: new Date('2019-03-29'),
    poster: "https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ0MC00MDlhLTlkZWUtMzU4Nzc4MjM3NzBiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ0MC00MDlhLTlkZWUtMzU4Nzc4MjM3NzBiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Thiagarajan Kumararaja",
    cast: ["Vijay Sethupathi", "Fahadh Faasil", "Samantha Akkineni", "Ramya Krishnan"]
  },
  {
    _id: "20",
    title: "Asuran",
    description: "A family from the underprivileged class is on the run after the teenage son kills a rich man from the upper caste.",
    genre: ["Action", "Drama"],
    language: "tamil",
    duration: 141,
    rating: 8.4,
    releaseDate: new Date('2019-10-04'),
    poster: "https://m.media-amazon.com/images/M/MV5BNGVkMDk5Y2MtM2I5Yi00NzJlLWJlYjYtMGZhYzg2NWNmYzNjXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNGVkMDk5Y2MtM2I5Yi00NzJlLWJlYjYtMGZhYzg2NWNmYzNjXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Vetrimaaran",
    cast: ["Dhanush", "Manju Warrier", "Prakash Raj", "Pasupathy"]
  },

  // KANNADA MOVIES
  {
    _id: "21",
    title: "KGF Chapter 2",
    description: "The blood-soaked land of Kolar Gold Fields (KGF) has a new overlord now - Rocky, whose name strikes fear in the heart of his foes.",
    genre: ["Action", "Drama"],
    language: "kannada",
    duration: 168,
    rating: 8.3,
    releaseDate: new Date('2022-04-14'),
    poster: "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Prashanth Neel",
    cast: ["Yash", "Sanjay Dutt", "Raveena Tandon", "Srinidhi Shetty"]
  },
  {
    _id: "22",
    title: "KGF Chapter 1",
    description: "In the 1970s, a fierce rebel rises against brutal oppression and becomes the symbol of hope to legions of downtrodden people.",
    genre: ["Action", "Drama"],
    language: "kannada",
    duration: 156,
    rating: 8.2,
    releaseDate: new Date('2018-12-21'),
    poster: "https://m.media-amazon.com/images/M/MV5BMjI0ODU2NTY5NF5BMl5BanBnXkFtZTgwMzIwMTEyNjM@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMjI0ODU2NTY5NF5BMl5BanBnXkFtZTgwMzIwMTEyNjM@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Prashanth Neel",
    cast: ["Yash", "Srinidhi Shetty", "Ramachandra Raju", "Archana Jois"]
  },
  {
    _id: "23",
    title: "Kantara",
    description: "It involves culture of Kambla and Bhootha Kola. A human and nature conflict where Shiva is the rebellion who works against nature.",
    genre: ["Action", "Drama", "Thriller"],
    language: "kannada",
    duration: 148,
    rating: 8.2,
    releaseDate: new Date('2022-09-30'),
    poster: "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BYjFjMTQzY2EtZjQ5MC00NGUyLWJiYWMtZDI3MTQ1MGU4OGY2XkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Rishab Shetty",
    cast: ["Rishab Shetty", "Sapthami Gowda", "Kishore Kumar G.", "Achyuth Kumar"]
  },
  {
    _id: "24",
    title: "Ugramm",
    description: "A young man tries to revive his parents' lavender farm, which is on the brink of ruin, but is caught up in a feud between a drug gang and the police.",
    genre: ["Action", "Crime", "Drama"],
    language: "kannada",
    duration: 132,
    rating: 8.1,
    releaseDate: new Date('2014-12-05'),
    poster: "https://m.media-amazon.com/images/M/MV5BMTc1NjIwNjI1NV5BMl5BanBnXkFtZTgwNjU2NjEyMzI@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMTc1NjIwNjI1NV5BMl5BanBnXkFtZTgwNjU2NjEyMzI@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Prashanth Neel",
    cast: ["Sri Murali", "Haripriya", "Tilak Shekar", "Jai Jagadish"]
  },
  {
    _id: "25",
    title: "Lucia",
    description: "A man suffering from insomnia is tricked into buying a drug, Lucia, that makes his desires come true in his dreams, blurring the line between fantasy and reality.",
    genre: ["Drama", "Mystery", "Thriller"],
    language: "kannada",
    duration: 135,
    rating: 8.3,
    releaseDate: new Date('2013-09-06'),
    poster: "https://m.media-amazon.com/images/M/MV5BMTYzNDE4NzkxNV5BMl5BanBnXkFtZTcwMTgwNTMzOA@@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMTYzNDE4NzkxNV5BMl5BanBnXkFtZTcwMTgwNTMzOA@@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Pawan Kumar",
    cast: ["Sathish Ninasam", "Sruthi Hariharan", "Achyuth Kumar", "Sidhaartha Maadhyamika"]
  },

  // MALAYALAM MOVIES
  {
    _id: "26",
    title: "Drishyam",
    description: "A man goes to extreme lengths to save his family from punishment after the family commits an accidental crime.",
    genre: ["Crime", "Drama", "Thriller"],
    language: "malayalam",
    duration: 150,
    rating: 8.6,
    releaseDate: new Date('2013-12-19'),
    poster: "https://m.media-amazon.com/images/M/MV5BYmJhNWVkM2EtNjVmZC00NzJhLWI4NzQtNmY1ZjkzNjBjOTdlXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BYmJhNWVkM2EtNjVmZC00NzJhLWI4NzQtNmY1ZjkzNjBjOTdlXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Jeethu Joseph",
    cast: ["Mohanlal", "Meena", "Asha Sarath", "Kalabhavan Shajon"]
  },
  {
    _id: "27",
    title: "Kumbakonam Gopals",
    description: "The story of a middle-class Malayali family and their struggles with life.",
    genre: ["Comedy", "Drama"],
    language: "malayalam",
    duration: 142,
    rating: 8.4,
    releaseDate: new Date('2019-02-07'),
    poster: "https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ0MC00MDlhLTlkZWUtMzU4Nzc4MjM3NzBiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ0MC00MDlhLTlkZWUtMzU4Nzc4MjM3NzBiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Mahesh Narayanan",
    cast: ["Fahadh Faasil", "Nimisha Sajayan", "Vinay Forrt", "Jalaja"]
  },
  {
    _id: "28",
    title: "Bangalore Days",
    description: "Three cousins from Kerala who move to Bangalore continue to be close and share their individual experiences.",
    genre: ["Comedy", "Drama", "Romance"],
    language: "malayalam",
    duration: 171,
    rating: 8.3,
    releaseDate: new Date('2014-05-30'),
    poster: "https://m.media-amazon.com/images/M/MV5BMjExOTY3NzExM15BMl5BanBnXkFtZTgwOTJhMDI2MTE@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BMjExOTY3NzExM15BMl5BanBnXkFtZTgwOTJhMDI2MTE@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Anjali Menon",
    cast: ["Dulquer Salmaan", "Nivin Pauly", "Nazriya Nazim", "Fahadh Faasil"]
  },
  {
    _id: "29",
    title: "Premam",
    description: "A young man has three opportunities to find love. Will the third time be the charm?",
    genre: ["Comedy", "Drama", "Romance"],
    language: "malayalam",
    duration: 156,
    rating: 8.3,
    releaseDate: new Date('2015-05-29'),
    poster: "https://m.media-amazon.com/images/M/MV5BYjExOTY3NzExM15BMl5BanBnXkFtZTgwOTJhMDI2MTE@._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BYjExOTY3NzExM15BMl5BanBnXkFtZTgwOTJhMDI2MTE@._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Alphonse Puthren",
    cast: ["Nivin Pauly", "Sai Pallavi", "Madonna Sebastian", "Anupama Parameswaran"]
  },
  {
    _id: "30",
    title: "The Great Indian Kitchen",
    description: "After marriage, a woman struggles against the suffocating traditions of her new family.",
    genre: ["Drama"],
    language: "malayalam",
    duration: 104,
    rating: 8.3,
    releaseDate: new Date('2021-01-15'),
    poster: "https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ0MC00MDlhLTlkZWUtMzU4Nzc4MjM3NzBiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX300.jpg",
    backdrop: "https://m.media-amazon.com/images/M/MV5BNjA2NmZhOGEtZTQ0MC00MDlhLTlkZWUtMzU4Nzc4MjM3NzBiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_SX1500_CR0,0,1500,999_AL_.jpg",
    status: "now_showing",
    is3D: false,
    director: "Jeo Baby",
    cast: ["Nimisha Sajayan", "Suraj Venjaramoodu", "Chethan Jayalal", "Ajitha V.M."]
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
        movie: mockMovies[0], // Avengers: Endgame
        showTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        screen: "1",
        basePrice: 200,
        couplesSeatPrice: 400
      },
      {
        _id: "show2", 
        movie: mockMovies[10], // RRR
        showTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
        screen: "2",
        basePrice: 180,
        couplesSeatPrice: 360
      },
      {
        _id: "show3",
        movie: mockMovies[5], // Dangal
        showTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
        screen: "1",
        basePrice: 150,
        couplesSeatPrice: 300
      },
      {
        _id: "show4",
        movie: mockMovies[20], // KGF Chapter 2
        showTime: new Date(Date.now() + 6 * 60 * 60 * 1000),
        screen: "3",
        basePrice: 220,
        couplesSeatPrice: 440
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
        _id: "show5",
        movie: mockMovies[1], // Spider-Man: No Way Home
        showTime: new Date(Date.now() + 3 * 60 * 60 * 1000),
        screen: "1",
        basePrice: 250,
        couplesSeatPrice: 500
      },
      {
        _id: "show6",
        movie: mockMovies[15], // Vikram
        showTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        screen: "2",
        basePrice: 200,
        couplesSeatPrice: 400
      },
      {
        _id: "show7",
        movie: mockMovies[6], // 3 Idiots
        showTime: new Date(Date.now() + 7 * 60 * 60 * 1000),
        screen: "1",
        basePrice: 180,
        couplesSeatPrice: 360
      }
    ]
  },
  {
    _id: "theater3",
    name: "Cinepolis - Nexus Mall",
    address: {
      street: "Koramangala, 4th Block",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560034",
      country: "India"
    },
    amenities: ["4DX", "VIP Lounge", "Gourmet Food", "Valet Parking"],
    rating: 4.5,
    shows: [
      {
        _id: "show8",
        movie: mockMovies[2], // Top Gun: Maverick
        showTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000),
        screen: "1",
        basePrice: 280,
        couplesSeatPrice: 560
      },
      {
        _id: "show9",
        movie: mockMovies[11], // Baahubali 2
        showTime: new Date(Date.now() + 5.5 * 60 * 60 * 1000),
        screen: "2",
        basePrice: 200,
        couplesSeatPrice: 400
      },
      {
        _id: "show10",
        movie: mockMovies[25], // Drishyam
        showTime: new Date(Date.now() + 4.5 * 60 * 60 * 1000),
        screen: "3",
        basePrice: 170,
        couplesSeatPrice: 340
      }
    ]
  },
  {
    _id: "theater4",
    name: "Multiplex - Phoenix MarketCity",
    address: {
      street: "Whitefield Main Road",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560066",
      country: "India"
    },
    amenities: ["Dolby Vision", "Premium Recliners", "Cafe", "Gaming Zone"],
    rating: 4.3,
    shows: [
      {
        _id: "show11",
        movie: mockMovies[3], // Avatar: The Way of Water
        showTime: new Date(Date.now() + 3.5 * 60 * 60 * 1000),
        screen: "1",
        basePrice: 300,
        couplesSeatPrice: 600
      },
      {
        _id: "show12",
        movie: mockMovies[16], // 2.0
        showTime: new Date(Date.now() + 6.5 * 60 * 60 * 1000),
        screen: "2",
        basePrice: 250,
        couplesSeatPrice: 500
      },
      {
        _id: "show13",
        movie: mockMovies[27], // Bangalore Days
        showTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
        screen: "3",
        basePrice: 160,
        couplesSeatPrice: 320
      }
    ]
  },
  {
    _id: "theater5",
    name: "Carnival Cinemas - Orion Mall",
    address: {
      street: "Dr. Rajkumar Road, Rajajinagar",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560010",
      country: "India"
    },
    amenities: ["Digital Sound", "Comfortable Seating", "Snack Bar", "Air Conditioning"],
    rating: 3.8,
    shows: [
      {
        _id: "show14",
        movie: mockMovies[7], // Zindagi Na Milegi Dobara
        showTime: new Date(Date.now() + 2.5 * 60 * 60 * 1000),
        screen: "1",
        basePrice: 140,
        couplesSeatPrice: 280
      },
      {
        _id: "show15",
        movie: mockMovies[12], // Pushpa: The Rise
        showTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
        screen: "2",
        basePrice: 190,
        couplesSeatPrice: 380
      },
      {
        _id: "show16",
        movie: mockMovies[22], // Kantara
        showTime: new Date(Date.now() + 7 * 60 * 60 * 1000),
        screen: "1",
        basePrice: 180,
        couplesSeatPrice: 360
      }
    ]
  }
];

module.exports = { mockMovies, mockTheaters };