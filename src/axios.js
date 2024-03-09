import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api',
  timeout: 5000, // ajusta según sea necesario
});

export default instance;