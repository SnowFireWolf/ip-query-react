import axios from 'axios';



export function apiRequest(searchString: string) {
  return axios.get(`https://ipwhois.app/json/${searchString}`);
}
