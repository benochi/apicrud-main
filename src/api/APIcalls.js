import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2/pokemon" || "http://localhost:5000/"

class APICalls {

  //GET https://pokeapi.co/api/v2/{endpoint}/
  static async searchPokeAPIByForm(SearchPhrase) {
      let query = API_URL + `/${SearchPhrase}`;
      let res = await axios.get(query)
      return res.data      
  }

  //GET https://jsonplaceholder.typicode.com/posts
  static async searchPokeAPI() {
    let res = await axios.get(API_URL)
    return res.data
  }

}

export default APICalls;