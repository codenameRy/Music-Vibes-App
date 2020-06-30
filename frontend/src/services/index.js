import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  // ? (baseURL = 'https://sheltered-dawn-07708.herokuapp.com')
  ? (baseURL = 'window.location.origin')
  : (baseURL = 'http://localhost:5000');

const service = axios.create({ withCredentials: true, baseURL });

const actions = {
  isLoggedIn: async () => {
    return await service.get('/is-logged-in')
  },
  signUp: async (user) => {
    return await service.post('/signup', user)
  },
  logIn: async (user) => {
    return await service.post('/login', user)
  },
  logOut: async () => {
    return await service.get('/logout')
  },

   //Sending Genius API Search Results for songs and artists to CLIENT
   getArtist: async (artistsandsongs) => {
    return await service.get(`/search/${artistsandsongs}`)
  },

   //Sending lyrics info from NPM module to Client
   getLyrics: async (song) => {
    return await service.get(`/searchNPM/${song}`)
  }
};

export default actions;
