import axios from "axios";
import Notiflix from "notiflix";

const API_KEY = '29451050-d710b01a754c47fc53a7a4779';
const url = 'https://pixabay.com/api/';


export async function getData (query, page=1) {
    try {
      const response = await axios.get(
        `${url}?key=${API_KEY}&q=${query}&page=${page}&image_type=photo&orientation=horizontal&per_page=12`
      );
        console.log(response.data);
        return response.data;
    } catch (error) {
        Notiflix.Notify.failure(`Sorry, try again ${error} `);
        throw new Error(`Sorry, try again ${error}`);}
}